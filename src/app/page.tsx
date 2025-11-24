'use client';
import Head from 'next/head';
import HeroSection from '@/components/home/HeroSection';
import AppShowcaseSection from '@/components/AppShowcaseSection';
import HeroWithPixels from '@/components/HeroWithPixels';
import PromotionalVideoSection from '@/components/PromotionalVideoSection';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Yonko Level</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <HeroSection /> */}
      {/* <div className='mt-60 bg-black' /> */}
      <HeroWithPixels
        title='Yonko Level'
        subtitle='Apps that make you smile 😁'
        backgroundColor='#121212'
        pixelColor='#FF5C24'
        holeColor='#F8FAFC'
      />
      <AppShowcaseSection
        appName='INVISIBLE CAMERA'
        appDescription="A super simple, easy-to-use mobile camera app that lets you capture moments instantly. With a clean, clutter-free design, it opens fast and takes great photos without any fuss. Just tap and shoot—it's that delightful."
        appScreenshot='/products/invisible-camera/ic-app-store-preview.png'
        mediaType='image'
        learnMoreLink='/products/invisible-camera'
        sectionBackgroundColor='#1a1a1a'
        backgroundColorGrid='#F3B23F'
        backgroundImage='/images/section-backgrounds/invisible-camera-app-section-background.svg'
        reversed={false}
        pixelDisplacements={[
          // Top-right edge ladder flowing outward
          { row: 0, col: 13, displaceX: 3, displaceY: -2 },
          { row: 1, col: 12, displaceX: 4, displaceY: -1 },
          { row: 2, col: 11, displaceX: 5, displaceY: 1 },

          // Bottom-right edge ladder flowing outward
          { row: 12, col: 13, displaceX: 3, displaceY: 2 },
          { row: 11, col: 12, displaceX: 4, displaceY: 1 },
        ]}
        contentSafeZones={[
          { startRow: 2, endRow: 4, startCol: 0, endCol: 2 }, // Title safe zone
          { startRow: 5, endRow: 8, startCol: 0, endCol: 3 }, // Description safe zone
          { startRow: 9, endRow: 10, startCol: 0, endCol: 2 }, // Button safe zone
        ]}
      />

      {/* Promotional Video Section */}
      <PromotionalVideoSection
        videoSource='/products/midicircuit/videos/promo-video.mov'
        appName='MIDICIRCUIT'
        appDescription='Experience the future of music creation with our innovative MIDI circuit builder. Design, connect, and play with virtual circuits that respond to your creativity in real-time.'
        learnMoreLink='/products/midicircuit'
        backgroundColor='#000000'
        overlayOpacity={0.4}
        showControls={true}
      />

      <AppShowcaseSection
        appName='MIDICIRCUIT'
        appDescription='Experience the future of music creation with our innovative MIDI circuit builder. Design, connect, and play with virtual circuits that respond to your creativity in real-time.'
        appScreenshot='/products/midicircuit/midicircuit-preview-1.png'
        mediaType='image'
        learnMoreLink='/products/midicircuit'
        sectionBackgroundColor='#121212'
        backgroundColorGrid='#FF5C24'
        backgroundImage='/images/section-backgrounds/midicircuit-app-section-background.svg'
        reversed={true}
        pixelDisplacements={[
          { row: 12, col: 13, displaceX: 2, displaceY: -1 },
          { row: 0, col: 2, displaceX: 5, displaceY: 1 },
          { row: 1, col: 0, displaceX: 8, displaceY: 1 },
          { row: 8, col: 1, displaceX: 8, displaceY: -1 },
          { row: 10, col: 3, displaceX: 17, displaceY: 1 },
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
