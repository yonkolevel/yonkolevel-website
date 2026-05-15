/**
 * Preview data for NewsletterEmail.
 *
 * Import these objects to render a fully-populated email in the react-email
 * dev server, Storybook-style previews, or one-off HTML exports.
 *
 * Three S1 variants are provided (feature / changelog / multi-app) so you can
 * quickly toggle between layouts without editing props by hand.
 */

import type { NewsletterEmailProps } from './NewsletterEmail';

// ─── S1 variants ──────────────────────────────────────────────────────────────

export const featureNews: NewsletterEmailProps['biggestNews'] = {
  variant: 'feature',
  appTag: 'Yonko Level',
  headline: 'Introducing Collaborative Timelines',
  imageUrl: 'https://yonkolevel.com/images/og-card.png',
  imageAlt: 'Collaborative Timelines hero image',
  copy: 'Start building together. Collaborative Timelines let your entire crew contribute to a shared chronology in real-time — with conflict-free merges, inline comments, and per-section permissions.',
  ctaText: 'Try it now →',
  ctaUrl: 'https://yonkolevel.com/features/collaborative-timelines',
};

export const changelogNews: NewsletterEmailProps['biggestNews'] = {
  variant: 'changelog',
  versionTag: 'v2.4',
  headline: 'Performance & Polish Update',
  items: [
    'Timeline canvas scrolls 3× faster on large datasets',
    'New quick-filter bar with saved queries',
    'Drag-and-drop reordering for timeline sections',
    'Keyboard shortcuts for power users (⌘+K palette)',
    'Dark-mode fixes for Safari and Outlook',
  ],
  ctaText: 'Read the changelog →',
  ctaUrl: 'https://yonkolevel.com/changelog/v2.4',
};

export const multiAppNews: NewsletterEmailProps['biggestNews'] = {
  variant: 'multi-app',
  primary: {
    appTag: 'Yonko Level',
    headline: 'Timeline Exports Are Here',
    copy: 'Export any timeline as PDF, PNG, or CSV with one click. Perfect for reports, presentations, and archives.',
    ctaText: 'Export a timeline →',
    ctaUrl: 'https://yonkolevel.com/features/exports',
  },
  secondary: {
    appTag: 'Level Up',
    headline: 'Weekly Digest Emails',
    copy: 'Get a personalised summary of your progress delivered every Monday morning.',
    ctaText: 'Enable digest →',
    ctaUrl: 'https://levelup.yonkolevel.com/settings/digest',
  },
};

// ─── Shared sections ─────────────────────────────────────────────────────────

export const adjacentNews: NewsletterEmailProps['adjacentNews'] = {
  label: 'Community',
  iconUrl: 'https://yonkolevel.com/images/logo.svg',
  headline: 'Yonko Level at DevConf Tokyo 2025',
  location: 'Tokyo Big Sight',
  date: 'Jul 12, 2025',
  copy: 'We\'re hosting a workshop on narrative-first design systems. Early-bird registration is open — seats are limited.',
  ctaText: 'Register →',
  ctaUrl: 'https://yonkolevel.com/events/devconf-tokyo',
};

export const blogPosts: NewsletterEmailProps['posts'] = [
  {
    type: 'Blog',
    headline: 'Why We Rebuilt Our Design System in Public',
    excerpt: 'A look inside the 6-month process of open-sourcing our core component library, and what we learned about community-driven design.',
    author: 'Ricardo Abreu',
    date: 'Jun 28, 2025',
    thumbnailUrl: 'https://yonkolevel.com/images/og-card.png',
    ctaUrl: 'https://yonkolevel.com/blog/rebuilt-design-system',
  },
  {
    type: 'Vlog',
    headline: 'Building a Timeline in 60 Seconds',
    excerpt: 'Speed-run of the new quick-start flow — from blank canvas to a complete multi-section timeline in under a minute.',
    thumbnailUrl: 'https://yonkolevel.com/images/og-card.png',
    ctaUrl: 'https://youtube.com/yonkolevel',
  },
];

export const education: NewsletterEmailProps['education'] = {
  label: 'Learn',
  headline: 'Nested Sections & Smart Collapsing',
  body: 'Deep timelines can overwhelm readers. Nested sections let you group related events under collapsible headings, and smart collapsing auto-folds sections that haven\'t been scrolled to in 30 days.',
  exampleContent: '▸ Q1 Planning\n    ▸ Market Research (3 events)\n    ▸ Sprint Cycle    (8 events)\n    ▶ Q2 Roadmap (collapsed — 14 events)',
  ctaText: 'Read the guide →',
  ctaUrl: 'https://yonkolevel.com/docs/nested-sections',
};

export const culturalPicks: NewsletterEmailProps['culturalPicks'] = [
  {
    thumbnailUrl: 'https://yonkolevel.com/images/og-card.png',
    title: 'Making of the Olympic Museum Interactive',
    url: 'https://example.com/olympic-museum',
    note: 'Beautiful scroll-driven storytelling. A masterclass in narrative web design.',
  },
  {
    thumbnailUrl: 'https://yonkolevel.com/images/og-card.png',
    title: '"Chronicles" by Bob Dylan',
    url: 'https://example.com/chronicles',
    note: 'Not a design book, but the way Dylan structures time is pure timeline craft.',
  },
  {
    thumbnailUrl: 'https://yonkolevel.com/images/og-card.png',
    title: 'Timeline JS — Knight Lab',
    url: 'https://timeline.knightlab.com',
    note: 'Open-source timeline builder. Great for quick prototypes and workshops.',
  },
];

export const socialLinks: NewsletterEmailProps['socialLinks'] = {
  twitter: 'https://twitter.com/yonkolevel',
  instagram: 'https://instagram.com/yonkolevel',
  youtube: 'https://youtube.com/@yonkolevel',
};

// ─── Fully-populated props ───────────────────────────────────────────────────

/** Light theme — feature variant (hero image) */
export const lightFeatureProps: NewsletterEmailProps = {
  theme: 'light',
  issueNumber: 'Issue #12',
  issueDate: 'Jul 1, 2025',
  editorialNote: 'This month we ship the feature you\'ve been requesting since day one. Grab a coffee and read on.',
  biggestNews: featureNews,
  adjacentNews,
  posts: blogPosts,
  education,
  culturalPicks,
  socialLinks,
  unsubscribeUrl: 'https://yonkolevel.com/unsubscribe?token=preview',
  preferencesUrl: 'https://yonkolevel.com/preferences?token=preview',
};

/** Dark theme — feature variant */
export const darkFeatureProps: NewsletterEmailProps = {
  ...lightFeatureProps,
  theme: 'dark',
};

/** Light theme — changelog variant (numbered list) */
export const lightChangelogProps: NewsletterEmailProps = {
  ...lightFeatureProps,
  biggestNews: changelogNews,
};

/** Dark theme — changelog variant */
export const darkChangelogProps: NewsletterEmailProps = {
  ...lightChangelogProps,
  theme: 'dark',
};

/** Light theme — multi-app variant (two apps side-by-side) */
export const lightMultiAppProps: NewsletterEmailProps = {
  ...lightFeatureProps,
  biggestNews: multiAppNews,
};

/** Dark theme — multi-app variant */
export const darkMultiAppProps: NewsletterEmailProps = {
  ...lightMultiAppProps,
  theme: 'dark',
};

/** Minimal — only required fields, no optional sections (tests empty states) */
export const minimalProps: NewsletterEmailProps = {
  issueNumber: 'Issue #01',
  issueDate: 'Jan 1, 2025',
  biggestNews: featureNews,
  culturalPicks: [],
  unsubscribeUrl: 'https://yonkolevel.com/unsubscribe?token=preview',
};