# Push Play homepage verification

Verification for `feat/pushplay-homepage-beta`, based on `ae108d3` (latest `origin/main` when the branch was created). Results below cover the implementation locally; PR checks and production deployment are tracked separately.

## Product imagery and background

The foreground now uses the **existing Mac, iPhone and iPad composition** selected by the owner: `iphone/05-mac-iphone-ipad.png`. It replaces the earlier custom two-device arrangement.

- **Foreground:** `public/products/pushplay/marketing/pp-mac-iphone-ipad.webp` — 1600 × 612 transparent WebP, approximately 46 KiB. Same overlapping three-device arrangement and original realistic bezels; only the headline, off-white canvas and excess transparent margins were removed.
- **Background:** `public/images/section-backgrounds/push-play-app-section-background.svg` — 1440 × 1024, blue outline-only derivatives of the existing **front-facing** dual-deck and Push display drawings. The perspective/exploded version has been replaced; existing edges, corner geometry and stroke styling are unchanged. Remains behind the product image, hidden from assistive technology and non-interactive.
- `src/app/page.tsx`: Push Play after Midicircuit and before Studio; invitation URL retained. Updated copy leads with beginner-friendly mixing on iPad and names Ableton Push 2/Move support, with an option to bring your own MIDI controller. Alt text names all three platforms. CTA now reads **Join TestFlight** and includes Apple's genuine icon.
- `src/components/AppShowcaseSection.tsx`: optional `imageLayout='landscape'` keeps the wide image's natural aspect ratio without an oversized portrait container; optional `learnMoreIcon` enables an icon button with a visible keyboard-focus outline. Invisible Camera and Midicircuit retain the default portrait sizing, text links, labels and colours.

## TestFlight button asset

`public/images/common/testflight-icon.png` is the **unmodified original PNG** downloaded from <https://testflight.apple.com/images/tf-web-ios-512-light.png>, referenced by Apple's own invitation page. Its source URL and SHA-256 are recorded in [the asset receipt](testflight-asset.json); verification checks that the bytes remain unchanged.

The icon is Apple artwork. The surrounding button is custom website markup using the owner-selected “Join TestFlight” label—not an Apple-issued badge or endorsement. No downloadable TestFlight badge was found in Apple's TestFlight or App Store marketing resources, and no App Store badge has been altered to imply beta availability.

The icon is decorative (`alt=''`, `aria-hidden`); visible link text provides the accessible name. Its 28px layout dimensions avoid layout shift, loading is lazy, and the button provides a 52px touch target and an explicit keyboard-focus outline. Navigation still uses the public HTTPS invitation, not a device-only deep link.

## Source provenance

Canonical source folder:

`/Users/ricardoabreu/Pictures/Push Play App Store/2026-10-25-store-set/`

- Original finished card: `iphone/05-mac-iphone-ipad.png`.
- Editable composition: `projects/iphone-05-mac-iphone-ipad.matte/project.json`.
- Its original captures: `captures/mac-mix-window.png`, `captures/iphone-mix.png`, `captures/ipad-eq.png`.

An **isolated temporary copy** of the existing Matte project was rendered with `textClips`/`textTracks` removed and canvas fill set to transparent. Device placement, scale, orientation, screenshots, frames and shadow settings were not changed. The source project and final card remain untouched. The transparent export is saved locally at `docs/marketing/pushplay/three-device-transparent.png`; the build script trims and uniformly downsizes it rather than constructing a new composition.

The source receipt, `docs/marketing/pushplay/three-device-source.json`, records the original card/project/capture hashes and Matte 2.0.5 (235) render. At native resolution, **99.68% of fully opaque rendered pixels match the original finished card exactly**. [Asset provenance](asset-provenance.json) adds the final output dimensions, hashes, size and trimming offsets.

These are genuine app UI captures made **2026-10-25**, with loaded songs staged through DEBUG-only `ScreenshotStudio`, not newly captured Release-build screenshots. Original UI colours, neutral displayed song names and genuine “Monitor unavailable” hints are retained. No audio or playlists were copied. The prior App Store approval covered the original finished card, not an App Store release or a separate approval of this website adaptation.

The external screenshot README contains stale upload-status text; the app repository's `build/store-screenshots/20261025T220619Z/README.md` records the historical upload. No source files, App Store Connect settings or tester limits were changed. The reusable grayscale diagram exports also remain unchanged.

## Verification

The front-facing drawing replacement left the three-device foreground unchanged. The subsequent beginner-focused copy update was rebuilt and checked at all four viewport widths; the existing CTA, artwork and other apps remain unchanged.

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `node --test scripts/pixel-geometry.test.mjs scripts/app-diagrams/assets.test.mjs`: 15 tests passed.
- JavaScript syntax and Git whitespace checks: passed.
- Chromium at **320, 390, 768 and 1440 px**: three-device foreground, technical background and official TestFlight icon load; the foreground uses its natural aspect ratio; background remains decorative and non-interactive; no horizontal overflow or page errors.
- Existing app links, labels, image filters and portrait heights remain unchanged.
- Asset checks verify alpha transparency, expected output size, orange/blue UI pixels, three-device source provenance, front-facing background sources (no perspective transforms) and the outline-only blue background style. Foreground, background and diagram-source hashes must match their provenance receipts.
- Keyboard Tab reaches the **Join TestFlight** link with a visible focus outline; Enter navigates to <https://testflight.apple.com/join/UruJbq28>. The smoke test intercepts the destination and blocks analytics, including the same-origin PostHog proxy; it neither joins the beta nor sends QA pageviews.
- Visually inspected the desktop, tablet and mobile screenshots below.

Pre-PR review reproduced a false pass in the diagram layout test: an out-of-canvas SVG shape still passed against an old render report. The report now binds its complete source/output set to SHA-256 hashes. Scratch-copy regression checks reject a changed SVG, changed raster and missing receipt coverage; a fresh Chromium render checks all 30 layouts and restores the 15-test pass.

An earlier public-page check displayed **“This beta is full.”** On the 2026-10-27 recheck, Apple's page instead displayed **“View in TestFlight.”** No enrollment was attempted; neither the page observation nor website tests establish available places, Apple review status or installability.

## Reproduce

Regenerate the WebP/background from the repository-local transparent PNG, source receipt and diagram exports (no external native repository or Matte installation needed):

```sh
node scripts/build-pushplay-homepage-assets.mjs
```

To recreate the transparent source itself:

1. Copy the canonical `.matte` package to a new temporary directory; never edit the original.
2. In the copy only, empty `textClips` and `textTracks`.
3. Open the copy with `matte_project_open`, then use `matte_canvas_set` with `fill: 'transparent'`.
4. `matte_export` with `format: 'image'`, `resolution: 'appstore-landscape'`, `time: 0` produces a 2868 × 1320 transparent PNG.
5. Verify against the original card and refresh the saved PNG/source receipt together. The generator rejects a PNG whose hash differs from its source receipt.

Browser verification uses the external Playwright installation from the artwork task:

```sh
npm run build
PLAYWRIGHT_MODULE=/tmp/yonko-diagram-tools/node_modules/playwright/index.mjs \
  QA_OUTPUT=docs/verification/pushplay-homepage \
  node scripts/check-pushplay-homepage.mjs
```

The script starts/stops its own production server on `127.0.0.1:3107` (`HOME_SMOKE_PORT` overrides). Without `QA_OUTPUT`, evidence goes to `/tmp/pushplay-homepage-qa`. No application dependency or lockfile changes.

- [Desktop](pushplay-1440.png)
- [Tablet](pushplay-768.png)
- [Mobile](pushplay-390.png)
- [Small mobile](pushplay-320.png)
- [Machine-readable report](report.json)
