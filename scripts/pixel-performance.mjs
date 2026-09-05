// Node 22 + a dedicated Chrome tab on CDP port 9222. No browser dependency.
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const phase = process.argv[2] || 'before';
const output = process.argv[3] || `/tmp/pixel-perf/${phase}`;
await mkdir(output, { recursive: true });
const tabs = await fetch('http://localhost:9222/json/list').then(r => r.json());
const tab = tabs.find(t => t.url.startsWith('http://localhost:3000'));
if (!tab) throw new Error('Open a dedicated localhost:3000 tab first.');
const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let id = 0;
const pending = new Map();
const errors = [];
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
    const text = message.params.args.map(a => a.value ?? a.description).join(' ');
    if (/hydration|hydrated|server rendered|didn't match/i.test(text)) errors.push(text);
  }
  if (!message.id) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(JSON.stringify(message.error)));
  else resolve(message.result);
});
function call(method, params = {}) {
  return new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function evaluate(expression) {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function viewport(width) {
  await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
}
async function navigate(path) {
  await call('Page.navigate', { url: `http://localhost:3000${path}` });
  await sleep(1800);
  await evaluate('document.fonts.ready.then(() => true)');
  await sleep(1500);
}
async function metrics() {
  const { metrics } = await call('Performance.getMetrics');
  return Object.fromEntries(metrics.map(m => [m.name, m.value]));
}
const gridDiscovery = `window.pixelGrids = () => [...document.querySelectorAll('div')].filter(el => {
  if (el.hasAttribute('data-pixel-grid')) return true;
  const key = Object.keys(el).find(k => k.startsWith('__reactFiber$'));
  const parent = key && el[key]?.return;
  return parent && (parent.type?.name === 'PixelDisplacementGrid' || parent.type?.displayName === 'PixelDisplacementGrid');
});`;
await call('Page.enable');
await call('Runtime.enable');
await call('Performance.enable');
await call('Page.addScriptToEvaluateOnNewDocument', { source: `
  window.pixelObserved = new Set();
  const observe = IntersectionObserver.prototype.observe;
  const unobserve = IntersectionObserver.prototype.unobserve;
  const disconnect = IntersectionObserver.prototype.disconnect;
  const targets = new WeakMap();
  IntersectionObserver.prototype.observe = function(el) { window.pixelObserved.add(el); if (!targets.has(this)) targets.set(this,new Set()); targets.get(this).add(el); return observe.call(this,el); };
  IntersectionObserver.prototype.unobserve = function(el) { window.pixelObserved.delete(el); targets.get(this)?.delete(el); return unobserve.call(this,el); };
  IntersectionObserver.prototype.disconnect = function() { targets.get(this)?.forEach(el => window.pixelObserved.delete(el)); return disconnect.call(this); };
` });

if (process.argv.includes('--verify-only')) {
  const sharp = (await import('sharp')).default; // Already installed by Next; pixel-level transparency check.
  for (const width of [1440, 820, 390]) {
    await viewport(width);
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
    await navigate('/pixel-check');
    await evaluate(gridDiscovery);
    assert.equal(await evaluate('pixelGrids()[1].dataset.entered'), 'false', 'Offscreen panel waits');
    await evaluate(`pixelGrids()[1].scrollIntoView({block:'center',behavior:'instant'})`);
    await sleep(120);
    assert.ok(await evaluate('pixelGrids()[1].getAnimations({subtree:true}).length > 0'), 'First entry animates');
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await sleep(100);
    assert.equal(await evaluate('pixelGrids().flatMap(g=>g.getAnimations({subtree:true})).length'), 0, 'Live reduced motion cancels transitions');
    await navigate('/pixel-check');
    await evaluate(gridDiscovery);
    assert.equal(await evaluate('pixelGrids().every(g=>g.dataset.entered === "true")'), true, 'Reduced motion reveals even offscreen');
    assert.equal(await evaluate('pixelGrids().flatMap(g=>g.getAnimations({subtree:true})).length'), 0, 'Reduced first load does not animate');
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
    await evaluate('window.scrollTo({top:0,behavior:"instant"})');
    await sleep(100);
    await evaluate('pixelGrids()[1].scrollIntoView({block:"center",behavior:"instant"})');
    await sleep(150);
    assert.equal(await evaluate('pixelGrids().flatMap(g=>g.getAnimations({subtree:true})).length'), 0, 'Re-entry / re-enabling motion never replays');
    await evaluate(`window.scrollTo({top:0,behavior:'instant'}); window.testGrid = pixelGrids()[0]; window.testParent = testGrid.parentElement; testParent.style.width = '205px'; testParent.style.height = '125px';`);
    await sleep(150);
    assert.ok((await evaluate('testGrid.querySelector("path").getAttribute("d")')).startsWith('M0 0H200V120H0Z'), 'Container-only resize updates geometry');
    await evaluate('testParent.style.display = "none"');
    await sleep(150);
    assert.equal(await evaluate('testGrid.querySelectorAll("div").length'), 0, 'Zero-size clears stale cells');
    await evaluate('testParent.style.display = ""; testParent.style.width = "240px"; testParent.style.height = "400px"');
    await sleep(150);
    assert.ok((await evaluate('testGrid.querySelector("path").getAttribute("d")')).startsWith('M0 0H240V400H0Z'), 'Hidden-to-visible recovers');
    // Change only the backing surface: a punched hole must show both colours, while a solid cell stays blue.
    const points = await evaluate(`(() => { const r=testGrid.getBoundingClientRect(); return {x:r.left,y:r.top}; })()`);
    for (const [color, expected] of [['#ff0000',[255,0,0]], ['#00ff00',[0,255,0]]]) {
      await evaluate(`document.querySelector('#pixel-benchmark').style.background = '${color}'`);
      const {data} = await call('Page.captureScreenshot', {format:'png'});
      const sample = async (dx,dy) => [...await sharp(Buffer.from(data,'base64')).extract({left:Math.round(points.x+dx),top:Math.round(points.y+dy),width:1,height:1}).removeAlpha().raw().toBuffer()];
      assert.deepEqual(await sample(20,20), expected, 'Hole shows backing surface');
      assert.deepEqual(await sample(100,20), [0,122,255], 'Solid cell keeps its fill');
      await writeFile(`${output}/transparency-${width}-${color.slice(1)}.png`, Buffer.from(data,'base64'));
    }
    console.log('browser checks passed', width);
  }
  const html = await fetch('http://localhost:3000/pixel-check').then(r=>r.text());
  assert.match(html, /data-pixel-grid/);
  assert.match(html, /<rect width="100%" height="100%"/);
  assert.deepEqual(errors, [], 'No runtime or hydration errors');
  await writeFile(`${output}/verification.json`, JSON.stringify({widths:[1440,820,390],checks:'entry, live/initial reduced motion, re-entry, container resize, zero-size, recovery, transparent pixel samples, SSR fill, hydration',errors},null,2));
  await viewport(1440);
  socket.close();
  process.exit(0);
}

const shots = [
  ['/', 'HeroWithPixels', 'pixelGrids()[0]'],
  ['/', 'AppShowcaseSection', 'pixelGrids()[1]'],
  ['/', 'AppShowcaseSection-reversed', 'pixelGrids()[2]'],
  ['/products/midicircuit', 'ProductContentSection', 'pixelGrids()[1]'],
  ['/products/midicircuit', 'ProductContentSection-black', 'pixelGrids()[3]'],
  ['/products/midi-scout', 'ProductImageSection', 'pixelGrids()[0]'],
  ['/studio', 'PixelPanel-Studio', 'pixelGrids()[0]'],
  ['/studio', 'PixelPanel-enquiry', 'pixelGrids()[4]'],
  ['/products/invisible-camera', 'PixelPanel-ProductHero', 'pixelGrids()[0]'],
  ['/pixel-check', 'ShopHero', 'document.querySelector("#shop-hero-fixture")'],
];
const screenshots = [];
if (!process.argv.includes('--bench-only')) for (const width of [1440, 390]) {
  await viewport(width);
  let lastPath;
  for (const [path, name, selector] of shots) {
    if (path !== lastPath) { await navigate(path); await evaluate(gridDiscovery); lastPath = path; }
    const data = await evaluate(`(() => {
      const el = ${selector}; if (!el) throw new Error('Missing ${name}');
      window.scrollTo({top: el.getBoundingClientRect().top + scrollY - 100, behavior: 'instant'});
      document.querySelectorAll('video').forEach(v => v.pause());
      return { grids: pixelGrids().map(g => ({width:g.clientWidth,height:g.clientHeight,nodes:g.querySelectorAll('*').length})), totalNodes:document.querySelectorAll('*').length };
    })()`);
    await sleep(2300);
    const { data: png } = await call('Page.captureScreenshot', { format: 'png' });
    await writeFile(`${output}/${name}-${width}.png`, Buffer.from(png, 'base64'));
    screenshots.push({ name, width, ...data });
    console.log('screenshot', name, width, data.grids);
  }
}
const animations = [];
for (const width of [1440, 390]) {
  await viewport(width);
  for (let run = 0; run < 3; run++) {
    await navigate('/pixel-check');
    await evaluate(gridDiscovery);
    const before = await metrics();
    const frames = await evaluate(`new Promise(resolve => {
      const grid = pixelGrids()[1]; let layouts = 0; let styles = 0;
      const observer = new MutationObserver(records => { styles += records.length; for (const r of records) if (r.target.style.left || r.target.style.top) layouts++; });
      observer.observe(grid, {subtree:true, attributes:true,attributeFilter:['style']});
      const intervals = []; let last = performance.now(); const start = last;
      window.scrollTo({top:grid.getBoundingClientRect().top + scrollY - 100,behavior:'instant'});
      function frame(now) { intervals.push(now-last); last=now; if(now-start<1800) requestAnimationFrame(frame); else {observer.disconnect(); resolve({styleMutations:styles,positionedStyleMutations:layouts,frames:intervals.length,maxFrameMs:Math.max(...intervals)});} }
      requestAnimationFrame(frame);
    })`);
    const after = await metrics();
    const delta = {};
    for (const key of ['TaskDuration', 'ScriptDuration', 'LayoutDuration', 'RecalcStyleDuration', 'LayoutCount']) delta[key] = after[key] - before[key];
    animations.push({width, run, ...frames, delta});
    console.log('animation', JSON.stringify(animations.at(-1)));
  }
}
const runs = [];
for (const width of [1440, 390]) {
  for (let run = 0; run < 3; run++) {
    await viewport(width);
    await navigate('/pixel-check');
    await evaluate(gridDiscovery);
    const structure = await evaluate(`({ grids:pixelGrids().map(g => ({width:g.clientWidth,height:g.clientHeight,nodes:g.querySelectorAll('*').length})), observed: [...pixelObserved].filter(el => pixelGrids().some(g => g === el || g.contains(el))).length })`);
    const before = await metrics();
    for (let i = 0; i < 24; i++) { await viewport(width - (i % 2 ? 0 : 40)); await sleep(80); }
    await sleep(500);
    const after = await metrics();
    const delta = {};
    for (const key of ['TaskDuration', 'ScriptDuration', 'LayoutDuration', 'RecalcStyleDuration', 'LayoutCount', 'RecalcStyleCount']) delta[key] = after[key] - before[key];
    runs.push({ width, run, ...structure, delta });
    console.log('benchmark', JSON.stringify(runs.at(-1)));
  }
}
await writeFile(`${output}/results.json`, JSON.stringify({ phase, screenshots, runs, animations, errors }, null, 2));
await viewport(1440);
socket.close();
