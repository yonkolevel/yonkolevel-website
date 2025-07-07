import type { Metadata } from 'next';
import { Noto_Sans, Press_Start_2P } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Layout from '@/components/Layout';
import Header from '@/components/Header';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

const departureMono = localFont({
  src: [
    {
      path: '../../public/fonts/DepartureMono/DepartureMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DepartureMono/DepartureMono-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DepartureMono/DepartureMono-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-pixel',
});

export const metadata: Metadata = {
  title: 'Yonko Level',
  description: 'Your remote friendly tech and design team.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Yonko Level',
    url: 'https://yonkolevel.com',
    title: 'Yonko Level',
    description: 'Your remote friendly tech and design team.',
    images: [
      {
        url: 'https://yonkolevel.com/images/og_800_x_600.jpg',
        width: 800,
        height: 600,
        alt: 'Yonko Level logo',
      },
      {
        url: 'https://yonkolevel.com/images/og_900_x_800.jpg',
        width: 900,
        height: 800,
        alt: 'Yonko Level logo',
      },
    ],
  },
  twitter: {
    creatorId: '@yonkolevel',
    site: '@yonkolevel',
    card: 'summary_large_image',
  },
  metadataBase: new URL('https://yonkolevel.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${notoSans.variable} ${departureMono.variable}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
