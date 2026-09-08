import type { Metadata } from 'next';
import StudioClient from './StudioClient';

const description =
  'We build our own products and help teams build apps and websites. Work directly with Ricardo, from the first conversation to writing the code and going live.';

export const metadata: Metadata = {
  title: {
    absolute: 'Yonko Level Studio | Apps & Websites',
  },
  description,
  keywords: [
    'mobile product engineering',
    'website development',
    'mobile app architecture',
    'React Native',
    'audio software',
    'camera software',
    'connected hardware',
    'fractional engineering lead',
  ],
  openGraph: {
    title: 'Yonko Level Studio | Apps & Websites',
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
    title: 'Yonko Level Studio | Apps & Websites',
    description,
    images: ['/images/og-image.jpg'],
  },
};

export default function StudioPage() {
  return <StudioClient />;
}
