import { type NewsletterEmailProps, type Theme } from '@/emails/NewsletterEmail';

const BASE = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const sampleNewsletterData: NewsletterEmailProps = {
  issueNumber: '#001',
  issueDate: 'May 2026',
  editorialNote: "Big month. Android beta is finally happening, we shipped Music as Markdown, and I've been deep in drum samples all week for reasons that will make sense soon.",

  biggestNews: {
    variant: 'feature' as const,
    appTag: 'Midicircuit',
    headline: 'Android Beta is Here: Be Among the First',
    imageUrl: `${BASE}/products/midicircuit/press/screenshot-ios-1.jpg`,
    imageAlt: 'Midicircuit running on iOS',
    copy: "Three years in the making. Midicircuit is coming to Android and we're opening beta access now. If you've been waiting to bring your MIDI workflow off iOS, this is your moment. Spots are limited.",
    ctaText: 'Join the Android Beta →',
    ctaUrl: 'https://yonkolevel.com/midicircuit',
  },

  posts: [
    {
      type: 'Blog' as const,
      headline: 'Music as Markdown',
      excerpt: "What if fenced code blocks could play music? We built an open-source toolkit that turns markdown into interactive instruments: drum pads, keyboards and sequencers, all running in the browser.",
      author: 'Ricardo',
      date: 'Mar 19 2026',
      thumbnailUrl: `${BASE}/images/blog/obsidian-elementary-audio/og-cover.png`,
      ctaUrl: 'https://yonkolevel.com/blog/obsidian-elementary-audio',
    },
    {
      type: 'Vlog' as const,
      headline: 'Making Music with Midicircuit: Watch the Session',
      excerpt: 'A live session showing what Midicircuit can do in practice: Playgrounds, Circuits and the whole workflow from scratch.',
      thumbnailUrl: 'https://img.youtube.com/vi/sFPUNKcgCl4/hqdefault.jpg',
      ctaUrl: 'https://www.youtube.com/watch?v=sFPUNKcgCl4',
    },
  ],

  education: {
    label: 'The Session',
    headline: 'What Makes a Great Sample Pack',
    body: 'Not all samples are created equal. The ones people actually come back to have six things in common: punch (crisp transients), body (no thin or hollow sounds), character (a distinctive identity), consistency (everything belongs together), dynamics (responds well to velocity), and a clean tail. No clicks, pops, or abrupt cuts.',
    exampleContent: "Quick test: load each sample, play it at velocity 30 and then 127. If there's no personality difference, your dynamics need work. The best packs feel alive at every velocity.",
    ctaText: 'Try it in Midicircuit →',
    ctaUrl: 'https://yonkolevel.com/midicircuit',
  },

  // the sound pack guide led this list until its post took `hidden: true`,
  // which delists it and leaves it unrouted, so the link answered 404
  culturalPicks: [
    {
      thumbnailUrl: `${BASE}/products/invisible-camera/app-icon.png`,
      title: 'Invisible Camera',
      url: 'https://yonkolevel.com/products/invisible-camera',
      note: "Our other app. If you don't know it yet, it's been quietly doing its thing. Worth a look.",
    },
    {
      thumbnailUrl: `${BASE}/images/blog/midicircuit-v2-launch/midicircuit-pins.jpg`,
      title: 'Limited Edition Midicircuit Pins',
      url: 'https://yonkolevel.com/shop',
      note: 'Still a few left in the shop. Délcio designed them, we hand-assembled the packaging in Tilburg. Real ones only.',
    },
  ],

  socialLinks: {
    twitter: 'https://x.com/yonkolevel',
    instagram: 'https://instagram.com/yonkolevel',
    youtube: 'https://youtube.com/@yonkolevel',
  },

  unsubscribeUrl: 'https://yonkolevel.com/unsubscribe',
  preferencesUrl: 'https://yonkolevel.com/preferences',
};

export interface NewsletterRenderInput {
  props: NewsletterEmailProps;
  subject: string;
  previewText?: string;
  usedProvidedProps: boolean;
}

export function isNewsletterProps(value: unknown): value is NewsletterEmailProps {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<NewsletterEmailProps>;
  return Boolean(
    typeof candidate.issueNumber === 'string'
      && typeof candidate.issueDate === 'string'
      && candidate.biggestNews
      && typeof candidate.biggestNews === 'object'
      && Array.isArray(candidate.culturalPicks)
      && typeof candidate.unsubscribeUrl === 'string',
  );
}

export function resolveNewsletterRenderInput(body: Record<string, unknown>): NewsletterRenderInput {
  const pkg = body.package && typeof body.package === 'object' ? body.package as Record<string, unknown> : undefined;
  const propsInput = pkg && 'props' in pkg ? pkg.props : body.props;
  const theme = (typeof body.theme === 'string' ? body.theme : undefined) as Theme | undefined;
  const props = isNewsletterProps(propsInput)
    ? { ...propsInput, theme: theme ?? propsInput.theme ?? 'light' }
    : { ...sampleNewsletterData, theme: theme ?? 'light' };
  const subjectFromPackage = typeof pkg?.subject === 'string' ? pkg.subject : undefined;
  const previewTextFromPackage = typeof pkg?.previewText === 'string' ? pkg.previewText : undefined;
  const subject = typeof body.subject === 'string'
    ? body.subject
    : subjectFromPackage ?? `Yonko Level Newsletter ${props.issueNumber}: ${props.issueDate}`;

  return {
    props,
    subject,
    previewText: typeof body.previewText === 'string' ? body.previewText : previewTextFromPackage,
    usedProvidedProps: isNewsletterProps(propsInput),
  };
}

function collectUrl(value: unknown, urls: Set<string>): void {
  if (typeof value === 'string' && /^https?:\/\//i.test(value)) {
    urls.add(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectUrl(item, urls);
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      if (/url$/i.test(key) || key === 'href') collectUrl(nested, urls);
    }
  }
}

export function collectNewsletterAssetWarnings(props: NewsletterEmailProps): string[] {
  const urls = new Set<string>(['https://yonkolevel.com/images/logo.svg']);
  collectUrl(props, urls);

  const warnings: string[] = [];
  for (const url of Array.from(urls)) {
    if (/^http:\/\//i.test(url)) warnings.push(`Use HTTPS for email asset/link URL: ${url}`);
    if (/localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(url)) warnings.push(`Do not use local URLs in email assets/links: ${url}`);
    if (/\.svg(?:$|[?#])/i.test(url)) warnings.push(`SVG images may not render consistently in email clients; verify or provide PNG/JPG fallback: ${url}`);
  }

  return Array.from(new Set(warnings));
}
