# App elements

**Six subjects, each in flat and exploded form.** App geometry with **2–4 small size notes**, ticked dimensions and short leaders, matching the landing-page drawing style. No marketing titles, subtitles, branding, tables or footers. SVG, WebP and PNG exports retain transparent canvases and white/gray component surfaces.

[Open the gallery](index.html) · [Flat preview](qa/landscape-contact.png) · [Exploded preview](qa/exploded-contact.png)

The checkerboard appears only in the gallery and QA contact sheets. It is **not baked into the assets**. Product names and SVG `<title>`/`<desc>` metadata identify files and support accessibility; they do not render inside the artwork.

## Subjects

| App | Elements | Filename stems |
| --- | --- | --- |
| Invisible Camera | Preview/control deck; shutter | `invisible-camera-viewfinder`, `invisible-camera-shutter` |
| Midicircuit | Song grid; drum-pad grid | `midicircuit-song-grid`, `midicircuit-drum-pads` |
| Push Play | Mirrored decks/crossfader; Push 2 display | `push-play-dual-deck`, `push-play-hardware-display` |

## Files

Website assets are in **`public/images/app-diagrams/`**:

| Suffix | Canvas | Use |
| --- | --- | --- |
| `<stem>-figure.svg` | Tight crop, subject-specific | Flat element for layout, placeholders or backgrounds |
| `<stem>-exploded-figure.svg` | Tight crop, subject-specific | Exploded element for layout or backgrounds |
| `<stem>.svg` / `<stem>.webp` | 1600 × 1000 | Flat element with consistent framing |
| `<stem>-exploded.svg` / `<stem>-exploded.webp` | 1600 × 1000 | Exploded element with consistent framing |

High-resolution exports are in **`docs/marketing/app-diagrams/exports/`**:

- `<stem>-landscape.png`: 3200 × 2000, flat, transparent.
- `<stem>-exploded.png`: 3200 × 2000, exploded, transparent.
- `<stem>-square.png`: 1080 × 1080, flat, transparent.
- `<stem>-square.svg`: editable vector version of the square export.

The full technical sheets remain in **`sheets/` as source references only**. They are not the decorative asset versions. All web and export paths now use the minimal annotation style. The `-figure.svg` crops include breathing room for the size notes; read their updated intrinsic dimensions from the manifest.

`public/images/app-diagrams/manifest.json` records paths, intrinsic sizes, alt text, source-linked annotations and the landing-page stroke reference. Its sheet/export paths are relative to this documentation folder, not production URLs.

## Landing-page style match

References: `public/images/section-backgrounds/invisible-camera-app-section-background.svg` and `midicircuit-app-section-background.svg`.

- **2.5px** main outlines.
- **1.25px** camera details; **1.5px** music-app details.
- **0.6px** fine ticks, extension lines and leaders.
- Camera dimension lines use **0.6px**; music-app dimensions use **1.5px**, following the corresponding reference.
- **12px monospace** size notes. No display headings or copy inside the asset.

Examples: `Ø70pt`, `80px`, `4px`, `R6px`, `1px gap`. Values come from the inspected app source: SwiftUI points, RN logical pixels or Push display pixels—not the size of the exported image. Unknown device/viewport sizes are omitted rather than invented. Exploded views preserve the same sparse notes without skewing the text with the layers. Existing app-page SVGs and their accent colors are unchanged; this collection stays neutral grayscale.

## Website use

Prefer the tight SVGs when composing your own layout. Files in `public/` are served without that prefix.

For a purely decorative image:

```html
<img
  src="/images/app-diagrams/midicircuit-song-grid-figure.svg"
  width="800"
  height="642"
  alt=""
  aria-hidden="true"
  loading="lazy"
  decoding="async"
  style="display:block;max-width:100%;height:auto;opacity:.35"
>
```

For a background:

```css
.section-art {
  background-image: url('/images/app-diagrams/midicircuit-drum-pads-exploded-figure.svg');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: min(55vw, 720px) auto;
}
```

- Use `alt=""` for decoration. If the image explains something, use meaningful alt text from the manifest instead of hiding it.
- Scale uniformly. Use `contain` to show the complete element; intentional cropping is fine for background texture.
- Lower opacity on the image or a separate background layer, not on a container holding readable page text.
- These are dark strokes with light UI surfaces, not dark-theme artwork. Transparency is around/between elements; the app's white/gray surfaces remain filled.
- Size notes use the system monospace font; no embedded font files, installation or network requests are needed.
- SVG strokes use `non-scaling-stroke` to preserve weight through the internal layer transforms. Raster linework scales with the image; use SVG for flexible layouts.
- Generating this collection does not modify website pages or application dependencies. The Push Play homepage section derives its decorative background from two front-facing SVGs in this set.

## Regenerate

```sh
node scripts/app-diagrams/build.mjs

# One-time renderer setup outside the application dependency tree:
npm install --prefix /tmp/yonko-diagram-tools --no-audit --no-fund playwright@1.58.2
/tmp/yonko-diagram-tools/node_modules/.bin/playwright install chromium

PLAYWRIGHT_MODULE=/tmp/yonko-diagram-tools/node_modules/playwright \
  node scripts/app-diagrams/render.mjs

node --test scripts/app-diagrams/assets.test.mjs
```

Run generation, rendering and tests after changes; vector generation alone does not refresh PNG/WebP files. The render report records SHA-256 hashes for every checked SVG, rendered raster, sheet/gallery input, manifest and renderer. Tests reject stale reports or missing coverage rather than trusting a previous successful render.

- `scripts/app-diagrams/elements.mjs`: app geometry, visual layers and framing.
- `scripts/app-diagrams/annotations.mjs`: homepage stroke tokens, projected tick dimensions and source-backed size notes.
- `scripts/app-diagrams/catalog.mjs`: subject names, source references and measured values.
- `scripts/app-diagrams/drawing.mjs`: annotated reference drawing kit.
- `scripts/app-diagrams/build.mjs`: vector assets, reference sheets, manifest and gallery.
- `scripts/app-diagrams/render.mjs`: transparent raster exports and browser checks.
- `scripts/app-diagrams/assets.test.mjs`: asset regression checks.

Edit the source scripts for durable changes. Generated files are overwritten by regeneration.

## Source boundaries

The geometry is based on inspected app UI source, not live screenshots. Skeleton bars, icon simplifications, empty waveform regions, viewport proportions and exploded separation are illustrative; they do not show a real song, sample, photograph or physical device thickness. Native apps were not rebuilt or runtime-measured for this work.

[Source provenance](source-provenance.json) retains commits, source paths and SHA-256 hashes. No external app source files were changed.

- **Invisible Camera — `a23912f`:** `MainCameraView.swift` provides the adaptive control layout; `ShutterButton.swift` supplies the 70/65/64 pt concentric surfaces. The decorative viewfinder canvas is not a measured iPhone size. Only the idle shutter state is shown.
- **Midicircuit — `6afaf2b39`:** `SongView.tsx` supplies 80 × 60 cells, 50-unit headers, 4-unit gaps/padding and radius 6. The inner clip slot represents the 72 × 52 content wrapper, not note data. `DrumPadsView.tsx` supplies the 4 × 4 structure, 1-unit gutters and separate touch overlay. The number of song rows/sections and the decorative pad size are illustrative.
- **Push Play — `39feefa`:** `PushPlayAppRootView.swift`, `DeckView.swift` and `FaderView.swift` supply mirrored decks, 36 pt deck separation, 68 pt control columns, 104 pt top/EQ regions and a 180 pt fader with a 12 × 34 pt handle. Host-dependent spacing is schematic. `PushDJView.swift` supplies the 960 × 160 display layout with eight columns. This is the **Push 2 interface**, not Ableton Move or physical hardware dimensions.

Annotated measurements, formulas and unknown runtime dimensions remain available in the separate reference sheets.

## Validation

- Visually inspected all flat, exploded and square previews.
- Checked **30 SVG layouts** in Chromium for out-of-canvas shapes/text and overlapping notes; each permits only 2–4 size annotations at 12px.
- **14 asset tests passed**: annotation values/units against the source catalog, exact outline/fine stroke tokens against the homepage references, no promotional text or embedded fonts, accessible metadata, lightweight SVGs, raster sizes, monochrome pixels, nonempty artwork, alpha channels and transparent corners.
- Retained source-provenance, dimension-code and derived-value checks for the reference sheets.
- Mobile gallery checked at 390 px with all 12 previews loaded and no horizontal overflow.
- JavaScript syntax checks, `npm run lint`, `npm run typecheck` and `npm run build` passed.
- Evidence: [`qa/render-report.json`](qa/render-report.json) and the contact sheets in `qa/`.

## Attribution

Drawing conventions are adapted from [dimensional-drawing](https://github.com/enesozturk/dimensional-drawing), MIT © 2026 Enes Ozturk; the notice remains in SVG metadata. The **reference sheets only** embed Departure Mono, SIL OFL 1.1 © 2022–2024 Helena Zhang. App-element assets use system monospace notes without embedding font files. Full notices: [`scripts/app-diagrams/THIRD_PARTY_NOTICES.md`](../../../scripts/app-diagrams/THIRD_PARTY_NOTICES.md).
