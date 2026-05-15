# Yonko Level Website

The website and newsletter system for [yonkolevel.com](https://yonkolevel.com).

Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS**, and **React Email**.

---

## First-Time Setup

### Prerequisites

- **Node.js 22.x** — [download](https://nodejs.org/) or use `nvm install 22`
- **Yarn** — `npm install -g yarn` (the project uses Yarn, not npm)

### Install & Run

```bash
git clone <repo-url>
cd yonkolevel-website

yarn            # install all dependencies
yarn dev        # start the site → http://localhost:3000
```

Open `http://localhost:3000` in your browser. The site auto-reloads when you save a file.

> **New to Next.js?** The [Next.js beginner tutorial](https://nextjs.org/learn) is a great 10-minute intro.

### Other Useful Commands

| Command | What it does |
|---|---|
| `yarn build` | Create a production build (also catches type errors) |
| `yarn lint` | Run ESLint — quick sanity check for code issues |
| `yarn start` | Serve the production build locally (run `yarn build` first) |

---

## Email Template Preview

The newsletter email has its own **live preview server** — edit the template, see changes instantly in the browser.

### Start the preview

```bash
yarn email:dev
# → http://localhost:3100
```

Pick any variant from the left sidebar. It renders in the main area as a real email. Save your changes in `src/emails/NewsletterEmail.tsx` → the preview updates automatically.

### What each variant shows

| Sidebar name | Theme | What's in it |
|---|---|---|
| **NewsletterLight** | ☀ Light | Full email — hero image, editorial note, adjacent news, blog posts, education, cultural picks |
| **NewsletterDark** | 🌙 Dark | Same as Light but dark tokens |
| **NewsletterChangelog** | ☀ Light | Numbered changelog list instead of a hero image |
| **NewsletterMultiApp** | ☀ Light | Two apps side-by-side (primary + secondary) |
| **NewsletterMinimal** | ☀ Light | Bare minimum — header, one section, footer. Great for checking empty-state styles |

### Change what the preview shows

All the sample content (headlines, copy, images) lives in one file:

```
src/emails/NewsletterEmail.preview.tsx
```

Each variant has a named export you can edit — for example, to change the headline in the light preview, find `lightFeatureProps` and edit `biggestNews.headline`:

```ts
// src/emails/NewsletterEmail.preview.tsx
export const lightFeatureProps: NewsletterEmailProps = {
  theme: 'light',
  issueNumber: 'Issue #12',
  biggestNews: featureNews,   // ← edit featureNews above to change content
  // ...
};
```

### Export plain HTML

Need the raw HTML to paste into an email client or test in Litmus?

```bash
yarn email:build    # minified HTML files → .email-output/
yarn email:export   # pretty-printed HTML → .email-output/
```

### Built-in tools (no setup needed)

The React Email UI includes these right in the browser:

- 🌓 **Dark mode toggle** — moon/sun button top-right
- 📱 **Desktop ↔ Mobile** — switches between wide and phone-sized preview
- ↔️ **Resize handles** — drag the edges to test any width
- ✉️ **Send test email** — click "Send" to deliver the current preview to any inbox
- 🔤 **Source view** — toggle between rendered email and raw HTML code

---

## Project Structure (where to find things)

```
yonkolevel-website/
├── src/
│   ├── app/               ← Pages and routes (URL paths map to folders here)
│   ├── components/        ← Reusable UI pieces (buttons, cards, nav, etc.)
│   │   ├── home/          ← Homepage-specific components
│   │   ├── shop/          ← Store / product components
│   │   ├── blog/          ← Blog listing & article components
│   │   └── icons/          ← SVG icon components
│   ├── content/blog/      ← Blog posts written in MDX (Markdown + React)
│   ├── lib/               ← Helpers & utilities (analytics, Stripe, MDX, hooks)
│   └── emails/            ← Email templates + their preview data
├── emails/                ← Thin wrapper files for the email preview server
├── public/                ← Static files served as-is (images, fonts, scripts)
└── package.json           ← Dependencies & scripts
```

### Key files to know

| File | Why it matters |
|---|---|
| `src/emails/NewsletterEmail.tsx` | The newsletter template — all layout, styling, and sections |
| `src/emails/NewsletterEmail.preview.tsx` | Sample data that fills in the preview |
| `emails/*.tsx` | One file per preview variant (light, dark, changelog, etc.) |
| `src/app/layout.tsx` | Site-wide HTML shell (fonts, metadata, analytics) |
| `tailwind.config.ts` | Design tokens — colors, spacing, fonts |

---

## Environment Variables

Copy `.env.example` (if it exists) or create a `.env.local` file in the project root:

```bash
# Newsletter sending
RESEND_API_KEY=re_xxxx
RESEND_AUDIENCE_ID=aud_xxxx

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxx

# Shop / payments (Stripe)
STRIPE_SECRET_KEY=sk_xxxx
STRIPE_PUBLISHABLE_KEY=pk_xxxx
```

> **Never commit `.env.local`** — it's already in `.gitignore`. If you add a new variable, document it here.

---

## Getting AI Help

This project is set up to work well with AI coding tools (Claude Code, Cursor, GitHub Copilot, etc.). Here's how to get the most out of them.

### Ask AI to work on the email template

AI tools understand this codebase. You can give natural-language instructions like:

```
"Add a 'Community Spotlight' section between the blog and cultural picks"
```

```
"Make the CTA buttons have rounded-full instead of rounded-sm"
```

```
"Change the footer social icons to use actual SVGs instead of text letters"
```

The AI will edit `src/emails/NewsletterEmail.tsx`, and you'll see the result in `yarn email:dev` immediately.

### Conventions AI already knows

Two files teach AI tools how this project works:

| File | What it tells the AI |
|---|---|
| `AGENTS.md` | Project rules — file structure, coding style, commit format, architecture |
| `CLAUDE.md` | Points the AI to `AGENTS.md` for full context |

You normally **don't need to edit these** — they're already tailored to this project. But if you add a major new system (e.g. a new email template type), add a note to `AGENTS.md` under the "Email Preview Architecture" section so the AI knows about it next time.

### Tips for good AI prompts

| ✅ Do | ❌ Don't |
|---|---|
| Name the file: "In `NewsletterEmail.tsx`, change…" | Be vague: "Make the email look better" |
| Reference the variant: "In the light feature preview…" | Assume the AI knows which screen you mean |
| Ask for one thing at a time | Ask for 5 unrelated changes at once |
| Run `yarn email:dev` and check the preview | Blindly accept AI output without looking |
| Say "re-read AGENTS.md first" if the AI seems lost | Re-explain the whole project every time |

### Example workflows

**Tweak the design:**
1. Run `yarn email:dev`
2. Tell the AI: "Make the section labels use `font.pixel` instead of `font.label`"
3. Watch the preview update → save if you like it

**Add a new section:**
1. Tell the AI: "Add a 'Quick Links' section after cultural picks, using the same card style as adjacent news. It should show 3 links with a title and URL."
2. AI edits the template + adds sample data to `.preview.tsx`
3. Check all 5 preview variants in the sidebar → especially **NewsletterMinimal** to make sure it doesn't break when the new section is empty

**Fix an email bug:**
1. Tell the AI: "The dark-mode social icons have no background — the `yl-social` dark-mode override is missing `!important`"
2. AI fixes the CSS in the `darkModeCSS` string
3. Toggle dark mode in the preview to verify

---

## Deployment

Push to the main branch and [Vercel](https://vercel.com) auto-deploys. See [Next.js deployment docs](https://nextjs.org/docs/deployment) for advanced setup.

---

## Additional Docs

| Doc | What's in it |
|---|---|
| [`AGENTS.md`](./AGENTS.md) | Full project guide for AI tools — commands, architecture, style, commit rules |
| [`OG_IMAGE_GUIDE.md`](./OG_IMAGE_GUIDE.md) | How Open Graph preview images work |
| [`ANALYTICS_TRACKING.md`](./ANALYTICS_TRACKING.md) | PostHog & GA analytics setup |
| [`SEO_AND_ANALYTICS_COMPLETE.md`](./SEO_AND_ANALYTICS_COMPLETE.md) | Full SEO & analytics reference |
| [`SOCIAL_MEDIA_SEO_IMPROVEMENTS.md`](./SOCIAL_MEDIA_SEO_IMPROVEMENTS.md) | Social/SEO improvement ideas |