'use client';
import Head from 'next/head';
import HeroSection from '@/components/home/HeroSection';
import AppShowcaseSection from '@/components/AppShowcaseSection';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Yonko Level</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HeroSection />
      <AppShowcaseSection
        appName='INVISIBLE CAMERA'
        appDescription="A super simple, easy-to-use mobile camera app that lets you capture moments instantly. With a clean, clutter-free design, it opens fast and takes great photos without any fuss. Just tap and shoot—it's that delightful."
        appScreenshot='/images/products/invisible-camera/ic-app-store-preview.png'
        learnMoreLink='/products/invisible-camera'
        sectionBackgroundColor='#F8FAFC'
        backgroundColorGrid='#F4A717'
        reversed={false}
      />
      <AppShowcaseSection
        appName='MIDICIRCUIT'
        appDescription="A super simple, easy-to-use mobile camera app that lets you capture moments instantly. With a clean, clutter-free design, it opens fast and takes great photos without any fuss. Just tap and shoot—it's that delightful."
        appScreenshot='/images/products/midicircuit/midicircuit-preview-1.png'
        learnMoreLink='/products/invisible-camera'
        sectionBackgroundColor='#F8FAFC'
        backgroundColorGrid='#895efb'
        reversed={true}
      />
    </div>
  );
};

export default Home;
