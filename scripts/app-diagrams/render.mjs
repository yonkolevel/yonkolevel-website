import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('../../', import.meta.url));
const docs = path.join(root, 'docs/marketing/app-diagrams');
const web = path.join(root, 'public/images/app-diagrams');
const evidence = path.join(docs, 'qa');
const manifest = JSON.parse(await readFile(path.join(web, 'manifest.json'), 'utf8'));
const artifactHashes = {};
for (const file of [fileURLToPath(import.meta.url), path.join(web, 'manifest.json'), path.join(docs, 'index.html')]) await recordHash(file);
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true });
const findings = [];
const contacts = { landscape: [], exploded: [], square: [], sheet: [] };
let layoutsChecked = 0;

try {
  for (const asset of manifest) {
    const publicFile = (url) => path.join(root, 'public', url);
    const variants = [
      { name: 'landscape', source: publicFile(asset.svg), size: [1600, 1000], scale: 2, png: path.join(docs, asset.landscape), webp: publicFile(asset.webp) },
      { name: 'exploded', source: publicFile(asset.exploded), size: [1600, 1000], scale: 2, png: path.join(docs, asset.explodedPng), webp: publicFile(asset.explodedWebp) },
      { name: 'square', source: path.join(docs, 'exports', `${asset.id}-square.svg`), size: [1080, 1080], scale: 1, png: path.join(docs, asset.square) },
      { name: 'figure', source: publicFile(asset.figure), size: asset.figureSize },
      { name: 'exploded-figure', source: publicFile(asset.explodedFigure), size: asset.explodedFigureSize },
    ];
    for (const variant of variants) {
      const [width, height] = variant.size;
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: variant.scale || 1 });
      page.on('pageerror', (error) => findings.push({ id: asset.id, variant: variant.name, error: error.message }));
      await recordHash(variant.source);
      await page.goto(pathToFileURL(variant.source).href);
      findings.push(...await checkArtwork(page, asset.id, variant.name));
      layoutsChecked++;
      if (variant.png) {
        const png = await page.screenshot({ animations: 'disabled', omitBackground: true });
        await writeFile(variant.png, png);
        if (variant.webp) await sharp(png).resize(width, height).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(variant.webp);
        await recordHash(variant.png);
        if (variant.webp) await recordHash(variant.webp);
        contacts[variant.name].push(await sharp(png).resize(640, 400, { fit: 'contain', background: '#00000000' }).png().toBuffer());
      }
      await page.close();
    }
    // Measurement references stay separate from the decorative asset files.
    const sheet = await browser.newPage({ viewport: { width: 1800, height: 1400 } });
    await recordHash(path.join(docs, asset.sheet));
    await sheet.goto(pathToFileURL(path.join(docs, asset.sheet)).href);
    await sheet.evaluate(() => document.fonts.ready);
    const image = await sheet.locator('.scroll svg').screenshot();
    await writeFile(path.join(evidence, `${asset.id}-sheet.png`), image);
    await recordHash(path.join(evidence, `${asset.id}-sheet.png`));
    contacts.sheet.push(await sharp(image).resize(640, 400).png().toBuffer());
    await sheet.close();
    console.log(`Rendered ${asset.id}: flat, exploded and square; transparent backgrounds.`);
  }

  // Checkerboards belong only to QA previews, never to downloadable artwork.
  const checker = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="1200"><defs><pattern id="c" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#fafafa"/><path d="M0 0h12v12H0zM12 12h12v12H12z" fill="#eee"/></pattern></defs><rect width="1280" height="1200" fill="url(#c)"/></svg>');
  for (const [name, images] of Object.entries(contacts)) {
    await sharp(checker).composite(images.map((input, i) => ({ input, left: i % 2 * 640, top: Math.floor(i / 2) * 400 })))
      .png().toFile(path.join(evidence, `${name}-contact.png`));
    await recordHash(path.join(evidence, `${name}-contact.png`));
  }

  const gallery = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await gallery.goto(pathToFileURL(path.join(docs, 'index.html')).href);
  await gallery.evaluate(async () => {
    for (const image of document.images) { image.loading = 'eager'; await image.decode(); }
  });
  const galleryCheck = await gallery.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    imagesLoaded: [...document.images].every((image) => image.complete && image.naturalWidth > 0),
  }));
  if (galleryCheck.horizontalOverflow || !galleryCheck.imagesLoaded) findings.push({ galleryCheck });
  await gallery.screenshot({ path: path.join(evidence, 'gallery-mobile.png'), fullPage: true });
  await gallery.close();
  await recordHash(path.join(evidence, 'gallery-mobile.png'));
  await writeFile(path.join(evidence, 'render-report.json'), JSON.stringify({
    renderer: 'Playwright Chromium', browserVersion: browser.version(),
    plates: manifest.length, layoutsChecked, galleryCheck, layoutFindings: findings, artifactHashes,
    note: 'Exports contain only 2–4 source-backed size notes, no promotional text or canvas background. Artwork/annotation bounds and label overlaps are checked; checkerboards appear only in previews.',
  }, null, 2) + '\n');
  if (findings.length) { console.error(JSON.stringify(findings, null, 2)); process.exitCode = 1; }
} finally {
  await browser.close();
}

async function recordHash(file) {
  artifactHashes[path.relative(root, file).split(path.sep).join('/')] = createHash('sha256').update(await readFile(file)).digest('hex');
}

async function checkArtwork(page, id, variant) {
  return page.evaluate(({ id, variant }) => {
    const svg = document.querySelector('svg');
    const canvas = svg.getBoundingClientRect();
    const issues = [];
    if (svg.querySelector('foreignObject, image')) issues.push({ id, variant, error: 'Unexpected embedded content' });
    const labels = [...svg.querySelectorAll('text')];
    if (labels.length < 2 || labels.length > 4 || labels.some((label) => !label.closest('.annotations') || label.dataset.annotation !== 'size')) {
      issues.push({ id, variant, error: 'Expected only 2–4 size annotations' });
    }
    for (const [index, label] of labels.entries()) {
      const box = label.getBoundingClientRect();
      if (getComputedStyle(label).fontSize !== '12px') issues.push({ id, variant, error: 'Size notes must use 12px type' });
      for (const other of labels.slice(index + 1)) {
        const next = other.getBoundingClientRect();
        if (Math.min(box.right, next.right) - Math.max(box.left, next.left) > 2 && Math.min(box.bottom, next.bottom) - Math.max(box.top, next.top) > 2) {
          issues.push({ id, variant, text: [label.textContent, other.textContent], error: 'Overlapping size notes' });
        }
      }
    }
    for (const shape of svg.querySelectorAll('.app-elements rect, .app-elements circle, .app-elements line, .app-elements path, .annotations line, .annotations polyline, .annotations text')) {
      const box = shape.getBoundingClientRect();
      if (box.left < canvas.left - 1 || box.top < canvas.top - 1 || box.right > canvas.right + 1 || box.bottom > canvas.bottom + 1) {
        issues.push({ id, variant, element: shape.tagName, error: 'Shape outside SVG canvas' });
      }
    }
    return issues;
  }, { id, variant });
}
