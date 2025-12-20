import type { Metadata } from 'next';
import { Noto_Sans, Press_Start_2P, Doto } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import { PHProvider } from '@/providers/posthog';
import PostHogPageView from '@/components/PostHogPageView';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

const departureMono = Doto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-pixel',
});

export const metadata: Metadata = {
  title: {
    default: 'Yonko Level - Apps that make you smile',
    template: '%s | Yonko Level',
  },
  description:
    'Creating delightful apps and digital experiences.',
  keywords: [
    'app development',
    'iOS apps',
    'music apps',
    'camera apps',
    'tech studio',
    'design team',
    'Midicircuit',
    'Invisible Camera',
  ],
  authors: [{ name: 'Yonko Level' }],
  creator: 'Yonko Level',
  publisher: 'Yonko Level',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Yonko Level',
    url: 'https://yonkolevel.com',
    title: 'Yonko Level - Apps that make you smile',
    description:
      'Creating delightful apps and digital experiences.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yonko Level - Apps that make you smile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yonkolevel',
    creator: '@yonkolevel',
    title: 'Yonko Level - Apps that make you smile',
    description:
      'Creating delightful apps and digital experiences.',
    images: ['/images/og-image.jpg'],
  },
  metadataBase: new URL('https://yonkolevel.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${notoSans.variable} ${departureMono.variable}`}>
        <PHProvider>
          <PostHogPageView />
          <Layout>{children}</Layout>
        </PHProvider>
      </body>
    </html>
  );
}
