// Run after npm run build. Uses the same external Playwright setup as app-diagrams/render.mjs.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(process.env.QA_OUTPUT || '/tmp/pushplay-homepage-qa');
const port = process.env.HOME_SMOKE_PORT || '3107';
const base = `http://127.0.0.1:${port}`;
const beta = 'https://testflight.apple.com/join/UruJbq28';
const foregroundPath = '/products/pushplay/marketing/pp-mac-iphone-ipad.webp';
const backgroundPath = '/images/section-backgrounds/push-play-app-section-background.svg';
const iconReceipt = JSON.parse(await readFile(path.join(root, 'docs/verification/pushplay-homepage/testflight-asset.json'), 'utf8'));
const icon = await readFile(path.join(root, iconReceipt.file));
assert.equal(createHash('sha256').update(icon).digest('hex'), iconReceipt.sha256, 'Original Apple icon bytes remain unchanged');
const foreground = sharp(path.join(root, 'public', foregroundPath));
const metadata = await foreground.metadata();
assert.equal(metadata.format, 'webp');
assert.equal(metadata.hasAlpha, true);
assert.deepEqual([metadata.width, metadata.height], [1600, 612]);
const provenance = JSON.parse(await readFile(path.join(root, 'docs/verification/pushplay-homepage/asset-provenance.json'), 'utf8'));
assert.equal(createHash('sha256').update(await readFile(path.join(root, 'public', foregroundPath))).digest('hex'), provenance.foreground.sha256, 'Foreground must match its provenance');
assert.equal(provenance.source.original.file, 'iphone/05-mac-iphone-ipad.png');
assert.deepEqual(provenance.source.captures.map(({ file }) => file).sort(), [
  'captures/ipad-eq.png', 'captures/iphone-mix.png', 'captures/mac-mix-window.png',
]);
const { data, info } = await foreground.resize({ width: 160 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let orange = 0, blue = 0, transparent = 0;
for (let i = 0; i < data.length; i += info.channels) {
  const [r, g, b, a] = data.subarray(i, i + 4);
  if (a === 0) transparent++;
  if (a > 200 && r > b + 40 && r > g + 20) orange++;
  if (a > 200 && b > r + 40 && b > g + 10) blue++;
}
assert.ok(orange > 20 && blue > 20 && transparent > 100, 'Real deck colours on a transparent canvas');
const backdrop = await readFile(path.join(root, 'public', backgroundPath), 'utf8');
assert.equal(createHash('sha256').update(backdrop).digest('hex'), provenance.background.sha256, 'Background must match its provenance');
for (const { file, sha256 } of provenance.background.sources) {
  const source = await readFile(path.join(root, 'public/images/app-diagrams', file));
  assert.equal(createHash('sha256').update(source).digest('hex'), sha256, `Background source changed: ${file}; regenerate homepage assets`);
}
assert.match(backdrop, /viewBox="0 0 1440 1024"/);
assert.match(backdrop, /fill:none;stroke:#007AFF/);
assert.deepEqual(provenance.background.sources.map(({ file }) => file), [
  'push-play-dual-deck-figure.svg', 'push-play-hardware-display-figure.svg',
], 'Both background drawings use their front-facing versions');
assert.doesNotMatch(backdrop, /exploded|skew[XY]\(|matrix\(/, 'No perspective projection in the background');
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', port], { cwd: root, stdio: 'pipe' });
let serverLog = '';
server.stdout.on('data', (chunk) => { serverLog += chunk; });
server.stderr.on('data', (chunk) => { serverLog += chunk; });
let browser;
try {
  for (let attempt = 0; attempt < 100; attempt++) {
    assert.equal(server.exitCode, null, serverLog);
    if (serverLog.includes('Ready in') && await fetch(base).then((response) => response.ok).catch(() => false)) break;
    assert.ok(attempt < 99, `Server did not start: ${serverLog}`);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  browser = await chromium.launch();
  await mkdir(output, { recursive: true });
  const results = [];
  for (const width of [320, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    const betaRequests = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (url.href === beta) {
        betaRequests.push(url.href);
        return route.fulfill({ contentType: 'text/html', body: '<title>TestFlight navigation verified</title>' });
      }
      // Never send QA pageviews to analytics, including the same-origin proxy.
      if (url.origin !== base || url.pathname.startsWith('/ingest/')) return route.fulfill({ status: 204 });
      return route.continue();
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    const heading = page.getByRole('heading', { name: 'PUSH PLAY', exact: true });
    assert.equal(await heading.count(), 1);
    const section = page.locator('section').filter({ has: heading });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const heading = [...document.querySelectorAll('h2')].find((node) => node.textContent === 'PUSH PLAY');
      return heading && Number(getComputedStyle(heading.parentElement).opacity) === 1;
    });
    const cta = section.getByRole('link', { name: 'Join TestFlight', exact: true });
    assert.equal(await cta.getAttribute('href'), beta);
    assert.equal(await cta.count(), 1);
    const iconImage = cta.locator('img');
    assert.equal(await iconImage.getAttribute('src'), '/images/common/testflight-icon.png');
    assert.equal(await iconImage.getAttribute('alt'), '');
    assert.equal(await iconImage.getAttribute('aria-hidden'), 'true');
    await iconImage.evaluate((image) => image.decode());
    assert.equal(await iconImage.evaluate((image) => image.naturalWidth), 512);
    assert.equal(await iconImage.evaluate((image) => getComputedStyle(image).filter), 'none');
    assert.ok(await cta.evaluate((node) => node.getBoundingClientRect().height >= 44), 'Comfortable touch target');
    for (const [name, href] of [['INVISIBLE CAMERA', '/products/invisible-camera'], ['MIDICIRCUIT', '/products/midicircuit']]) {
      const app = page.locator('section').filter({ has: page.getByRole('heading', { name, exact: true }) });
      assert.equal(await app.getByRole('link', { name: 'Learn more →', exact: true }).getAttribute('href'), href);
      assert.equal(await app.locator('img').getAttribute('alt'), name);
      assert.equal(await app.locator('img').evaluate((image) => getComputedStyle(image).filter), 'none');
      assert.equal(await app.locator('img').evaluate((image) => image.getBoundingClientRect().height), width >= 1024 ? 760 : width >= 768 ? 680 : 528, 'Existing portrait screenshots keep their original heights');
    }
    const productImage = section.getByRole('img', { name: /Push Play on Mac, iPhone and iPad/ });
    assert.equal(await productImage.getAttribute('src'), foregroundPath);
    assert.ok(await productImage.evaluate((image) => image.complete && image.naturalWidth === 1600));
    assert.equal(await productImage.evaluate((image) => getComputedStyle(image).filter), 'none', 'Keep screenshot colours, never invert the product');
    assert.equal(await productImage.evaluate((image) => getComputedStyle(image).objectFit), 'contain');
    assert.ok(await productImage.evaluate((image) => {
      const box = image.getBoundingClientRect();
      return Math.abs(box.height - box.width * image.naturalHeight / image.naturalWidth) < 1;
    }), 'Three-device composition uses its natural aspect ratio, not a tall portrait frame');
    const background = section.locator('[aria-hidden="true"][style*="background-image"]');
    assert.equal(await background.count(), 1, 'Technical drawing belongs in the decorative background');
    assert.equal(await background.evaluate((node) => getComputedStyle(node).pointerEvents), 'none');
    assert.ok(await background.evaluate(async (node, expected) => {
      const url = getComputedStyle(node).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
      if (!url || new URL(url).pathname !== expected || getComputedStyle(node).zIndex !== '0') return false;
      const image = new Image();
      image.src = url;
      await image.decode();
      return image.naturalWidth === 1440 && image.naturalHeight === 1024;
    }, backgroundPath));
    assert.equal(await section.locator('p').innerText(), 'A beginner-friendly DJ app for mixing your favourite songs on iPad, iPhone or Mac. Connect Ableton Push 2 or Move, or bring your own MIDI controller to get hands on. Beta places are limited.');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'No horizontal overflow');
    await section.screenshot({ path: path.join(output, `pushplay-${width}.png`), animations: 'disabled' });
    await cta.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    assert.ok(await cta.evaluate((node) => node === document.activeElement), 'CTA accepts keyboard focus');
    assert.ok(await cta.evaluate((node) => node.matches(':focus-visible') && getComputedStyle(node).outlineStyle !== 'none'), 'Keyboard focus has a visible outline');
    await cta.press('Enter');
    await page.waitForURL(beta);
    assert.deepEqual(betaRequests, [beta], 'Keyboard activation navigates to the exact public invitation');
    assert.deepEqual(errors, []);
    results.push({ width, productCaptureLoaded: true, technicalBackgroundLoaded: true, officialTestFlightIconLoaded: true, keyboardFocusVisible: true, betaNavigation: beta, existingAppsPreserved: true, horizontalOverflow: false, pageErrors: errors });
    await page.close();
  }
  await writeFile(path.join(output, 'report.json'), JSON.stringify({ results, note: 'TestFlight navigation intercepted; this checks the website, not beta capacity. Analytics blocked.' }, null, 2) + '\n');
  console.log(`Homepage smoke checks passed at 320, 390, 768 and 1440px. Evidence: ${output}`);
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
