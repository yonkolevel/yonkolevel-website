import Head from 'next/head';
import * as React from 'react';
import Footer from './Footer';
import Script from 'next/script';
import Header from './Header';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=UA-180033245-1`}
      />

      <Script strategy='lazyOnload' id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-180033245-1', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
      </Head>
      <div className='relative min-h-screen bg-black'>
        <a
          href='#main-content'
          className='sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:not-sr-only focus:bg-white focus:px-4 focus:py-3 focus:font-pixel focus:text-xs focus:text-black focus:outline-none focus:ring-2 focus:ring-orange'
        >
          Skip to content
        </a>
        <Header />
        <main id='main-content' tabIndex={-1} className='relative'>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
