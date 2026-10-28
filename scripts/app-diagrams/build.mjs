import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { catalog, skill } from './catalog.mjs';
import { Drawing, definitions, esc, illustration, exploded } from './drawing.mjs';
import { elementAlt, elementSvg } from './elements.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const webDir = path.join(root, 'public/images/app-diagrams');
const docsDir = path.join(root, 'docs/marketing/app-diagrams');
const font = (await readFile(path.join(root, 'public/fonts/DepartureMono/DepartureMono-Regular.woff2'))).toString('base64');
const drawingLicense = await readFile(path.join(root, 'scripts/app-diagrams/licenses/dimensional-drawing-MIT.txt'), 'utf8');
const licenses = drawingLicense + '\n\n' + await readFile(path.join(root, 'scripts/app-diagrams/licenses/DepartureMono-OFL.txt'), 'utf8');
for (const dir of [webDir, docsDir, path.join(docsDir, 'sheets'), path.join(docsDir, 'exports')]) await mkdir(dir, { recursive: true });

function svg(spec, variant, w, h, content) {
  const prefix = `${spec.id}-${variant}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="${prefix}-title ${prefix}-desc"><title id="${prefix}-title">${esc(spec.product)} — ${esc(spec.subject)}</title><desc id="${prefix}-desc">${esc(spec.alt)} Source-based schematic; not a UI screenshot. Unspecified dimensions remain TBD.</desc><metadata>${esc(licenses)}</metadata>${definitions(prefix, font)}<rect width="${w}" height="${h}" fill="#fff"/>${content(prefix)}</svg>`;
}

function technical(spec) {
  return svg(spec, 'sheet', 1700, 1060, (prefix) => {
    const d = new Drawing(prefix);
    d.rect(18, 18, 1664, 1024, 16, 'line');
    d.text(58, 60, 'PLAN + DETAIL VIEWS', 'view-title');
    d.text(1190, 60, 'DO NOT SCALE FROM THIS DRAWING', 'tiny', 'end');
    d.add(`<g transform="translate(28 82) scale(1.05)">${illustration(spec, prefix)}</g>`);
    const x = 1240, top = 110, widths = [44, 153, 205], rh = 36;
    d.text(x, 77, 'VARIABLE SCHEDULE', 'view-title');
    [['CODE', 'VARIABLE', 'VALUE'], ...spec.rows].forEach((row, i) => {
      let cx = x;
      row.forEach((value, j) => {
        d.rect(cx, top + i * rh, widths[j], rh, 0, 'line');
        d.text(cx + 8, top + i * rh + 23, value, i === 0 ? 'tiny' : j === 0 ? 'label' : 'note', 'start', `style="font-size:${i === 0 ? 10 : j === 0 ? 12 : 12}px"`);
        cx += widths[j];
      });
    });
    const sy = top + (spec.rows.length + 1) * rh + 48;
    d.text(x, sy, 'SOURCE / UNITS', 'view-title');
    d.text(x, sy + 32, spec.source, 'note');
    d.text(x, sy + 60, `${spec.revision} · ${spec.units}`, 'tiny');
    d.text(x, sy + 96, '[TBD] = DEVICE / HOST DEPENDENT', 'tiny');
    d.line(58, 748, 1642, 748, 'guide');
    d.add(`<g transform="translate(18 710)">${exploded(spec, prefix)}</g>`);
    d.text(990, 795, 'DRAWING NOTES', 'view-title');
    spec.notes.forEach((note, i) => {
      d.rect(990, 819 + i * 36, 20, 20, 0, 'line');
      d.text(1000, 833 + i * 36, i + 1, 'tiny', 'middle');
      d.text(1022, 834 + i * 36, note, 'note', 'start', 'style="font-size:16px"');
    });
    d.text(990, 1007, `${spec.product.toUpperCase()} / ${spec.code} / REV A`, 'tiny');
    return d.toString();
  });
}

const pageCss = `
  :root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#eee;color:#191919;font-family:Arial,Helvetica,sans-serif}
  main{max-width:1780px;margin:auto;padding:28px}.titleblock{border:1.2px solid #191919;border-radius:16px;background:#fff;overflow:hidden;margin-bottom:24px}
  .top{display:grid;grid-template-columns:2fr 1fr 1fr}.top>div{padding:22px;border-right:.8px solid #191919}.top>div:last-child{border:0}
  h1{font-weight:400;font-size:40px;letter-spacing:1px;text-transform:uppercase;margin:12px 0}.label{font-size:11px;letter-spacing:1px;text-transform:uppercase}
  p{line-height:1.6;margin:8px 0}.general{border-top:.8px solid #191919;padding:18px 22px;display:grid;grid-template-columns:1fr 1fr;gap:20px;font-size:13px}
  .scroll{overflow-x:auto;background:#fff}.scroll svg{display:block;width:100%;min-width:1100px;height:auto}.footer{display:flex;justify-content:space-between;gap:20px;padding:14px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase}
  details{margin:18px 0;font-size:14px}li{margin:8px 0;overflow-wrap:anywhere}a{color:inherit}a:focus-visible,summary:focus-visible{outline:2px solid #191919;outline-offset:5px}
  @media(max-width:700px){main{padding:16px}.top,.general{grid-template-columns:1fr}.top>div{border-right:0;border-bottom:.8px solid #191919}h1{font-size:28px}.footer{flex-direction:column}}
  @media print{body{background:#fff}main{padding:0}.scroll svg{min-width:0}.titleblock{margin-bottom:8px}details{display:none}@page{size:A3 landscape;margin:8mm}}
`;

function htmlSheet(spec, drawing) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(spec.product)} — ${esc(spec.subject)}</title><style>${pageCss}</style></head><body><main>
  <header class="titleblock"><div class="top"><div><div class="label">App anatomy / ${spec.code}</div><h1>${esc(spec.product)}</h1><p>${esc(spec.subject)}</p></div><div><div class="label">Drawing / revision / sheets</div><p>${spec.code} / A / 1 of 1</p><div class="label">Units / scale</div><p>${spec.units} / schematic; details enlarged</p></div><div><div class="label">Source snapshot</div><p>${esc(spec.source)}</p><p>${spec.revision}</p><div class="label">Purpose</div><p>Editorial product anatomy, not a build specification.</p></div></div>
  <div class="general"><div><strong>NOTES / UNLESS OTHERWISE SPECIFIED</strong><br>Do not scale from the sheet. Use the variable schedule. UI content is replaced with slots. HUG = content-sized; FILL = parent-sized; FLEX = remaining space.</div><div>Source-defined measurements only. [TBD] identifies runtime-dependent values. Exploded layers show visual composition, not physical thickness or a GPU pipeline. Grayscale is intentional.</div></div></header>
  <div class="scroll" tabindex="0" aria-label="Scrollable technical drawing">${drawing}</div><div class="footer"><span>Yonko Level / app anatomy</span><span>${spec.code} / ${esc(spec.subject)} / 1</span></div>
  <details><summary>Source references and drawing license</summary><ul>${spec.files.map((file) => `<li><code>${esc(file)}</code></li>`).join('')}</ul><p>Drawing conventions adapted from <a href="${skill.url}">dimensional-drawing</a>, MIT © Enes Ozturk. See the asset pack README for measurement caveats, source hashes and usage.</p></details></main></body></html>`;
}

const manifest = [];
for (const spec of catalog) {
  const web = elementSvg(spec, { license: drawingLicense });
  const square = elementSvg(spec, { width: 1080, height: 1080, license: drawingLicense });
  const figure = elementSvg(spec, { tight: true, license: drawingLicense });
  const layers = elementSvg(spec, { exploded: true, license: drawingLicense });
  const tightLayers = elementSvg(spec, { exploded: true, tight: true, license: drawingLicense });
  const sheet = technical(spec);
  await writeFile(path.join(webDir, `${spec.id}.svg`), web.svg);
  await writeFile(path.join(webDir, `${spec.id}-figure.svg`), figure.svg);
  await writeFile(path.join(webDir, `${spec.id}-exploded.svg`), layers.svg);
  await writeFile(path.join(webDir, `${spec.id}-exploded-figure.svg`), tightLayers.svg);
  await writeFile(path.join(docsDir, 'sheets', `${spec.id}.svg`), sheet);
  await writeFile(path.join(docsDir, 'sheets', `${spec.id}.html`), htmlSheet(spec, sheet));
  await writeFile(path.join(docsDir, 'exports', `${spec.id}-square.svg`), square.svg);
  manifest.push({
    id: spec.id, product: spec.product, title: spec.subject, alt: elementAlt(spec),
    width: 1600, height: 1000, transparent: true, visibleText: true, promotionalText: false,
    annotations: web.annotations, explodedAnnotations: layers.annotations,
    strokeReference: '/images/section-backgrounds/' + (spec.product === 'Invisible Camera' ? 'invisible-camera' : 'midicircuit') + '-app-section-background.svg',
    svg: `/images/app-diagrams/${spec.id}.svg`, webp: `/images/app-diagrams/${spec.id}.webp`,
    figure: `/images/app-diagrams/${spec.id}-figure.svg`, figureSize: [figure.width, figure.height],
    exploded: `/images/app-diagrams/${spec.id}-exploded.svg`,
    explodedFigure: `/images/app-diagrams/${spec.id}-exploded-figure.svg`, explodedFigureSize: [tightLayers.width, tightLayers.height],
    explodedWebp: `/images/app-diagrams/${spec.id}-exploded.webp`,
    explodedPng: `exports/${spec.id}-exploded.png`, explodedSize: [3200, 2000],
    sheet: `sheets/${spec.id}.html`, technicalSvg: `sheets/${spec.id}.svg`,
    landscape: `exports/${spec.id}-landscape.png`, landscapeSize: [3200, 2000],
    square: `exports/${spec.id}-square.png`, squareSize: [1080, 1080],
    sourceRevision: spec.revision,
  });
}
await writeFile(path.join(webDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

const gallery = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>App elements</title><style>${pageCss}
  main{max-width:1440px}header{padding:16px 0 28px}h1{font-size:28px;text-transform:none;letter-spacing:0}.grid{display:grid;gap:32px}article{background:#fff;border:1px solid #ccc}.previews{display:grid;grid-template-columns:1fr 1fr}.preview{margin:0;border-bottom:1px solid #ddd}.preview+.preview{border-left:1px solid #ddd}.checker{background-color:#fafafa;background-image:conic-gradient(#eee 25%,transparent 0 50%,#eee 0 75%,transparent 0);background-size:24px 24px}img{display:block;width:100%;height:auto}figcaption{padding:10px 20px;font-size:12px;color:#555}.info{padding:20px}h2{font-size:18px;font-weight:400;margin:0 0 10px}.links{display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:16px}.links a{font-size:14px;padding:5px 0}details{margin-bottom:0}@media(max-width:640px){.previews{grid-template-columns:1fr}.preview+.preview{border-left:0}}</style></head><body><main><header><h1>App elements</h1><p>App elements with sparse size notes. Transparent flat and exploded versions.</p><a href="README.md">Files and usage</a></header><section class="grid" aria-label="App element files">${manifest.map((entry) => `<article><div class="previews"><figure class="preview"><a class="checker" style="display:block" href="../../../public${entry.figure}"><img src="../../../public${entry.svg}" width="1600" height="1000" alt="${esc(entry.alt)}" loading="lazy"></a><figcaption>Flat</figcaption></figure><figure class="preview"><a class="checker" style="display:block" href="../../../public${entry.explodedFigure}"><img src="../../../public${entry.exploded}" width="1600" height="1000" alt="Exploded view: ${esc(entry.alt)}" loading="lazy"></a><figcaption>Exploded</figcaption></figure></div><div class="info"><h2>${esc(entry.product)} / ${esc(entry.title)}</h2><nav class="links" aria-label="${esc(entry.title)} downloads"><a href="../../../public${entry.figure}" download>Flat SVG · tight</a><a href="../../../public${entry.explodedFigure}" download>Exploded SVG · tight</a><a href="../../../public${entry.webp}" download>Flat WebP</a><a href="../../../public${entry.explodedWebp}" download>Exploded WebP</a><a href="${entry.landscape}" download>Flat PNG</a><a href="${entry.explodedPng}" download>Exploded PNG</a><a href="${entry.square}" download>Square PNG</a></nav><details><summary>Measurement reference (not a decorative asset)</summary><p><a href="${entry.sheet}">Original technical sheet</a></p></details></div></article>`).join('')}</section></main></body></html>`;
await writeFile(path.join(docsDir, 'index.html'), gallery);
console.log(`Built ${catalog.length} app elements with homepage-matched strokes, minimal dimensions and transparent flat/exploded exports.`);
