# Repository Guidelines

## Project Structure & Module Organization

Next.js App Router site using React 19, TypeScript, Tailwind CSS, DaisyUI, and MDX.

- `src/app/` contains routes, layouts, metadata, and API handlers.
- `src/components/` contains reusable React components grouped by feature, such as `shop/`, `home/`, `blog/`, `icons/`, and `shapes/`.
- `src/content/blog/` contains MDX blog posts.
- `src/lib/` contains utilities for analytics, Stripe, MDX, hooks, and shop data.
- `src/emails/` contains React Email templates.
- `public/` contains static assets, product media, fonts, and scripts.

## Architecture Notes

Blog routes read MDX from `src/content/blog/` through `src/lib/mdx.ts`. Shop data comes from Stripe and is decorated by `src/lib/shop/products.ts`. Analytics use PostHog plus GA helpers in `src/lib/analytics/ga.ts`.

## Required Environment Variables

Use `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` for newsletter routes, Stripe keys for shop, and `NEXT_PUBLIC_POSTHOG_KEY` for analytics.

## Build, Test, and Development Commands

Use Node `22.x`, as declared in `package.json`.

- `npm run dev` starts the local Next.js development server.
- `npm run build` creates a production build and catches type/build issues.
- `npm run start` serves the production build after `npm run build`.
- `npm run lint` runs the Next.js ESLint rules.

Both `package-lock.json` and `yarn.lock` exist. Avoid churn.

## Coding Style & Naming Conventions

Use TypeScript for application code. Prefer function components and colocate component-specific CSS modules next to the component, for example `src/components/NavLink/navlink.module.css`.

Follow the existing style: two-space indentation, semicolons, single quotes in TS/TSX, PascalCase components, camelCase functions and variables, and kebab-case route segments. Use the `@/*` alias for imports from `src`.

Styling is primarily Tailwind CSS. Prefer existing color, spacing, breakpoint, and font tokens in `tailwind.config.ts` before adding new ones.

## Testing Guidelines

No dedicated test runner is configured. For now, validate with:

- `npm run lint`
- `npm run build`

For behavior-sensitive changes, add focused tests after introducing a test framework and script. Keep future tests near the feature and use names such as `ProductCard.test.tsx`.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit-style prefixes, especially `feat:` and `fix:`. Keep commit subjects short and imperative, for example `feat: add newsletter email system` or `fix: harden newsletter API routes for production`.

Pull requests should include a summary, validation steps, linked issues when applicable, and screenshots for visible UI changes. Call out analytics, Stripe, Resend, or environment changes.

## Security & Configuration Tips

Do not commit secrets or local environment files. Document any new required environment variables in the relevant README or implementation notes.
