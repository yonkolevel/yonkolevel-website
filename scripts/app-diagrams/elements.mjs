// App-focused counterparts to the technical sheets, with sparse size notes.
// Canvas proportions, skeleton marks and exploded depth are illustrative.
import { Drawing, esc } from './drawing.mjs';
import { elementStyle, measurements } from './annotations.mjs';

function bar(d, x, y, w, h = 4) {
  d.rect(x, y, w, h, h / 2, '', 'fill="#bbb"');
}

function knob(d, x, y, r = 21) {
  d.circle(x, y, r, 'obj');
  d.line(x, y, x + r * .65, y - r * .65);
  d.circle(x, y, 2, '', 'fill="#666"');
}

function play(d, x, y) {
  d.add(`<path d="M${x - 4} ${y - 6} l10 6 -10 6 z" fill="#666"/>`);
}

const subjects = {
  'invisible-camera-viewfinder': {
    width: 390, height: 700,
    alt: 'Unlabelled line drawing of the Invisible Camera preview and control deck, with film-look controls, gallery thumbnail, shutter and camera switch.',
    draw(d, layer) {
      if (layer === 0) {
        d.rect(0, 0, 390, 700, 0, 'obj');
        d.rect(0, 0, 390, 490, 0, 'well');
        d.cross(0, 0, 390, 490);
        d.add('<path d="M175 225 h-10 v20 M215 225 h10 v20 M165 265 v20 h10 M225 265 v20 h-10" class="line"/>');
      }
      if (layer === 1) {
        d.rect(0, 490, 390, 210, 0, 'obj');
        d.rect(16, 514, 122, 38, 19, 'well');
        d.rect(252, 514, 122, 38, 19, 'well');
        d.rect(112, 565, 166, 38, 19, 'hug');
      }
      if (layer === 2) {
        [34, 55, 76].forEach((x) => d.circle(x, 533, 3, '', 'fill="#888"'));
        d.rect(273, 524, 18, 18, 0, 'line');
        bar(d, 304, 532, 46, 3);
        bar(d, 132, 582, 83, 4);
        d.add('<path d="M249 579 l4 4 -4 4" class="line"/>');
        d.rect(16, 626, 50, 50, 3, 'well'); d.cross(16, 626, 50, 50);
        d.circle(195, 651, 35, 'obj'); d.circle(195, 651, 32.5, 'hug'); d.circle(195, 651, 32, 'obj');
        d.circle(347, 651, 27, 'well');
        d.add('<path d="M336 648 a12 12 0 0 1 20 -6 l3 3 m0 -7 v7 h-7 M358 654 a12 12 0 0 1 -20 6 l-3 -3 m0 7 v-7 h7" class="line"/>');
      }
    },
  },
  'invisible-camera-shutter': {
    width: 70, height: 70,
    alt: 'Three unlabelled concentric circular surfaces forming the Invisible Camera shutter button.',
    draw(d, layer) { d.circle(35, 35, [35, 32.5, 32][layer], layer === 1 ? 'hug' : 'obj'); },
  },
  'midicircuit-song-grid': {
    width: 416, height: 306,
    alt: 'Unlabelled Midicircuit song grid with a fixed track column, four section columns and four rows of clip cells.',
    draw(d, layer) {
      for (let row = 0; row < 4; row++) {
        const y = 54 + row * 64;
        if (layer === 0) {
          d.rect(0, y, 80, 60, 0, 'well');
          d.circle(40, y + 21, 8, 'line'); bar(d, 20, y + 40, 40, 3);
        }
        for (let col = 0; col < 4; col++) {
          const x = 84 + col * 84;
          if (layer === 0 && row === 0) {
            d.rect(x, 0, 80, 50, 0, 'well'); bar(d, x + 16, 24, 48, 3);
          }
          if (layer === 1) d.rect(x, y, 80, 60, 6, (row + col) % 4 === 1 ? 'slot' : 'well');
          if (layer === 2 && (row + col) % 4 !== 1) {
            d.rect(x + 4, y + 4, 72, 52, 2, 'slot');
            [0, 1, 2].forEach((i) => bar(d, x + 12 + i * 13, y + 18 + (i % 2) * 15, 16, 3));
          }
        }
      }
    },
  },
  'midicircuit-drum-pads': {
    width: 387, height: 387,
    alt: 'Unlabelled four-by-four Midicircuit drum-pad grid with one active pad and a separate touch surface in the exploded version.',
    draw(d, layer, exploded) {
      if (layer === 2) {
        if (exploded) d.rect(0, 0, 387, 387, 0, 'slot');
        return;
      }
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const x = col * 97, y = row * 97;
          if (layer === 0) d.rect(x, y, 96, 96, 0, row === 2 && col === 1 ? 'hug' : 'well');
          else bar(d, x + 27, y + 46, 42, 4);
        }
      }
    },
  },
  'push-play-dual-deck': {
    width: 964, height: 390,
    alt: 'Unlabelled mirrored Push Play decks with waveform regions, volume and tempo knobs, three-band EQ controls, transport buttons and a shared crossfader.',
    draw(d, layer) {
      for (const [x, flip] of [[0, false], [500, true]]) {
        const waveX = flip ? x : x + 144;
        const controlX = flip ? x + 324 : x;
        const eqX = flip ? x : x + 252;
        if (layer === 0) {
          d.rect(waveX, 0, 320, 104, 0, 'well');
          d.cross(waveX + 8, 8, 304, 88);
          d.line(waveX + 80, 0, waveX + 80, 104);
        }
        if (layer === 1) {
          for (let i = 0; i < 2; i++) {
            knob(d, controlX + i * 72 + 34, 52);
            bar(d, controlX + i * 72 + 20, 87, 28, 3);
          }
          for (let i = 0; i < 3; i++) {
            knob(d, eqX + i * 72 + 34, 197);
            bar(d, eqX + i * 72 + 21, 232, 26, 3);
          }
        }
        if (layer === 2) {
          for (let i = 0; i < 3; i++) {
            const bx = eqX + i * 72;
            d.rect(bx, 280, 68, 34, 0, 'well');
            if (i === (flip ? 2 : 0)) play(d, bx + 34, 297);
            else if (i === 1) d.circle(bx + 34, 297, 6, 'line');
            else d.add(`<path d="M${bx + 26} 300 v-5 a8 8 0 0 1 16 0 v5 m-16 -3 v6 m16 -6 v6" class="line"/>`);
          }
        }
      }
      if (layer === 2) {
        d.rect(392, 357, 180, 12, 0, 'well');
        d.rect(476, 346, 12, 34, 0, 'obj'); d.line(482, 346, 482, 380);
      }
    },
  },
  'push-play-hardware-display': {
    width: 960, height: 160,
    alt: 'Unlabelled Push Play display layout with eight control columns, paired waveform regions and outer volume and tempo controls.',
    draw(d, layer) {
      if (layer === 0) d.rect(0, 0, 960, 160, 0, 'obj');
      if (layer === 1) {
        [120, 480].forEach((x) => { d.rect(x, 44, 360, 116, 0, 'well'); d.cross(x + 8, 52, 344, 100); });
      }
      if (layer === 2) {
        for (let col = 0; col < 8; col++) {
          const x = col * 120;
          if (col === 0 || col === 7) {
            d.rect(x, 0, 108, 16, 0, 'hug');
            knob(d, x + 30, 94, 17.5); knob(d, x + 90, 94, 17.5);
          } else {
            bar(d, x + 10, 4, 30, 3); bar(d, x + 66, 4, 32, 3);
            d.rect(x + 10, 14, 88, 6, 2, 'hug'); d.line(x + 54, 12, x + 54, 22);
          }
        }
      }
    },
  },
};

export function elementAlt(spec) {
  return subjects[spec.id].alt.replace(/Unlabelled |unlabelled /g, '') + ' With a few source-backed size annotations.';
}

export function elementSvg(spec, { width = 1600, height = 1000, exploded = false, tight = false, license = '' } = {}) {
  const subject = subjects[spec.id];
  const prefix = `${spec.id}-${exploded ? 'exploded' : 'flat'}`;
  const d = new Drawing(prefix);
  const w = subject.width, h = subject.height;
  const gap = h * .24;
  const bounds = exploded
    ? { x: -.34 * h, y: -2 * gap, w: .94 * w + .34 * h, h: .17 * w + .47 * h + 2 * gap }
    : { x: 0, y: 0, w, h };
  const pad = 100;
  if (tight) {
    // Small components need enough drawing area for genuinely small notes.
    const naturalScale = Math.max(1, 600 / Math.max(bounds.w, bounds.h));
    width = Math.ceil(bounds.w * naturalScale + pad * 2);
    height = Math.ceil(bounds.h * naturalScale + pad * 2);
  }
  const scale = Math.min((width - pad * 2) / bounds.w, (height - pad * 2) / bounds.h);
  const x = (width - bounds.w * scale) / 2 - bounds.x * scale;
  const y = (height - bounds.h * scale) / 2 - bounds.y * scale;
  d.add(`<g class="app-elements" transform="translate(${x} ${y}) scale(${scale})">`);
  for (let layer = 0; layer < 3; layer++) {
    d.group(exploded ? `matrix(.94 .17 -.34 .47 0 ${-layer * gap})` : 'translate(0 0)', () => subject.draw(d, layer, exploded));
  }
  d.add('</g>');
  const project = (px, py, layer) => ({
    x: x + (exploded ? .94 * px - .34 * py : px) * scale,
    y: y + (exploded ? .17 * px + .47 * py - layer * gap : py) * scale,
  });
  const notes = measurements(spec, project, scale, exploded);
  return {
    width, height, annotations: notes.annotations,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${prefix}-title ${prefix}-desc"><title id="${prefix}-title">${esc(spec.product)} — ${esc(spec.subject)}</title><desc id="${prefix}-desc">${esc(elementAlt(spec))}</desc><metadata>${esc(license)}</metadata><style>${elementStyle(spec)}</style>${d}${notes.svg}</svg>`,
  };
}
