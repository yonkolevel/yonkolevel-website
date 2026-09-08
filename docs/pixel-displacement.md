# Pixel displacement: runtime and reuse

## Design

Starting point: `4c23571` (also the clean working HEAD at the start). No later implementation was consulted.

The old renderer allocated every grid cell as a `motion.div`, searched the displaced list for each cell, stored derived cell arrays in an effect, observed each cell for visibility, and animated `left`/`top`. `PixelPanel` measured again and passed its derived layout back into the grid.

Considered:

- **Sparse Framer Motion**: would eliminate most nodes, but still couples a small decoration to a motion runtime.
- **Sparse SVG + CSS (chosen)**: one static fill and two divs per displaced cell (origin + traveller). An even-odd SVG path excludes transparent holes; only the covers/travellers animate. No mask IDs, per-frame JS, canvas resolution management, or extra dependency.
- **Canvas**: similarly sparse drawing, but adds a drawing loop, device-pixel-ratio handling and a separate rendering lifecycle without a demonstrated need.

`PixelDisplacementGrid` owns its one `ResizeObserver`, grid-sized state, one-shot container intersection and renderer. It only updates geometry when the number of complete cells changes. Derived pixels are calculated directly in O(displacements), not stored in another state/effect. Motion uses translation/scale/opacity; coloured hole covers also transition background colour. No permanent `will-change` layers.

`PixelPanel` remains a small **site layout adapter**: content, Tailwind padding/stacking and the existing perimeter/outward/throw-cap policy. Its pure policy is separate from generic geometry and consumes the grid's single measurement through `placement`. It no longer owns measurement or reduced-motion state.

## Contract and deliberate corrections

- Colours are **CSS values**, not Tailwind classes. Product section defaults and callers now use the exact existing theme colours: `bg-white` -> `#F8FAFC`, `bg-black` -> `#121212`, `bg-gray-50` -> `#F9FAFB`. Previously those class strings were invalid inline colours, so travellers were invisible. Restoring those coloured squares is intentional.
- Negative rows/columns count from the last complete cell. `ProductImageSection`'s three negative-coordinate pixels now render instead of being discarded.
- Each axis is independently bounded. Invalid positive columns no longer wrap into the next row. Product content's absolute bottom-right entries are omitted where they do not fit, rather than moving unrelated cells on mobile.
- Homepage showcase right-edge entries now use negative anchors (same positions at 1440px, correctly on the right at mobile/tablet sizes). Content-safe-zone filtering runs **after** resolution so it tests actual cells.
- First duplicate cell wins. On the 390px Studio hero, two authored entries resolve to the same corner; it now sheds one square rather than two.
- Entry is **once per container**, not separately per source/destination cell. The stagger/duration, 0.8-to-1 traveller scale, and 0.8-sized coloured holes remain. The first intersecting part starts the whole group, even for panels taller than the viewport. This deliberately fixes cells waiting forever/offscreen; it can start a lower cell earlier than the old renderer. Exact per-cell trigger timing is not retained.
- Transparent holes remove the entire source cell and never substitute a guessed backing colour. The transparent fill retains the old complete-cell footprint, including unfilled right/bottom remainders. Opaque fills cover the entire container.
- SSR and the first hydration render output the same solid SVG rectangle. Measurement then resolves holes; content is never dependent on a client-only/no-SSR import. A zero-sized, invalid-sized or sub-cell grid renders a solid fallback with no stale displaced cells. The SSR rectangle cannot know responsive holes before measurement.
- Reduced motion is handled by the renderer for **every caller**: settled pixels with no delay/transition, including initially offscreen panels. Live changes explicitly cancel in-flight transitions. Re-enabling motion or scrolling back does not replay the group.
- Decorations are `aria-hidden`, non-focusable and pointer-transparent. The parent must provide position/size, and must not paint an opaque backing if it expects holes to reveal content beneath it.

### Call-site audit

| Caller | Actual input / result |
|---|---|
| `HeroWithPixels` | `#121212`, `#F8FAFC` holes, `#FF5C24` travellers, 40px cells, .15/.5s. Preserved; group entry replaces individual-cell visibility. |
| `AppShowcaseSection` | Transparent, yellow/orange 40px panels, .15/.5s, custom displacements and safe zones. Edge anchors corrected; safe zones applied to resolved cells. |
| `ProductContentSection` | Previously `bg-white`, `bg-gray-50`, `bg-black` as inline colours; white holes, 40px, .3/.5s. Callers now supply equivalent CSS colours; out-of-grid entries omitted. |
| `ProductImageSection` | MIDI Scout passes `#121212`, white holes, 40px, .3/.5s, three negative entries. These now resolve from the bottom/right. |
| `ShopHero` | `#1a1a1a`, black holes, yellow travellers, 40px, .15/.5s. Preserved. It is imported but **not rendered** on `/shop`; QA mounts the actual component with a sold-out local product, without checkout/API calls. |
| `PixelPanel` | Studio: 32px hero and 40px content panels; ProductHero: 40px, right side, absolute clipped media wrapper. Transparent holes and original layout limits preserved, with the duplicate-corner correction above. |

## Measurement

Real Chrome **152.0.7977.65**, macOS, CDP port 9222, Next development server at port 3000, Node 22.19.0. Viewports **1440×900** and **390×900**, DPR 1, no CPU throttling. Argent opened/inspected the dedicated Chrome tab; the dependency-free Node/CDP runner collected browser `Performance.getMetrics`, MutationObserver counts and screenshots. Argent's installed screenshot-diff rejects Chromium, so saved PNGs were compared with the already-installed Sharp and visually inspected instead.

The fixture renders a plain grid, a PixelPanel and the actual ShopHero with the same props before and after. Each measurement is the median of three fresh, warmed navigations after fonts/layout settle. Resize workload: 24 viewport changes, alternating the chosen width and width minus 40px, 80ms between changes, then 500ms settling. Entry workload: scroll the initially offscreen PixelPanel into view and sample for 1.8s. Durations below are **browser main-thread work**, not wall time or React render-only time. They include the unchanged page shell and instrumentation.

| Metric | 1440px before -> after | 390px before -> after |
|---|---:|---:|
| Resize main-thread task time | 4,574 -> **167ms (-96.3%)** | 1,089 -> **99ms (-90.9%)** |
| Resize scripting time | 3,943 -> **48ms** | 910 -> **48ms** |
| Resize layout time | 75.4 -> **23.5ms** | 21.8 -> **7.5ms** |
| Resize style recalculation | 302.5 -> **29.8ms** | 39.6 -> **6.3ms** |
| First-entry task time | 240 -> **55ms** | 89 -> **52ms** |
| First-entry layout work | 41.2 -> **0.27ms** | 10.3 -> **0.10ms** |
| First-entry layout count | 59 -> **2** | 59 -> **1** |
| First-entry inline style mutations (panel subtree) | 442 -> **0** | 442 -> **0** |
| Pixel descendants across all 3 instances | 1,754 -> **34** | 406 -> **34** |
| Pixel intersection targets after initial settling | 1,754 -> **2** | 406 -> **2** |

After has at most one intersection target per instance (three initially, two after the first enters, zero after all enter). Baseline and new entry samples both sustained roughly 60Hz on this machine: these results show less CPU/layout work, **not a measured FPS increase**. This is a local development-build comparison, not a production/RUM latency claim. No bundle-size improvement is claimed: other site components still import Framer Motion.

Raw evidence: [before](pixel-displacement-evidence/before.json), [additional baseline entry runs](pixel-displacement-evidence/before-animation.json), [after](pixel-displacement-evidence/after.json), [browser assertions](pixel-displacement-evidence/verification.json), [image differences](pixel-displacement-evidence/diff-summary.json). The before-entry batch was collected before the implementation was changed.

## Browser verification and screenshots

20 before and 20 after viewport screenshots cover all six caller types, both showcase directions, a dark product section, Studio enquiry and both Panel consumers. Visual inspection and image comparison found unchanged desktop showcase/panel layouts. Desktop showcases, Studio hero/enquiry, and ShopHero have zero changed pixels above an 8/255 channel tolerance. Mobile changes and restored product pixels correspond to the corrections above. Product screenshots may include different paused frames of adjacent video; those pixels are not attributed to the renderer.

| Screenshot | 1440px | 390px |
|---|---|---|
| Hero | [before](pixel-displacement-evidence/before/HeroWithPixels-1440.png) / [after](pixel-displacement-evidence/after/HeroWithPixels-1440.png) | [before](pixel-displacement-evidence/before/HeroWithPixels-390.png) / [after](pixel-displacement-evidence/after/HeroWithPixels-390.png) |
| Showcase | [before](pixel-displacement-evidence/before/AppShowcaseSection-1440.png) / [after](pixel-displacement-evidence/after/AppShowcaseSection-1440.png) | [before](pixel-displacement-evidence/before/AppShowcaseSection-390.png) / [after](pixel-displacement-evidence/after/AppShowcaseSection-390.png) |
| Reversed showcase | [before](pixel-displacement-evidence/before/AppShowcaseSection-reversed-1440.png) / [after](pixel-displacement-evidence/after/AppShowcaseSection-reversed-1440.png) | [before](pixel-displacement-evidence/before/AppShowcaseSection-reversed-390.png) / [after](pixel-displacement-evidence/after/AppShowcaseSection-reversed-390.png) |
| Product content | [before](pixel-displacement-evidence/before/ProductContentSection-1440.png) / [after](pixel-displacement-evidence/after/ProductContentSection-1440.png) | [before](pixel-displacement-evidence/before/ProductContentSection-390.png) / [after](pixel-displacement-evidence/after/ProductContentSection-390.png) |
| Dark product content | [before](pixel-displacement-evidence/before/ProductContentSection-black-1440.png) / [after](pixel-displacement-evidence/after/ProductContentSection-black-1440.png) | [before](pixel-displacement-evidence/before/ProductContentSection-black-390.png) / [after](pixel-displacement-evidence/after/ProductContentSection-black-390.png) |
| Product image | [before](pixel-displacement-evidence/before/ProductImageSection-1440.png) / [after](pixel-displacement-evidence/after/ProductImageSection-1440.png) | [before](pixel-displacement-evidence/before/ProductImageSection-390.png) / [after](pixel-displacement-evidence/after/ProductImageSection-390.png) |
| Studio Panel | [before](pixel-displacement-evidence/before/PixelPanel-Studio-1440.png) / [after](pixel-displacement-evidence/after/PixelPanel-Studio-1440.png) | [before](pixel-displacement-evidence/before/PixelPanel-Studio-390.png) / [after](pixel-displacement-evidence/after/PixelPanel-Studio-390.png) |
| Enquiry Panel | [before](pixel-displacement-evidence/before/PixelPanel-enquiry-1440.png) / [after](pixel-displacement-evidence/after/PixelPanel-enquiry-1440.png) | [before](pixel-displacement-evidence/before/PixelPanel-enquiry-390.png) / [after](pixel-displacement-evidence/after/PixelPanel-enquiry-390.png) |
| ProductHero Panel | [before](pixel-displacement-evidence/before/PixelPanel-ProductHero-1440.png) / [after](pixel-displacement-evidence/after/PixelPanel-ProductHero-1440.png) | [before](pixel-displacement-evidence/before/PixelPanel-ProductHero-390.png) / [after](pixel-displacement-evidence/after/PixelPanel-ProductHero-390.png) |
| ShopHero fixture | [before](pixel-displacement-evidence/before/ShopHero-1440.png) / [after](pixel-displacement-evidence/after/ShopHero-1440.png) | [before](pixel-displacement-evidence/before/ShopHero-390.png) / [after](pixel-displacement-evidence/after/ShopHero-390.png) |

Executable browser assertions passed at **390, 820 and 1440px**: offscreen waits; first entry actually animates; initial/live reduced motion prevents/cancels animation; re-entry does not replay; container-only resize (without a window event); hidden/zero-size clearing and recovery; red/green backing pixel samples through the same hole with an unchanged adjacent blue cell; SSR solid fill; no runtime exceptions or hydration error messages. Pure geometry checks cover negative, invalid, duplicate, zero-size, stable source identity, single-cell and panel-cap cases.

All required gates completed with exit **0**, including the entire production build through static generation and final route summary: [lint](pixel-displacement-evidence/lint.log), [typecheck](pixel-displacement-evidence/typecheck.log), [build](pixel-displacement-evidence/build.log). Existing build warnings about browser metadata and workspace lockfiles remain; no lockfile churn.

### Review coverage

Three independent simplification passes (reuse, quality, efficiency) found no actionable changes; none were applied. A separate correctness/standards/testing/performance/race-condition lens review also found none ([receipt](pixel-displacement-evidence/review.json)). **Code review: skipped (ce-code-review unavailable)** — the full CE workflow returned a degraded receipt because its child harness could not launch independent/cross-model reviewers. That limitation was not treated as a completed CE gate; a final parent diff/requirements audit was performed instead. No cross-model agreement is claimed.

## Reproduce locally

Use a dedicated Chrome tab on port 9222 pointing at `http://localhost:3000` (Argent can open it). Start `npm run dev`. The fixture is **not a shipping route**; install it only for QA, and always remove it before build/commit:

```bash
node --experimental-strip-types scripts/pixel-geometry.test.mjs
mkdir -p src/app/pixel-check
cp scripts/pixel-performance.fixture.tsx src/app/pixel-check/page.tsx
# In the same shell, clean up even if a check fails:
trap 'rm -f src/app/pixel-check/page.tsx; rmdir src/app/pixel-check' EXIT
node scripts/pixel-performance.mjs after /tmp/pixel-perf/after
node scripts/pixel-performance.mjs verify /tmp/pixel-perf/verify --verify-only
# --bench-only skips page screenshots, but still collects entry + resize runs.
```

To reproduce the old renderer, use these same fixture/runner files with a checkout of `4c23571` (the geometry and new-only browser assertions naturally apply only to the new renderer). The runner targets the first localhost:3000 tab; use a dedicated browser/profile if other work also uses that origin. Timed waits deliberately include settling time, but screenshots still need visual inspection, not automatic approval by timeout.

## Lift into another project

For another **React web** project, copy just:

1. `src/components/PixelDisplacementGrid.tsx`
2. `src/components/PixelDisplacementGrid.module.css`
3. `src/components/pixels/geometry.ts`

Keep relative imports and CSS Modules support. These require React and browser SVG, ResizeObserver, IntersectionObserver, matchMedia and CSS transitions—**not Next, Tailwind or Framer Motion**. Use within a sized `position: relative` parent. `placement` is optional; functions passed across a Next server/client boundary must instead be defined in a client adapter, as PixelPanel does. String colours/arrays remain serializable. No global stylesheet or mask-ID scheme is needed.

For the same content-panel design, also copy `PixelPanel.tsx` and `pixels/panel-layout.ts`, replacing its Tailwind padding/stacking classes with the destination's layout styles.

For **React Native**, only the plain TypeScript data/geometry and panel policy port unchanged. The JSX renderer, CSS Module, DOM observers, CSS colour-variable handling and SVG DOM path do **not** run in React Native. A native adapter needs `onLayout`, viewport visibility from its scroll/list owner, AccessibilityInfo (including live reduced-motion updates), native transform/opacity animation, and an appropriate native drawing/masking surface for genuine holes. No native dependency or untested native renderer was added here.

Not done: canvas/WebGL, shared global observer infrastructure, a package/publishing scaffold, wholesale Framer Motion removal (still used elsewhere), unrelated site animations/media optimization, native implementation, or Safari/Firefox/device-GPU validation. Add these only with a concrete destination or measurement that justifies them.
