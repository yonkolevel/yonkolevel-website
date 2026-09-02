import type { Metadata } from 'next';
import StudioClient from './StudioClient';

const description =
  'Founder-led mobile product engineering for ambitious product teams—from new apps and architecture to native systems and reliable releases.';

export const metadata: Metadata = {
  title: {
    absolute: 'Yonko Level Studio — Founder-led Mobile Product Engineering',
  },
  description,
  keywords: [
    'mobile product engineering',
    'mobile app architecture',
    'React Native',
    'audio software',
    'camera software',
    'connected hardware',
    'fractional engineering lead',
  ],
  openGraph: {
    title: 'Yonko Level Studio — Founder-led Mobile Product Engineering',
    description,
    url: 'https://yonkolevel.com/studio',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yonko Level Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yonko Level Studio — Founder-led Mobile Product Engineering',
    description,
    images: ['/images/og-image.jpg'],
  },
};

export default function StudioPage() {
  return <StudioClient />;
}
