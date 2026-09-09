/**
 * The site's type ramp.
 *
 * Every heading and label on the site composes from one of these roles, so
 * type is changed here rather than at each call site.
 *
 * Weight is baked into each role rather than left free. Doto is a dot matrix
 * face and its weight controls how far the dots swell before they touch: at
 * 900 the glyphs read as solid strokes, which suits display sizes and small
 * caps labels but fills in solid on anything mid-sized. So 900 belongs to
 * labels, 700 to titles and headings, 500 to sub-headings.
 *
 * Sizes stay on the scale in tailwind.config.ts. Hero wordmarks are the one
 * exception: they size fluidly against the viewport so they keep filling
 * their panel, and are set in the components that own them.
 *
 * Utility pages (privacy policies, guides and press kits) are deliberately
 * outside this ramp and set their headings in the body face.
 */

/** Page titles. 48 → 72 from large up. */
export const TITLE =
  'font-pixel font-[700] text-3xl leading-tight tracking-tight lg:text-5xl';

/** Section headings within a page. 32 → 64 from large up. */
export const HEADING =
  'font-pixel font-[700] text-2xl leading-tight tracking-tight lg:text-4xl';

/** Card titles and sub-headings. 24 → 32 from large up. */
export const SUBHEAD =
  'font-pixel font-[500] text-xl leading-snug tracking-[0.03em] lg:text-2xl';

/** Standfirsts and taglines sitting directly under a title. 18. */
export const LEAD = 'font-pixel font-[900] text-lg uppercase tracking-[0.12em]';

/** Eyebrows, markers, badges, metadata and pixel-font buttons. 12. */
export const LABEL = 'font-pixel font-[900] text-xs uppercase tracking-[0.22em]';

/** Body copy. 16 → 18 from medium up. */
export const BODY = 'text-base leading-8 md:text-lg';

/** Secondary body copy: captions and fine print. 14. */
export const BODY_SM = 'text-sm leading-6';
