'use client';
import Head from 'next/head';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import AppShowcaseSection from '@/components/AppShowcaseSection';
import Container from '@/components/Container';
import HeroWithPixels from '@/components/HeroWithPixels';
import PromotionalVideoSection from '@/components/PromotionalVideoSection';
import NewsletterSignup from '@/components/NewsletterSignup';

const Home = () => {
  const posthog = usePostHog();

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
        appDescription="Tired of over-processed iPhone photos? Invisible Camera bypasses Deep Fusion and Smart HDR. See your shot in real-time. What you see is what you get."
        appScreenshot='/products/invisible-camera/marketing/ic-viewfinder.webp'
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
        backgroundColor='#000000'
        overlayOpacity={0.4}
        showControls={true}
      />

      <AppShowcaseSection
        appName='MIDICIRCUIT'
        appDescription='A simple and approachable DAW that makes it easy to start creating music. Record audio, lay down MIDI, mix your tracks, and share with friends. Available on iPhone, iPad, Mac and Android.'
        appScreenshot='/products/midicircuit/marketing/mc-song.webp'
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

      <section className='bg-black py-20 md:py-28' aria-labelledby='home-studio-title'>
        <Container>
          <div className='grid grid-cols-1 gap-10 border-t border-white/10 pt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:pt-20'>
            <div>
              <p className='mb-5 font-pixel text-xs uppercase tracking-[0.22em] text-orange'>
                {'// STUDIO'}
              </p>
              <h2
                id='home-studio-title'
                className='font-pixel text-2xl leading-tight tracking-tight text-white md:text-4xl'
              >
                WE BUILD OUR OWN PRODUCTS.
                <br />
                WE ALSO HELP SELECTED TEAMS BUILD THEIRS.
              </h2>
            </div>

            <div className='max-w-2xl lg:pt-10'>
              <p className='text-base leading-8 text-white/70 md:text-lg'>
                Founder-led mobile product engineering for selected teams and brands, especially
                products involving audio, cameras, connected hardware, payments, location or
                complex real-world systems.
              </p>
              <p className='mt-5 font-pixel text-xs uppercase tracking-[0.16em] text-white/50'>
                One principal partnership at a time.
              </p>
              <Link
                href='/studio'
                onClick={() =>
                  posthog?.capture('homepage_studio_cta_clicked', {
                    destination: '/studio',
                  })
                }
                className='mt-10 inline-flex min-h-12 items-center rounded-full border-2 border-orange px-7 font-pixel text-xs uppercase tracking-[0.12em] text-white transition-colors hover:bg-orange hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-black'
              >
                Visit the Studio →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <NewsletterSignup />
    </div>
  );
};

export default Home;
