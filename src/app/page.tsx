'use client';
import Head from 'next/head';
import HeroSection from '@/components/home/HeroSection';
import AppShowcaseSection from '@/components/AppShowcaseSection';
import HeroWithPixels from '@/components/HeroWithPixels';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Yonko Level</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <HeroSection /> */}
      <HeroWithPixels
        title='Yonko Level'
        subtitle='Apps that make you smile :)'
        backgroundColor='#FF2D55'
        pixelColor='#FF2D55'
        holeColor='#F8FAFC'
      />
      <AppShowcaseSection
        appName='INVISIBLE CAMERA'
        appDescription="A super simple, easy-to-use mobile camera app that lets you capture moments instantly. With a clean, clutter-free design, it opens fast and takes great photos without any fuss. Just tap and shoot—it's that delightful."
        appScreenshot='/images/products/invisible-camera/ic-app-store-preview.png'
        learnMoreLink='/products/invisible-camera'
        sectionBackgroundColor='#F8FAFC'
        backgroundColorGrid='#007AFF'
        reversed={false}
        pixelDisplacements={[
          { row: 0, col: 2, displaceX: -3, displaceY: 1 },
          { row: 1, col: 0, displaceX: -2, displaceY: 2 },
          { row: 8, col: 1, displaceX: 1, displaceY: -3 },
          { row: 10, col: 3, displaceX: -2, displaceY: 1 },
        ]}
        contentSafeZones={[
          { startRow: 2, endRow: 4, startCol: 0, endCol: 2 }, // Title safe zone
          { startRow: 5, endRow: 8, startCol: 0, endCol: 3 }, // Description safe zone
          { startRow: 9, endRow: 10, startCol: 0, endCol: 2 }, // Button safe zone
        ]}
      />
      <AppShowcaseSection
        appName='MIDICIRCUIT'
        appDescription="A super simple, easy-to-use mobile camera app that lets you capture moments instantly. With a clean, clutter-free design, it opens fast and takes great photos without any fuss. Just tap and shoot—it's that delightful."
        appScreenshot='/images/products/midicircuit/midicircuit-preview-1.png'
        learnMoreLink='/products/invisible-camera'
        sectionBackgroundColor='#F8FAFC'
        backgroundColorGrid='#895efb'
        reversed={true}
        pixelDisplacements={[
          { row: 0, col: 1, displaceX: 2, displaceY: -1 },
          { row: 1, col: 3, displaceX: -1, displaceY: 3 },
          { row: 3, col: 0, displaceX: 3, displaceY: -2 },
          { row: 7, col: 2, displaceX: -4, displaceY: 2 },
          { row: 9, col: 4, displaceX: 2, displaceY: -1 },
        ]}
        contentSafeZones={[
          { startRow: 3, endRow: 5, startCol: 0, endCol: 2 }, // Custom title area for purple theme
          { startRow: 6, endRow: 9, startCol: 0, endCol: 3 }, // Custom description area
          { startRow: 10, endRow: 11, startCol: 0, endCol: 2 }, // Custom button area
        ]}
      />
    </div>
  );
};

export default Home;
