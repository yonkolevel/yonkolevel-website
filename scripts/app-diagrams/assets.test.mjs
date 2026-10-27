import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { catalog } from './catalog.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const docs = path.join(root, 'docs/marketing/app-diagrams');
const manifest = JSON.parse(await readFile(path.join(root, 'public/images/app-diagrams/manifest.json'), 'utf8'));
const publicFile = (url) => path.join(root, 'public', url);

test('catalog includes two distinct elements for each app', () => {
  assert.equal(new Set(catalog.map((item) => item.id)).size, 6);
  for (const product of ['Invisible Camera', 'Midicircuit', 'Push Play']) assert.equal(catalog.filter((item) => item.product === product).length, 2);
  assert.equal(manifest.length, catalog.length);
});

for (const spec of catalog) {
  test(`${spec.id}: minimal accurate notes, matched strokes and transparent exports`, async () => {
    const asset = manifest.find((item) => item.id === spec.id);
    assert.ok(asset && asset.alt.length > 40);
    assert.equal(asset.visibleText, true);
    assert.equal(asset.promotionalText, false);
    assert.equal(asset.transparent, true);
    const referenceStyle = await readFile(publicFile(asset.strokeReference), 'utf8');
    assert.match(referenceStyle, /stroke-width="2\.5"/);
    assert.match(referenceStyle, /stroke-width="0\.6"/);
    const detailWidth = spec.product === 'Invisible Camera' ? '1.25' : '1.5';
    const dimensionWidth = spec.product === 'Invisible Camera' ? '0.6' : '1.5';
    assert.ok(referenceStyle.includes(`stroke-width="${detailWidth}"`));
    for (const [file, [width, height]] of [
      [publicFile(asset.svg), [1600, 1000]],
      [publicFile(asset.figure), asset.figureSize],
      [publicFile(asset.exploded), [1600, 1000]],
      [publicFile(asset.explodedFigure), asset.explodedFigureSize],
      [path.join(docs, 'exports', `${spec.id}-square.svg`), [1080, 1080]],
    ]) {
      const svg = await readFile(file, 'utf8');
      assert.match(svg, new RegExp(`viewBox="0 0 ${width} ${height}"`));
      assert.match(svg, /role="img" aria-labelledby=/);
      assert.match(svg, /<title[^>]*>.+?<\/title>/);
      assert.match(svg, /<desc[^>]*>.+?<\/desc>/);
      assert.match(svg, /Copyright \(c\) 2026 Enes Ozturk/);
      assert.doesNotMatch(svg, /<script|<foreignObject|<image|@import|onload=|marker-end=/i);
      const texts = [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)];
      assert.ok(texts.length >= 2 && texts.length <= 4, 'keep only a few small size notes');
      const annotations = file.includes('-exploded') ? asset.explodedAnnotations : asset.annotations;
      assert.equal(texts.length, annotations.length);
      for (const [index, [, attributes, label]] of texts.entries()) {
        const expected = annotations[index];
        assert.equal(label, expected.label);
        assert.match(attributes, /data-annotation="size"/);
        assert.ok(attributes.includes(`data-code="${expected.code}"`));
        const row = spec.rows.find(([code]) => code === expected.code);
        assert.ok(row, 'annotation must refer to a source-backed dimension');
        const actual = Number(row[2].split('=').at(-1).trim());
        assert.equal(expected.value, actual);
        assert.equal(expected.unit, spec.units === 'SwiftUI pt' ? 'pt' : 'px');
      }
      assert.match(svg, /\.obj\{[^}]*stroke-width:2\.5\}/);
      assert.match(svg, /\.guide\{[^}]*stroke-width:0\.6\}/);
      assert.match(svg, /\.size-note\{[^}]*font-size:12px;/);
      assert.ok(svg.includes(`.line{fill:none;stroke:#555;stroke-width:${detailWidth}}`));
      assert.ok(svg.includes(`.measure{fill:none;stroke:#555;stroke-width:${dimensionWidth}}`));
      assert.doesNotMatch(svg, /@font-face|data:font|(?:href|src)=["']https?:|url\(https?:/i);
      assert.match(svg, /<\/style><g class="app-elements"/); // No full-canvas background rectangle.
      for (const match of svg.matchAll(/(?:fill|stroke)(?:=":?|:)["']?(#[\da-f]{3,6})\b/gi)) {
        const raw = match[1].slice(1);
        const hex = raw.length === 3 ? [...raw].map((c) => c + c).join('') : raw;
        assert.equal(hex.slice(0, 2), hex.slice(2, 4));
        assert.equal(hex.slice(0, 2), hex.slice(4, 6));
      }
      assert.ok((await stat(file)).size < 30_000, 'minimal vectors should not carry embedded fonts or sheet furniture');
    }

    for (const [file, width, height] of [
      [publicFile(asset.webp), 1600, 1000],
      [publicFile(asset.explodedWebp), 1600, 1000],
      [path.join(docs, asset.landscape), 3200, 2000],
      [path.join(docs, asset.explodedPng), 3200, 2000],
      [path.join(docs, asset.square), 1080, 1080],
    ]) {
      const image = sharp(file);
      const metadata = await image.metadata();
      assert.equal(metadata.width, width); assert.equal(metadata.height, height);
      assert.equal(metadata.hasAlpha, true, 'export must retain transparency');
      const { data, info } = await image.resize(160, 160, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      let transparent = 0, painted = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) transparent++;
        else {
          painted++;
          assert.ok(Math.abs(data[i] - data[i + 1]) <= 2 && Math.abs(data[i] - data[i + 2]) <= 2, 'visible raster must be monochrome');
        }
      }
      assert.ok(transparent > info.width * info.height * .1, 'background must be transparent, not a white export canvas');
      assert.ok(painted > info.width * info.height * .01, 'export must contain artwork');
      for (const pixel of [0, info.width - 1, info.width * (info.height - 1), info.width * info.height - 1]) assert.equal(data[pixel * 4 + 3], 0);
    }
  });

  test(`${spec.id}: measurement references remain accurate and separate`, async () => {
    const asset = manifest.find((item) => item.id === spec.id);
    const reference = await readFile(path.join(docs, asset.technicalSvg), 'utf8');
    const html = await readFile(path.join(docs, asset.sheet), 'utf8');
    assert.match(reference, /viewBox="0 0 1700 1060"/);
    assert.match(reference, /SIL OPEN FONT LICENSE/);
    assert.match(reference, /data:font\/woff2;base64,/);
    assert.match(html, /tabindex="0"/);
    assert.doesNotMatch(html, /<script|<link[^>]+stylesheet|<img/i);
    const codes = new Set(spec.rows.map(([code]) => code));
    assert.equal(codes.size, spec.rows.length);
    for (const match of reference.matchAll(/data-code="([^"]+)"/g)) assert.ok(codes.has(match[1]));
    const variables = Object.fromEntries(spec.rows.filter(([, , value]) => /^\d+(\.\d+)?$/.test(value)).map(([code, , value]) => [code, Number(value)]));
    for (const [code, , value] of spec.rows) {
      if (!value.includes('=')) continue;
      const [formula, answer] = value.split('=').map((text) => text.trim());
      const normalized = formula.replace(/[A-Z]\d*/g, (token) => {
        assert.ok(token in variables, `missing input ${token} for ${code}`);
        return String(variables[token]);
      }).replaceAll('−', '-').replaceAll('·', '*').replaceAll('÷', '/');
      assert.match(normalized, /^[\d\s.+\-*/()]+$/);
      const calculated = Function(`"use strict"; return (${normalized});`)();
      assert.equal(calculated, Number(answer));
      variables[code] = calculated;
    }
    const provenance = JSON.parse(await readFile(path.join(docs, 'source-provenance.json'), 'utf8'));
    const source = provenance.artifacts.find((item) => item.id === spec.id);
    assert.ok(source.commit.startsWith(spec.revision));
    assert.deepEqual(source.files.map((file) => file.path), spec.files);
    source.files.forEach((file) => assert.match(file.sha256, /^[a-f0-9]{64}$/));
  });
}

test('current artwork and rasters match the checked render report', async () => {
  const report = JSON.parse(await readFile(path.join(docs, 'qa/render-report.json'), 'utf8'));
  const expectedFiles = [
    path.join(root, 'scripts/app-diagrams/render.mjs'),
    path.join(root, 'public/images/app-diagrams/manifest.json'),
    path.join(docs, 'index.html'),
    ...['landscape-contact', 'exploded-contact', 'square-contact', 'sheet-contact', 'gallery-mobile'].map((name) => path.join(docs, 'qa', `${name}.png`)),
  ];
  for (const asset of manifest) {
    expectedFiles.push(
      ...[asset.svg, asset.exploded, asset.figure, asset.explodedFigure, asset.webp, asset.explodedWebp].map(publicFile),
      ...[asset.landscape, asset.explodedPng, asset.square, asset.sheet, `exports/${asset.id}-square.svg`, `qa/${asset.id}-sheet.png`].map((file) => path.join(docs, file)),
    );
  }
  assert.deepEqual(Object.keys(report.artifactHashes || {}).sort(), expectedFiles.map((file) => path.relative(root, file).split(path.sep).join('/')).sort(), 'Render evidence must cover every current source and output');
  for (const [file, expected] of Object.entries(report.artifactHashes)) {
    assert.equal(createHash('sha256').update(await readFile(path.join(root, file))).digest('hex'), expected, `Stale render evidence for ${file}; rerun render.mjs`);
  }
  assert.equal(report.plates, 6);
  assert.equal(report.layoutsChecked, 30);
  assert.deepEqual(report.layoutFindings, []);
  assert.deepEqual(report.galleryCheck, { horizontalOverflow: false, imagesLoaded: true });
});
