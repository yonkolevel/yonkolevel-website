// Sparse source-backed dimensions, using the homepage's tick/leader vocabulary.
import { Drawing } from './drawing.mjs';

export const landingStroke = Object.freeze({ outline: 2.5, cameraDetail: 1.25, musicDetail: 1.5, fine: .6 });

export function elementStyle(spec) {
  const camera = spec.product === 'Invisible Camera';
  const detail = camera ? landingStroke.cameraDetail : landingStroke.musicDetail;
  const measure = camera ? landingStroke.fine : landingStroke.musicDetail;
  return `
    .app-elements *{vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}
    .obj{fill:#fff;stroke:#333;stroke-width:${landingStroke.outline}}
    .well{fill:#f4f4f4;stroke:#555;stroke-width:${landingStroke.outline}}
    .hug{fill:#e4e4e4;stroke:#555;stroke-width:${landingStroke.outline}}
    .slot{fill:none;stroke:#888;stroke-width:${detail};stroke-dasharray:5 4}
    .line{fill:none;stroke:#555;stroke-width:${detail}}
    .guide{fill:none;stroke:#aaa;stroke-width:${landingStroke.fine}}
    .annotations line,.annotations polyline,.annotations circle{vector-effect:non-scaling-stroke}
    .measure{fill:none;stroke:#555;stroke-width:${measure}}
    .extension,.tick{fill:none;stroke:#777;stroke-width:${landingStroke.fine}}
    .size-note{font-family:monospace;font-size:12px;font-weight:400;fill:#555;stroke:none}
  `;
}

// Coordinates are projected out of the artwork so notes never shear or scale
// with an exploded layer. Numbers describe source logical units, not export px.
export function measurements(spec, project, scale, isExploded) {
  const d = new Drawing(`${spec.id}-measurements`);
  const unit = spec.units === 'SwiftUI pt' ? 'pt' : 'px';
  const annotations = [];
  function note(code, prefix = '', suffix = '') {
    const row = spec.rows.find(([key]) => key === code);
    if (!row) throw new Error(`Missing source code ${spec.id}:${code}`);
    const raw = row[2].includes('=') ? row[2].split('=').at(-1).trim() : row[2];
    if (!/^\d+(\.\d+)?$/.test(raw)) throw new Error(`Cannot publish unresolved measurement ${spec.id}:${code}`);
    const label = `${prefix}${raw}${unit}${suffix}`;
    const attributes = `data-annotation="size" data-code="${code}" data-value="${raw}" data-unit="${unit}"`;
    annotations.push({ code, value: Number(raw), unit, label });
    return { label, attributes };
  }
  function dim(a, b, layer, offset, code, prefix = '') {
    const p = project(...a, layer), q = project(...b, layer);
    const length = Math.hypot(q.x - p.x, q.y - p.y);
    const u = { x: (q.x - p.x) / length, y: (q.y - p.y) / length };
    const n = { x: -u.y, y: u.x }, direction = Math.sign(offset);
    const p1 = { x: p.x + n.x * offset, y: p.y + n.y * offset };
    const p2 = { x: q.x + n.x * offset, y: q.y + n.y * offset };
    for (const [from, to] of [[p, p1], [q, p2]]) {
      d.line(from.x + n.x * direction * 4, from.y + n.y * direction * 4, to.x + n.x * direction * 7, to.y + n.y * direction * 7, 'extension');
      d.line(to.x - n.x * 5, to.y - n.y * 5, to.x + n.x * 5, to.y + n.y * 5, 'tick');
    }
    d.line(p1.x, p1.y, p2.x, p2.y, 'measure');
    let angle = Math.atan2(u.y, u.x) * 180 / Math.PI;
    if (angle > 90) angle -= 180;
    const tx = (p1.x + p2.x) / 2 + n.x * direction * 13;
    const ty = (p1.y + p2.y) / 2 + n.y * direction * 13;
    const text = note(code, prefix);
    d.text(tx, ty, text.label, 'size-note', 'middle', `${text.attributes} dominant-baseline="middle" transform="rotate(${angle} ${tx} ${ty})"`);
  }
  function leader(point, layer, dx, dy, code, prefix = '', suffix = '') {
    const p = project(...point, layer), direction = dx < 0 ? -1 : 1;
    const x = p.x + dx, y = p.y + dy;
    d.circle(p.x, p.y, 1.8, '', 'fill="#777"');
    d.add(`<polyline points="${p.x},${p.y} ${x},${y} ${x + 12 * direction},${y}" class="extension"/>`);
    const text = note(code, prefix, suffix);
    d.text(x + 18 * direction, y + 4, text.label, 'size-note', direction < 0 ? 'end' : 'start', text.attributes);
  }

  const circleClearance = 35 * scale * (isExploded ? .523 : 1) + 26;
  d.add('<g class="annotations">');
  switch (spec.id) {
    case 'invisible-camera-viewfinder':
      dim([160, 651], [230, 651], 2, circleClearance, 'Z1', 'Ø');
      leader([16, 514], 1, -45, -22, 'S1');
      dim([390, 562], [390, 606], 1, -30, 'H1');
      break;
    case 'invisible-camera-shutter':
      dim([0, 35], [70, 35], 0, circleClearance, 'Z1', 'Ø');
      leader([35 + 32 * Math.SQRT1_2, 35 - 32 * Math.SQRT1_2], 2, 52, -28, 'Z3', 'Ø');
      if (isExploded) leader([67.5, 35], 1, 58, 0, 'Z2', 'Ø');
      else leader([35 - 33.75 * Math.SQRT1_2, 35 - 33.75 * Math.SQRT1_2], 0, -48, -28, 'S1');
      break;
    case 'midicircuit-song-grid':
      dim([84, 0], [164, 0], 0, -30, 'W1');
      dim([0, 54], [0, 114], 0, 30, 'H1');
      leader([166, 0], 0, 68, -52, 'S1');
      leader([413, 303], 1, 36, 24, 'R1', 'R');
      break;
    case 'midicircuit-drum-pads':
      leader([96.5, 0], 0, 52, -30, 'S1', '', ' gap');
      leader([4, 4], 0, -8, 24, 'S2', '', ' inset');
      break;
    case 'push-play-dual-deck':
      dim([0, 0], [68, 0], 1, -30, 'W1');
      dim([464, 0], [500, 0], 0, -30, 'S1');
      dim([0, 0], [0, 104], 1, 32, 'H1');
      dim([392, 363], [572, 363], 2, 38, 'W2');
      break;
    case 'push-play-hardware-display':
      dim([0, 160], [960, 160], 0, 50, 'W');
      dim([0, 0], [0, 160], 0, 30, 'H');
      dim([0, 0], [120, 0], 2, -30, 'W1');
      break;
    default: throw new Error(`No measurements for ${spec.id}`);
  }
  d.add('</g>');
  return { svg: d.toString(), annotations };
}
