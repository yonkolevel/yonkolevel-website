import Head from 'next/head';
import * as React from 'react';
import Footer from './Footer';
import Script from 'next/script';

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
          content='width=device-width,height=device-height,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0'
        />
      </Head>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
