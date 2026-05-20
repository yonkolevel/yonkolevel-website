# Newsletter Style Guide

This guide documents the design tokens, typography, spacing, layout, and section patterns for the Yonko Level newsletter — both the web preview (`/newsletter/preview`) and the React Email template (`src/emails/NewsletterEmail.tsx`).

---

## Colour Tokens

| Token | Hex | Usage |
|---|---|---|
| `surface` | `#111111` | Primary section background, header, main content sections |
| `surface2` | `#191919` | Alternating sections, footer, section label bars |
| `surface3` | `#2B2B29` | Neutral tag background, social icon background |
| `border` | `#2F2F2D` | Hairlines between sections, image borders, HR separators |
| `borderStrong` | `#3D3D3B` | Tag borders, CTA borders, dashed example box border |
| `tp` (text primary) | `#EDEDE8` — 100% | Headings, titles, link text |
| `ts` (text secondary) | `rgba(237, 237, 232, 0.7)` — 70% | Body copy, excerpts, editorial note |
| `tt` (text tertiary) | `rgba(237, 237, 232, 0.55)` — 55% | Labels, metadata, fine print, copyright |
| `orange` | `#FF5C24` | App tags, orange CTAs, education accent bar |

**Page background** (layout wrapper): `#111111`

---

## Typography Scale

Responsive via CSS custom properties. Breakpoint: `640px` (Tailwind `sm:`).

| Token | Mobile | Tablet / Desktop | Usage |
|---|---|---|---|
| `--ty-label` | 8px | 10px | Section divider labels, "What's new" micro-label |
| `--ty-meta` | 10px | 12px | Tags, CTAs, issue number, date, copyright, social icons |
| `--ty-fine` | 12px | 14px | Author/date, footer fine print |
| `--ty-body` | 14px | 16px | All body copy, excerpts, editorial note, example content, pick titles and notes |

### Heading Scale

Pixel font (`var(--font-pixel)`), `font-weight: 900`, `leading-tight`.  
Tag → heading gap: always **16px** (`marginTop: 16px`).

| Level | Mobile | Tablet | Desktop | Used in |
|---|---|---|---|---|
| Display H1 | 30px | 36px | 48px | S1 Feature headline |
| Large H1 / H2 | 24px | 30px | 36px | S1 Changelog, S1 MultiApp primary |
| Medium H2 | 20px | 24px | 30px | S1 MultiApp secondary |
| Small H3 | 18px | 20px | 24px | Blog/Vlog posts, Education section |

---

## Layout

- **Max content width**: `1200px`, centred with `margin: 0 auto`
- **Horizontal padding**: `16px` (mobile) → `32px` (tablet) → `48px` (desktop)
- **Section vertical padding**: `40px` (mobile) → `56px` (tablet) → `60px` (desktop)
- **Full-bleed sections**: each section's background spans the full viewport width; content is constrained to `1200px` inside

---

## Spacing Rules

| Context | Value |
|---|---|
| Tag → heading | 16px |
| Heading → body | 8–12px (via `marginBottom` on heading) |
| Body → CTA | 24px |
| Body → example content box | 40px |
| Example content box → CTA | 24px |
| Cultural picks: padding top & bottom per entry | 16px |
| Blog/Vlog: gap between text and image (tablet/desktop) | 40px (`sm:gap-10`) |
| Education: gap between orange bar and text | 12px |

---

## Components

### Tags

**AppTag** — used for app/product labels  
- Pill shape, `border-radius: 999px`
- Background: `rgba(255,92,36,0.08)`, border: `rgba(255,92,36,0.25)`
- Text: `#FF5C24`, `font-weight: 600`, `letter-spacing: 0.1em`, uppercase, `ty.meta`

**NeutralTag** — used for content type labels (Blog, Vlog, version numbers)
- Background: `surface3`, border: `borderStrong`
- Text: `ts`, `font-weight: 600`, `letter-spacing: 0.1em`, uppercase, `ty.meta`

### CTAs

**CtaOrange** — primary action
- Background: `rgba(255,92,36,0.08)`, border: `rgba(255,92,36,0.3)`
- Text: `#FF5C24`, `font-weight: 900`, pixel font, `ty.meta`
- Padding: `8px 16px`, `border-radius: 4px`

**CtaNeutral** — secondary action
- Background: transparent, border: `borderStrong`
- Text: `ts`, `font-weight: 900`, pixel font, `ty.meta`
- Padding: `8px 16px`, `border-radius: 4px`

### Section Label Bar
- Background: `surface2`, `border-bottom: 1px solid border`
- Text: `ty.label`, `font-weight: 600`, `letter-spacing: 0.12em`, uppercase, colour `tt`
- Padding: `12px` vertical

---

## Sections

### Header
- Background: `surface`, `border-bottom: 1px solid border`
- Logo (130×48px) on the left, issue number + date right-aligned
- Editorial note below a hairline, italic, `ty.body`, colour `ts`

### S1 — Biggest News (3 variants)

**Feature** — No internal hairlines between sub-sections
1. Tag + Display H1 (surface bg)
2. Full-width image, max-height 480px (surface bg, no padding)
3. Body copy + CtaOrange (surface bg, border-bottom)

**Changelog**
1. NeutralTag + Large H1 (surface bg, border-bottom)
2. "What's new" micro-label + numbered list + CtaOrange (surface bg, border-bottom)
   - Number badge: 18×18px circle, border `borderStrong`, `ty.meta`

**Multi-App**
1. AppTag + Large H2 + body + CtaOrange (surface bg, `border-bottom: 3px solid surface3`)
2. NeutralTag + Medium H2 + body + CtaNeutral (surface2 bg)

### Blog / Vlog
- Section label: "From the Blog"
- Alternating rows: odd rows use `surface2`, even rows use `surface`
- Layout: 60% text / 40% image, `gap: 40px` on tablet+, stacked on mobile
- Image: `aspect-ratio: 16/9`, `border-radius: 8px`, border `border`
- Text: NeutralTag → H3 (16px gap) → excerpt → author/date → CtaNeutral (24px gap)

### Education
- Section label: custom per issue
- Orange accent bar: `3px` wide, stretches to height of H3 + body, `gap: 12px`, `opacity: 0.5`
- H3 + body inside flex row with bar
- Example content box (optional): `surface2` bg, dashed `borderStrong` border, `border-radius: 8px`, `40px` below body
- CtaOrange: `24px` below example box (or body if no example)

### Cultural Picks ("What We're Into")
- Up to 3 entries, `max-width: xl` on desktop
- Each entry: `16px` padding top and bottom
- Hairline (`border`) between entries, `margin: 0`
- Entry layout: 38×38px thumbnail + text column (title + note)
- Title: `ty.body`, pixel font, `font-weight: 900`, colour `tp`
- Note: `ty.body`, colour `tt`, `line-height: 1.5`

### Footer
- Background: `surface2`
- Logo (90×33px), centred
- "Visit yonkolevel.com" CtaNeutral
- Social links: 26×26px circles, `surface3` bg, `borderStrong` border
- Hairline, then fine print (Manage preferences · Unsubscribe)
- Copyright: `ty.meta`, colour `tph`
