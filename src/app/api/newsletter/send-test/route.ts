import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import * as React from 'react';
import { Resend } from 'resend';
import NewsletterEmail, { type Theme } from '@/emails/NewsletterEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const BASE = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

const sampleData = {
  issueNumber: '#001',
  issueDate: 'May 2026',
  editorialNote: "Big month. Android beta is finally happening, we shipped Music as Markdown, and I've been deep in drum samples all week for reasons that will make sense soon.",

  biggestNews: {
    variant: 'feature' as const,
    appTag: 'Midicircuit',
    headline: 'Android Beta is Here — Be Among the First',
    imageUrl: `${BASE}/products/midicircuit/press/screenshot-ios-1.jpg`,
    imageAlt: 'Midicircuit running on iOS',
    copy: "Three years in the making. Midicircuit is coming to Android and we're opening beta access now. If you've been waiting to bring your MIDI workflow off iOS, this is your moment — spots are limited.",
    ctaText: 'Join the Android Beta →',
    ctaUrl: 'https://yonkolevel.com/midicircuit',
  },

  posts: [
    {
      type: 'Blog' as const,
      headline: 'Music as Markdown',
      excerpt: "What if fenced code blocks could play music? We built an open-source toolkit that turns markdown into interactive instruments — drum pads, keyboards, sequencers — all running in the browser.",
      author: 'Ricardo',
      date: 'Mar 19 2026',
      thumbnailUrl: `${BASE}/images/blog/obsidian-elementary-audio/og-cover.png`,
      ctaUrl: 'https://yonkolevel.com/blog/obsidian-elementary-audio',
    },
    {
      type: 'Vlog' as const,
      headline: 'Making Music with Midicircuit — Watch the Session',
      excerpt: "A live session showing what Midicircuit can do in practice — Playgrounds, Circuits, and the whole workflow from scratch.",
      thumbnailUrl: 'https://img.youtube.com/vi/sFPUNKcgCl4/hqdefault.jpg',
      ctaUrl: 'https://www.youtube.com/watch?v=sFPUNKcgCl4',
    },
  ],

  education: {
    label: 'The Session',
    headline: 'What Makes a Great Sample Pack',
    body: "Not all samples are created equal. The ones people actually come back to have six things in common: punch (crisp transients), body (no thin or hollow sounds), character (a distinctive identity), consistency (everything belongs together), dynamics (responds well to velocity), and a clean tail — no clicks, pops, or abrupt cuts.",
    exampleContent: "Quick test: load each sample, play it at velocity 30 and then 127. If there's no personality difference, your dynamics need work. The best packs feel alive at every velocity.",
    ctaText: 'Try it in Midicircuit →',
    ctaUrl: 'https://yonkolevel.com/midicircuit',
  },

  culturalPicks: [
    {
      thumbnailUrl: `${BASE}/products/midicircuit/app-icon.png`,
      title: 'Midicircuit Sound Pack Guide',
      url: 'https://yonkolevel.com/blog/midicircuit-sound-pack-guide',
      note: "We published the full spec for anyone who wants to submit a pack. WAV, 44.1k, 24-bit — and a checklist that actually means something.",
    },
    {
      thumbnailUrl: `${BASE}/products/invisible-camera/app-icon.png`,
      title: 'Invisible Camera',
      url: 'https://yonkolevel.com/products/invisible-camera',
      note: "Our other app — if you don't know it yet, it's been quietly doing its thing. Worth a look.",
    },
    {
      thumbnailUrl: `${BASE}/images/blog/midicircuit-v2-launch/midicircuit-pins.jpg`,
      title: 'Limited Edition Midicircuit Pins',
      url: 'https://yonkolevel.com/shop',
      note: "Still a few left in the shop. Délcio designed them, we hand-assembled the packaging in Tilburg. Real ones only.",
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

export async function POST(request: Request) {
  const secret = process.env.INTERNAL_SECRET;
  if (!secret || request.headers.get('x-internal-secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const to: string = body.to ?? 'ricardo@yonkolevel.com';
  const theme: Theme = body.theme ?? 'light';

  const html = await render(React.createElement(NewsletterEmail, { ...sampleData, theme }));

  const { data, error } = await resend.emails.send({
    from: 'Yonko Level <onboarding@resend.dev>',
    to: [to],
    subject: `[TEST] Yonko Level Newsletter ${sampleData.issueNumber} — ${sampleData.issueDate}`,
    html,
  });

  if (error) {
    console.error('Test send failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data?.id, to, theme });
}
