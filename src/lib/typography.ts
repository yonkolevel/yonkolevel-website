/**
 * The site's type ramp.
 *
 * Every heading and label on the site composes from one of these roles, so
 * type is changed here rather than at each call site.
 *
 * Every role runs at 900, the single cut Doto is loaded at. The face is a dot
 * matrix and 900 closes the dots up into solid strokes, so the pixel grain
 * only reads at display sizes and at the smallest labels. That is a
 * deliberate call: the ramp separates roles by size, not by weight.
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
  'font-pixel font-[900] text-3xl leading-tight tracking-tight lg:text-5xl';

/** Section headings within a page. 32 → 64 from large up. */
export const HEADING =
  'font-pixel font-[900] text-2xl leading-tight tracking-tight lg:text-4xl';

/** Card titles and sub-headings. 24 → 32 from large up. */
export const SUBHEAD =
  'font-pixel font-[900] text-xl leading-snug tracking-[0.03em] lg:text-2xl';

/** Standfirsts and taglines sitting directly under a title. 18 → 24. */
export const LEAD =
  'font-pixel font-[900] text-lg uppercase tracking-[0.12em] lg:text-xl';

/** Eyebrows, markers, badges, metadata and pixel-font buttons. 12. */
export const LABEL = 'font-pixel font-[900] text-xs uppercase tracking-[0.22em]';

/**
 * Header, drawer and footer navigation. 18, and fixed: the nav reads at the
 * same size on a phone as on a desktop. Heavy like the labels, since it is the
 * same kind of small caps signpost.
 */
export const NAV = 'font-pixel font-[900] text-lg';

/** Body copy. 16 → 18 from medium up. */
export const BODY = 'text-base leading-8 md:text-lg';

/** Secondary body copy: captions and fine print. 14. */
export const BODY_SM = 'text-sm leading-6';

/* ---------------------------------------------------------------- spacing */

/**
 * The gaps a section is built from, read off the Studio page so every page
 * opens the same way: an eyebrow, its heading, then the copy. Applied to the
 * lower element of each pair, so a section reads top to bottom in the markup.
 */

/** Eyebrow down to the heading it introduces. 20. */
export const GAP_LABEL = 'mb-5';

/** Section heading down to its copy. 40. */
export const GAP_HEADING = 'mt-10';

/** Marker down to the sub-head it introduces. 32. */
export const GAP_MARKER = 'mt-[2rem]';

/** Sub-head down to its copy. 20. */
export const GAP_SUBHEAD = 'mt-5';
