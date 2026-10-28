// Reuse the existing three-device composition, not a newly arranged set of screenshots.
import sharp from 'sharp';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const marketing = path.join(root, 'public/products/pushplay/marketing');
const evidence = path.join(root, 'docs/verification/pushplay-homepage');
await mkdir(marketing, { recursive: true });
await mkdir(evidence, { recursive: true });
const hash = (data) => createHash('sha256').update(data).digest('hex');
const source = JSON.parse(await readFile(path.join(root, 'docs/marketing/pushplay/three-device-source.json'), 'utf8'));
const transparent = await readFile(path.join(root, source.render.file));
assert.equal(hash(transparent), source.render.sha256, 'Transparent export must match its source receipt');
const { data: foreground, info } = await sharp(transparent)
  .trim({ threshold: 1 })
  .resize({ width: 1600 })
  .webp({ quality: 88, effort: 6 }).toBuffer({ resolveWithObject: true });
await writeFile(path.join(marketing, 'pp-mac-iphone-ipad.webp'), foreground);

// Keep the reusable grayscale exports intact; derive a line-only section background.
const diagramDir = path.join(root, 'public/images/app-diagrams');
const diagramSources = [];
async function blueprint(file, box) {
  const svg = await readFile(path.join(diagramDir, file), 'utf8');
  diagramSources.push({ file, sha256: hash(svg) });
  return svg.replace('<svg ', `<svg x="${box.x}" y="${box.y}" `)
    .replace(/width="\d+" height="\d+"/, `width="${box.width}" height="${box.height}"`)
    .replace(/fill:#[a-f0-9]+;stroke:#[a-f0-9]+/gi, 'fill:none;stroke:#007AFF')
    .replace(/stroke:#[a-f0-9]+/gi, 'stroke:#007AFF')
    .replace(/fill:#[a-f0-9]+/gi, 'fill:#007AFF')
    .replace(/fill="#[a-f0-9]+"/gi, 'fill="#007AFF"');
}
const deck = await blueprint('push-play-dual-deck-figure.svg', { x: -150, y: 465, width: 1300, height: 550 });
const display = await blueprint('push-play-hardware-display-figure.svg', { x: 620, y: 10, width: 1100, height: 350 });
const background = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1024" viewBox="0 0 1440 1024" fill="none"><g opacity=".6">${deck}${display}</g></svg>\n`;
await writeFile(path.join(root, 'public/images/section-backgrounds/push-play-app-section-background.svg'), background);
await writeFile(path.join(evidence, 'asset-provenance.json'), JSON.stringify({
  source,
  captureDate: '2026-10-25',
  sourceKind: 'Existing Mac/iPhone/iPad composition using genuine DEBUG-only ScreenshotStudio captures; not a current Release capture.',
  foreground: { file: '/products/pushplay/marketing/pp-mac-iphone-ipad.webp', width: info.width, height: info.height, bytes: foreground.length, sha256: hash(foreground) },
  trim: { left: -info.trimOffsetLeft, top: -info.trimOffsetTop, threshold: 1 },
  background: { file: '/images/section-backgrounds/push-play-app-section-background.svg', width: 1440, height: 1024, sources: diagramSources, sha256: hash(background) },
  treatment: 'Trimmed transparent margins and uniformly resized the existing three-device composition. Original realistic bezels, device arrangement, UI colours, neutral song names and monitor hints retained. No source audio copied. Original captures and reusable diagrams unchanged.',
}, null, 2) + '\n');
console.log(`Built Push Play foreground (${Math.round(foreground.length / 1024)} KiB) and decorative blueprint background.`);
