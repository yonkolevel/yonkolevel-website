// SVG dimension/leader conventions adapted from dimensional-drawing's card kit.
// Copyright (c) 2026 Enes Ozturk. MIT; see THIRD_PARTY_NOTICES.md.
export const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const css = `
  text{font-family:Arial,Helvetica,sans-serif;fill:#191919}
  .mono,.dim,.label,.tiny{font-family:Departure,monospace}
  .obj{fill:#fff;stroke:#191919;stroke-width:1.6}
  .well{fill:#f3f3f3;stroke:#191919;stroke-width:1}
  .hug{fill:#e6e6e6;stroke:#191919;stroke-width:1}
  .slot{fill:none;stroke:#666;stroke-width:1;stroke-dasharray:5 4}
  .line{fill:none;stroke:#191919;stroke-width:1}
  .phantom{fill:none;stroke:#888;stroke-width:.8;stroke-dasharray:14 4 3 4}
  .extension{fill:none;stroke:#666;stroke-width:.6}
  .dimension{fill:none;stroke:#191919;stroke-width:.8}
  .dim{font-size:15px;paint-order:stroke;stroke:#fff;stroke-width:5;stroke-linejoin:round}
  .label{font-size:14px;letter-spacing:.3px}
  .tiny{font-size:11px;fill:#555}
  .view-title{font-size:17px;letter-spacing:1.6px}
  .note{font-size:17px;fill:#444}
  .guide{stroke:#ddd;stroke-width:.7;fill:none}
  .headline{font-size:58px;letter-spacing:-1.8px;font-weight:400}
`;

export class Drawing {
  constructor(prefix) { this.prefix = prefix; this.parts = []; }
  add(markup) { this.parts.push(markup); }
  line(x1, y1, x2, y2, cls = 'line', extra = '') {
    this.add(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" ${extra}/>`);
  }
  rect(x, y, w, h, r = 0, cls = 'obj', extra = '') {
    this.add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${cls}" ${extra}/>`);
  }
  circle(x, y, r, cls = 'line', extra = '') {
    this.add(`<circle cx="${x}" cy="${y}" r="${r}" class="${cls}" ${extra}/>`);
  }
  text(x, y, value, cls = 'label', anchor = 'start', extra = '') {
    this.add(`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" ${extra}>${esc(value)}</text>`);
  }
  slot(x, y, w, h, label, cls = 'slot', font = 14) {
    this.rect(x, y, w, h, 0, cls);
    if (label) this.text(x + w / 2, y + h / 2 + 5, label, 'label', 'middle', `style="font-size:${font}px"`);
  }
  cross(x, y, w, h) {
    this.line(x, y, x + w, y + h, 'guide'); this.line(x + w, y, x, y + h, 'guide');
  }
  center(x, y, w, h) {
    this.line(x - 14, y + h / 2, x + w + 14, y + h / 2, 'phantom');
    this.line(x + w / 2, y - 14, x + w / 2, y + h + 14, 'phantom');
  }
  dimH(x1, x2, y, from, code, dy = -9) {
    [x1, x2].forEach((x) => this.line(x, from + Math.sign(y - from) * 3, x, y + Math.sign(y - from) * 5, 'extension'));
    if (x2 - x1 < 28) {
      this.line(x1 - 16, y, x1, y, 'dimension', `marker-end="url(#${this.prefix}-arrow)"`);
      this.line(x2 + 16, y, x2, y, 'dimension', `marker-end="url(#${this.prefix}-arrow)"`);
      this.line(x1, y, x2, y, 'dimension');
    } else {
      this.line(x1, y, x2, y, 'dimension', `marker-start="url(#${this.prefix}-arrow)" marker-end="url(#${this.prefix}-arrow)"`);
    }
    this.text((x1 + x2) / 2, y + dy, code, 'dim', 'middle', `data-code="${code}"`);
  }
  dimV(y1, y2, x, from, code) {
    [y1, y2].forEach((y) => this.line(from + Math.sign(x - from) * 3, y, x + Math.sign(x - from) * 5, y, 'extension'));
    if (y2 - y1 < 28) {
      this.line(x, y1 - 16, x, y1, 'dimension', `marker-end="url(#${this.prefix}-arrow)"`);
      this.line(x, y2 + 16, x, y2, 'dimension', `marker-end="url(#${this.prefix}-arrow)"`);
      this.line(x, y1, x, y2, 'dimension');
    } else {
      this.line(x, y1, x, y2, 'dimension', `marker-start="url(#${this.prefix}-arrow)" marker-end="url(#${this.prefix}-arrow)"`);
    }
    this.text(x - 10, (y1 + y2) / 2 + 5, code, 'dim', 'end', `data-code="${code}"`);
  }
  callout(px, py, x, y, label, direction = 1) {
    this.circle(px, py, 2, '', 'fill="#191919"');
    this.add(`<polyline points="${px},${py} ${x},${y} ${x + direction * 16},${y}" class="line"/>`);
    this.text(x + direction * 24, y + 5, label, 'label', direction === 1 ? 'start' : 'end');
  }
  caption(x, y, title, subtitle) {
    this.text(x, y, title, 'view-title', 'middle');
    if (subtitle) this.text(x, y + 24, subtitle, 'tiny', 'middle');
  }
  group(transform, draw) {
    this.add(`<g transform="${transform}">`); draw(); this.add('</g>');
  }
  toString() { return this.parts.join(''); }
}

export function definitions(prefix, font) {
  return `<defs><style>@font-face{font-family:Departure;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:400;font-style:normal}${css}</style>
  <marker id="${prefix}-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M0 1.7 L10 5 L0 8.3 Z" fill="#191919"/></marker>
  <pattern id="${prefix}-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#999" stroke-width=".7"/></pattern></defs>`;
}

function viewfinder(d) {
  const x = 116, y = 42, w = 286, h = 506;
  d.rect(x, y, w, h, 0);
  d.slot(x, y, w, 294, ''); d.cross(x, y, w, 294);
  d.rect(x + 42, y + 119, 202, 38, 0, 'obj', 'stroke="none"');
  d.text(x + w / 2, y + 143, 'LIVE PREVIEW · FILL', 'label', 'middle');
  d.rect(x, 336, w, 212, 0, 'well');
  d.slot(x + 16, 360, w - 32, 30, 'UTILITY · HUG', 'slot', 12);
  d.slot(x + 16, 398, w - 32, 34, 'LOOK + RATIO', 'hug', 12);
  d.circle(259, 490, 35, 'obj'); d.circle(259, 490, 32.5, 'hug'); d.circle(259, 490, 32, 'obj');
  d.rect(136, 468, 44, 44, 0, 'slot'); d.cross(136, 468, 44, 44);
  d.circle(359, 490, 27, 'slot');
  d.dimH(x, x + w, 20, y, 'W'); d.dimV(y, y + h, 76, x, 'H');
  d.caption(259, 588, '01 / VIEWFINDER', 'ADAPTIVE VIEWPORT · NOT A DEVICE OUTLINE');
  d.circle(402, 430, 25, 'slot');
  d.line(427, 430, 516, 364, 'phantom');
  d.caption(786, 72, '02 / CONTROL DECK', 'REGULAR LAYOUT · PROPORTIONAL SCHEMATIC');
  d.rect(556, 114, 460, 330, 0, 'well');
  d.slot(572, 138, 428, 44, 'UTILITY SLOT · HUG');
  d.slot(572, 198, 428, 44, 'LOOK + RATIO · FILL', 'hug');
  d.rect(572, 282, 428, 92, 0, 'slot');
  d.rect(691, 282, 190, 92, 0, 'slot');
  d.circle(786, 328, 35, 'obj'); d.circle(786, 328, 32.5, 'hug'); d.circle(786, 328, 32, 'obj');
  d.slot(584, 306, 44, 44, ''); d.cross(584, 306, 44, 44);
  d.circle(961, 328, 27, 'slot');
  d.dimV(198, 242, 1055, 1016, 'H1');
  d.dimV(282, 374, 1055, 1016, 'H2');
  d.dimH(691, 881, 406, 374, 'W1');
  d.callout(786, 328, 859, 470, 'Z1 · SHUTTER');
  d.text(556, 520, 'PREVIEW FIRST.', 'view-title');
  d.text(556, 550, 'CONTROLS WITHIN REACH.', 'view-title');
}

function shutter(d) {
  d.circle(296, 302, 210, 'obj');
  d.circle(296, 302, 195, 'hug');
  d.circle(296, 302, 192, 'obj');
  d.center(86, 92, 420, 420);
  d.dimH(86, 506, 58, 302, 'Z1');
  d.dimH(101, 491, 552, 302, 'Z2');
  d.line(296, 302, 432, 438, 'dimension', `marker-end="url(#${d.prefix}-arrow)"`);
  d.text(372, 368, 'R3', 'dim', 'middle', 'data-code="R3"');
  d.text(296, 282, 'CAPTURE FACE', 'label', 'middle');
  d.caption(296, 594, '01 / IDLE SHUTTER', 'CONCENTRIC SURFACES · ENLARGED');
  d.caption(818, 55, '02 / RING SECTION', 'RADIAL STRIP · ENLARGED');
  d.rect(663, 131, 300, 210, 0, 'obj');
  d.rect(663, 131, 125, 210, 0, 'line', `style="fill:url(#${d.prefix}-hatch)"`);
  d.rect(788, 131, 25, 210, 0, 'hug');
  d.dimH(663, 788, 112, 131, 'S1');
  d.dimH(788, 813, 374, 341, 'S2', 23);
  d.callout(891, 206, 925, 402, 'FACE');
  d.text(663, 441, 'SHARED CENTER', 'view-title');
  d.text(663, 476, 'R1 = Z1 ÷ 2', 'label');
  d.text(663, 506, 'R2 = Z2 ÷ 2', 'label');
  d.text(663, 536, 'R3 = Z3 ÷ 2', 'label');
}

function song(d) {
  const x = 64, y = 118, scale = 1.24, cw = 80 * scale, ch = 60 * scale, gap = 4 * scale, hh = 50 * scale;
  for (let row = 0; row < 4; row++) {
    const cy = y + hh + gap + row * (ch + gap);
    d.slot(x, cy, cw, ch, 'TRACK', 'slot', 12);
    for (let col = 0; col < 4; col++) {
      const cx = x + cw + gap + col * (cw + gap);
      d.rect(cx, cy, cw, ch, 6 * scale, (row + col) % 4 === 1 ? 'slot' : 'well');
      if ((row + col) % 4 !== 1) {
        d.rect(cx + 4 * scale, cy + 4 * scale, cw - 8 * scale, ch - 8 * scale, 0, 'slot');
        d.text(cx + cw / 2, cy + ch / 2 + 4, 'CLIP', 'tiny', 'middle');
      }
    }
  }
  for (let col = 0; col < 4; col++) d.slot(x + cw + gap + col * (cw + gap), y, cw, hh, 'SECTION', 'hug', 11);
  const start = x + cw + gap;
  d.dimH(start, start + cw, 88, y, 'W1');
  d.dimV(y, y + hh, 617, 579, 'H2');
  d.dimV(y + hh + gap, y + hh + gap + ch, 617, 579, 'H1');
  d.line(start, 530, 576, 530, 'dimension', `marker-end="url(#${d.prefix}-arrow)"`);
  d.text(364, 557, 'HORIZONTAL SCROLL', 'tiny', 'middle');
  d.caption(321, 598, '01 / SONG GRID', 'FIXED LABELS · SCROLLABLE SECTIONS');
  d.caption(865, 92, '02 / CLIP CELL', 'ENLARGED · CONTENT IS A SLOT');
  d.rect(704, 175, 304, 228, 22.8, 'well');
  d.slot(719.2, 190.2, 273.6, 197.6, 'CONTENT SLOT · FILL');
  d.dimH(704, 1008, 143, 175, 'W1');
  d.dimV(175, 403, 1052, 1008, 'H1');
  d.dimH(719.2, 992.8, 443, 403, 'W2');
  d.callout(712, 184, 670, 490, 'R1', -1);
  d.callout(731, 191, 827, 517, 'S2 · INSET');
}

function pads(d) {
  const x = 80, y = 107, cell = 100, gap = 4;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const px = x + col * (cell + gap), py = y + row * (cell + gap);
      d.rect(px, py, cell, cell, 0, row === 2 && col === 1 ? 'hug' : 'well');
      d.text(px + cell / 2, py + cell / 2 + 4, 'LABEL', 'tiny', 'middle');
    }
  }
  d.dimH(x, x + 412, 69, y, 'W'); d.dimV(y, y + 412, 50, x, 'H');
  d.callout(182, 109, 541, 84, 'S1');
  d.caption(286, 568, '01 / PAD GRID', '4 × 4 · GUTTERS ENLARGED FOR CLARITY');
  d.caption(834, 74, '02 / INPUT + CONTENT', 'VISUAL AND TOUCH LAYERS ARE SEPARATE');
  d.rect(702, 160, 286, 286, 0, 'well');
  d.slot(726, 184, 238, 238, 'LABEL SLOT · FILL');
  d.dimH(702, 988, 125, 160, 'W1');
  d.dimV(160, 446, 1040, 988, 'H1');
  d.callout(726, 196, 685, 485, 'S2', -1);
  d.rect(681, 141, 328, 328, 0, 'phantom');
  d.callout(1009, 281, 977, 531, 'TOUCH OVERLAY', -1);
}

function knob(d, x, y) {
  d.circle(x, y, 20, 'obj'); d.line(x, y, x + 12, y - 12);
  d.line(x - 7, y, x + 7, y, 'guide'); d.line(x, y - 7, x, y + 7, 'guide');
}

function decks(d) {
  const left = 62, right = 608, width = 430, top = 95;
  d.rect(42, 52, 1018, 335, 0, 'obj');
  d.slot(62, 62, 978, 22, 'SETTINGS REGION · HUG', 'slot', 11);
  for (const [x, flip] of [[left, false], [right, true]]) {
    const waveX = flip ? x : x + 144;
    d.slot(waveX, top, 286, 104, 'WAVEFORM SLOT', 'well', 12);
    const controlX = flip ? x + 286 : x;
    for (let i = 0; i < 2; i++) {
      d.rect(controlX + i * 72, top, 68, 104, 0, 'slot');
      knob(d, controlX + i * 72 + 34, top + 56);
      d.text(controlX + i * 72 + 34, top + 90, 'VALUE', 'tiny', 'middle');
    }
    const eqX = flip ? x : x + 218;
    for (let i = 0; i < 3; i++) {
      d.rect(eqX + i * 72, 216, 68, 104, 0, 'slot');
      knob(d, eqX + i * 72 + 34, 261);
      d.text(eqX + i * 72 + 34, 300, 'EQ', 'tiny', 'middle');
      d.slot(eqX + i * 72, 337, 68, 28, 'ACTION', 'hug', 10);
    }
  }
  d.dimH(492, 608, 28, 52, 'S1');
  d.dimV(95, 199, 28, 62, 'H1');
  d.dimH(62, 130, 419, 199, 'W1');
  // Shared crossfader, shown outside deck regions to keep the relationship clear.
  d.rect(460, 418, 180, 12, 0, 'well'); d.rect(544, 407, 12, 34, 0, 'obj');
  d.line(550, 407, 550, 441);
  d.caption(550, 478, '01 / MIRRORED DECKS', 'PROPORTIONAL SCHEMATIC · INTERNAL MIXER');
  d.text(62, 535, '02 / FADER DETAIL', 'view-title');
  d.text(62, 563, 'RAIL + HANDLE', 'tiny');
  d.rect(460, 530, 360, 24, 0, 'well'); d.rect(628, 508, 24, 68, 0, 'obj'); d.line(640, 508, 640, 576);
  d.dimH(460, 820, 604, 554, 'W2');
  d.dimV(508, 576, 874, 820, 'H2');
  d.callout(652, 519, 900, 493, 'W3');
}

function display(d) {
  const x = 72, y = 116;
  d.rect(x, y, 960, 160, 0, 'obj');
  for (let i = 0; i < 8; i++) {
    const cx = x + i * 120;
    if (i) d.line(cx, y - 8, cx, y + 168, 'phantom');
    if (i === 0 || i === 7) d.slot(cx, y, 108, 16, '', 'hug');
    else {
      d.text(cx + 10, y + 10, 'LABEL / VALUE', 'tiny', 'start', 'style="font-size:8px"');
      d.rect(cx + 10, y + 14, 88, 6, 2, 'hug');
    }
  }
  d.slot(x + 120, y + 44, 360, 116, 'WAVEFORM A · FILL', 'well');
  d.slot(x + 480, y + 44, 360, 116, 'WAVEFORM B · FILL', 'well');
  [x, x + 840].forEach((cx) => { knob(d, cx + 30, y + 94); knob(d, cx + 90, y + 94); });
  d.dimH(x, x + 960, 64, y, 'W');
  d.dimH(x, x + 120, 97, y, 'W1');
  d.dimV(y, y + 160, 48, x, 'H');
  d.dimV(y, y + 24, 1080, x + 960, 'H1');
  d.dimV(y + 44, y + 160, 1080, x + 960, 'H2');
  d.caption(552, 325, '01 / DISPLAY PLAN', 'EIGHT COLUMNS · TWO DECKS · FIXED CANVAS');
  d.caption(274, 394, '02 / EQ CONTROL', 'ENLARGED');
  d.rect(100, 428, 324, 96, 0, 'slot');
  d.text(130, 463, 'LABEL SLOT / VALUE SLOT', 'label');
  d.rect(130, 484, 264, 18, 6, 'hug');
  d.line(262, 479, 262, 507);
  d.dimH(100, 424, 562, 524, 'W2');
  d.dimH(130, 394, 598, 502, 'W3');
  d.dimV(484, 502, 466, 424, 'H3');
  d.text(650, 434, 'ROW CONSTRUCTION', 'view-title');
  d.text(650, 474, 'H = H1 + S1 + H2', 'label');
  d.text(650, 510, '160 = 24 + 20 + 116', 'note');
  d.text(650, 554, 'UI CANVAS, NOT HARDWARE SIZE.', 'tiny');
}

const renderers = { 'invisible-camera-viewfinder': viewfinder, 'invisible-camera-shutter': shutter, 'midicircuit-song-grid': song, 'midicircuit-drum-pads': pads, 'push-play-dual-deck': decks, 'push-play-hardware-display': display };

export function illustration(spec, prefix) {
  const drawing = new Drawing(prefix);
  renderers[spec.id](drawing);
  return drawing.toString();
}

export function exploded(spec, prefix) {
  const d = new Drawing(prefix);
  const a = .72, b = .13, c = -.26, e = .36, tx = 155, ty = 215;
  const stroke = 'vector-effect="non-scaling-stroke"';
  for (let layer = 0; layer < 3; layer++) {
    const z = layer * 56;
    d.group(`matrix(${a} ${b} ${c} ${e} ${tx} ${ty - z})`, () => {
      if (spec.id.endsWith('shutter')) {
        d.circle(170, 80, [70, 65, 64][layer] * 1.1, layer === 1 ? 'hug' : 'obj', stroke);
        d.circle(170, 80, 2, 'line', stroke);
        return;
      }
      d.rect(0, 0, 340, 154, 0, layer === 2 ? 'slot' : 'obj', stroke);
      if (spec.id.endsWith('viewfinder')) {
        if (layer === 0) d.cross(8, 8, 324, 138);
        if (layer === 1) d.rect(8, 76, 324, 70, 0, 'well', stroke);
        if (layer === 2) {
          d.rect(18, 88, 304, 16, 0, 'slot', stroke);
          d.circle(170, 127, 15, 'obj', stroke);
          d.rect(28, 116, 24, 24, 0, 'slot', stroke);
          d.circle(300, 128, 12, 'slot', stroke);
        }
      } else if (spec.id.endsWith('song-grid')) {
        if (layer > 0) {
          for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 5; col++) {
              d.rect(12 + col * 64, 24 + row * 40, 58, 34, 3, layer === 2 ? 'slot' : col === 0 ? 'obj' : 'well', stroke);
            }
          }
        }
      } else if (spec.id.endsWith('drum-pads')) {
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
            d.rect(8 + col * 82, 6 + row * 36, 78, 32, 0, layer === 2 ? 'slot' : layer === 0 ? 'well' : 'obj', stroke);
          }
        }
      } else if (spec.id.endsWith('dual-deck')) {
        if (layer < 2) {
          [10, 178].forEach((x) => {
            d.rect(x, 10, 152, 118, 0, layer === 0 ? 'slot' : 'well', stroke);
            if (layer === 1) {
              d.rect(x + 8, 16, 136, 36, 0, 'slot', stroke);
              [38, 76, 114].forEach((dx) => d.circle(x + dx, 90, 13, 'obj', stroke));
            }
          });
        } else {
          [10, 178].forEach((x) => d.rect(x, 112, 152, 18, 0, 'hug', stroke));
          d.rect(130, 139, 80, 6, 0, 'well', stroke);
        }
      } else if (spec.id.endsWith('hardware-display')) {
        if (layer === 1) for (let col = 0; col < 8; col++) d.rect(col * 42.5, 0, 42.5, 154, 0, 'slot', stroke);
        if (layer === 2) {
          for (let col = 0; col < 8; col++) d.rect(col * 42.5 + 3, 8, 36, 18, 0, 'hug', stroke);
          d.rect(42.5, 44, 127.5, 102, 0, 'well', stroke);
          d.rect(170, 44, 127.5, 102, 0, 'well', stroke);
        }
      }
    });
    const py = ty - z + 154 * e;
    d.line(115, py, 140, py, 'extension');
    d.text(105, py + 4, `L${layer}`, 'tiny', 'end');
  }
  d.text(475, 131, 'EXPLODED VIEW', 'view-title');
  spec.layers.forEach((layer, i) => d.text(475, 165 + i * 30, `L${i}  ${layer.toUpperCase()}`, 'tiny'));
  d.text(475, 273, 'SCHEMATIC LAYERS · Z GAPS NOT TO SCALE', 'tiny');
  return d.toString();
}
