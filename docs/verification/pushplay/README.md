# Push Play support/privacy verification

Checked 2026-10-25 on `feat/pushplay-support-privacy`, based on `origin/main`
(`e52c309`). The original website checkout's homepage, Studio, and mobile-menu
work was left untouched.

## Rename follow-up (2026-10-25)

Updated the product spelling to **Push Play** in both pages, metadata, support
index, and URL-encoded support-email subject. Existing `/products/pushplay/`
routes and component identifiers are unchanged. Refreshed all five screenshots.
Lint, TypeScript, and the production webpack build passed again. Browser checks
passed on all three routes at 1440×1000 and 390×844: new branding, unchanged
canonical URLs, support/privacy navigation, and no horizontal overflow or
reported runtime errors. No email/payment actions were exercised.

Code review: skipped (mechanical diff) — brand-string substitutions and refreshed
verification artifacts only; no application logic or privacy claims changed.

## Checks

- Node 22.19.0.
- `yarn install --frozen-lockfile --ignore-scripts`: passed. Existing npm lockfile
  is out of sync and npm also reports a React 19 / react-ga peer conflict;
  neither lockfile nor dependency versions were changed.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build -- --webpack`: passed with the existing ignored local
  environment. The shop requires its Stripe key and the existing newsletter
  unsubscribe route requires a Resend key at build time. No email/payment
  operations were tested or triggered.
- Default `npm run build`: failed in the existing Next 16.0.8 Turbopack Google
  font resolver (`next/font/google queries have exactly one entry`). No font,
  bundler, or unrelated environment-handling changes are included here.

## Browser checks

Headless Chromium via `agent-browser`, against the local production build.
Desktop viewport: 1440×1000. Mobile viewport: 390×844. Screenshots are full-page.

| Route | Result | Evidence |
| --- | --- | --- |
| `/support` | Pass | Both Push Play links present; clicked the support link successfully; mobile layout has no horizontal overflow. |
| `/products/pushplay/support` | Pass | Content, support mailto, canonical URL, and privacy link checked; desktop/mobile screenshots. |
| `/products/pushplay/privacy-policy` | Pass | Navigated from support; title, content, canonical/source URLs, and desktop/mobile layout checked. |

No browser runtime errors were reported during these checks. The new white
prose pages explicitly use dark headings and links, avoiding the site's inherited
low-contrast prose colours. Computed heading/link colour: `rgb(17, 24, 39)`.
No email was sent. Off-screen links were scrolled into view before clicking.

## Privacy review boundary

The draft is based on Push Play's app entry point, local file/library and MIDI
persistence code, and its shared dependency implementations. No analytics
initialisation or analytics dependency access was found in Push Play's active
feature code. Its DJ mixer uses its own player wrapper, not the shared
`AudioPlayerConductor` / `AudioManager` analytics path. Shared packages still
contain PostHog/Firebase components, so this is not a claim that the binary has
no analytics SDKs, nor a runtime network audit.

Before publication, the owner should confirm support retention/provider
practices and the final privacy wording. This PR does not submit App Privacy
answers, change website analytics, or deploy the pages. App Store Connect URLs
should be filled only after the reviewed pages are live.

## Screenshots

- [Support, desktop](support-desktop.png)
- [Support, mobile](support-mobile.png)
- [Privacy, desktop](privacy-desktop.png)
- [Privacy, mobile](privacy-mobile.png)
- [Support index, mobile](support-index-mobile.png)
