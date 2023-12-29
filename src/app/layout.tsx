import type { Metadata } from 'next';
import { Inter, Noto_Sans, Press_Start_2P } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';
import NavLink from '@/components/NavLink/NavLink';
import Header from '@/components/Header';


const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
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
        url: '/images/og_800_x_600.jpg',
        width: 800,
        height: 600,
        alt: 'Yonko Level logo',
      },
      {
        url: '/images/og_900_x_800.jpg',
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
      <body className={`${notoSans.variable} ${pressStart2P.variable}`}>
        <Layout>
          {/* <div className='navbar bg-white mb-12'>
            <div className='flex-1'>
              <a href='/'>
                <img src='/images/logo.svg' className='w-[100px]' />
              </a>
            </div>

            <div className='flex-none'>
              <NavLink href='/about' variant='yellow'>
                About us
              </NavLink>

              <NavLink href='/contact' variant='orange'>
                Contact us
              </NavLink>
            </div>
          </div> */}

          <Header />
          {children}
        </Layout>
      </body>
    </html>
  );
}
