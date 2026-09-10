'use client';
import Head from 'next/head';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import AppShowcaseSection from '@/components/AppShowcaseSection';
import Container from '@/components/Container';
import { BODY, HEADING, LABEL, SECTION_Y } from '@/lib/typography';
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
        appDescription='Tired of over-processed iPhone photos? Invisible Camera bypasses Deep Fusion and Smart HDR. See your shot in real-time. What you see is what you get.'
        appScreenshot='/products/invisible-camera/marketing/ic-viewfinder.webp'
        mediaType='image'
        learnMoreLink='/products/invisible-camera'
        sectionBackgroundColor='#1a1a1a'
        backgroundColorGrid='#F3B23F'
        backgroundImage='/images/section-backgrounds/invisible-camera-app-section-background.svg'
        reversed={false}
        pixelDisplacements={[
          // Right-edge ladder, anchored across container sizes.
          { row: 0, col: -1, displaceX: 3, displaceY: -2 },
          { row: 1, col: -2, displaceX: 4, displaceY: -1 },
          { row: 2, col: -3, displaceX: 5, displaceY: 1 },

          { row: -1, col: -1, displaceX: 3, displaceY: 2 },
          { row: -2, col: -2, displaceX: 4, displaceY: 1 },
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
          { row: -1, col: -1, displaceX: 2, displaceY: -1 },
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

      <section
        className={`bg-black ${SECTION_Y}`}
        aria-labelledby='home-studio-title'
      >
        <Container>
          <div className='grid grid-cols-1 gap-10 border-t border-white/10 pt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:pt-20'>
            <div>
              <p className={`mb-5 ${LABEL} text-orange`}>
                STUDIO
              </p>
              <h2
                id='home-studio-title'
                className={`${HEADING} text-white`}
              >
                WE BUILD OUR OWN PRODUCTS.
                <br />
                WE HELP TEAMS BUILD APPS AND WEBSITES.
              </h2>
            </div>

            <div className='max-w-2xl lg:pt-10'>
              <p className={`${BODY} text-white/70`}>
                We work with founders, product teams and brands to build apps
                and websites, or improve the ones they already have. We
                especially enjoy working with audio, cameras and connected
                hardware.
              </p>
              <p className={`mt-5 ${LABEL} text-white/50`}>
                One partnership at a time, working directly with Ricardo.
              </p>
              <Link
                href='/studio'
                onClick={() =>
                  posthog?.capture('homepage_studio_cta_clicked', {
                    destination: '/studio',
                  })
                }
                className={`mt-10 inline-flex min-h-12 items-center rounded-full border-2 border-orange px-7 ${LABEL} text-white transition-colors hover:bg-orange hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-black`}
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
