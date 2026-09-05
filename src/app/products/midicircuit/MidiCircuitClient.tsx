/* eslint-disable @next/next/no-img-element */
'use client';
import { motion } from 'framer-motion';
import ProductContentSection from '@/components/ProductContentSection';
import ProductHero from '@/components/ProductHero';
import PromotionalVideoSection from '@/components/PromotionalVideoSection';
import Container from '@/components/Container';
import * as React from 'react';
import { usePostHog } from 'posthog-js/react';

export default function MidiCircuitClient() {
  const posthog = usePostHog();

  const handleAppStoreClick = () => {
    posthog?.capture('app_store_badge_clicked', {
      product: 'midicircuit',
      location: 'product_page',
    });
  };
  return (
    <div>
      <ProductHero
        product='midicircuit'
        name='Midicircuit'
        tagline='Learn, Create, Share'
        description='A simple and approachable DAW in your pocket. Create beats, share songs with friends, and learn music. No experience needed. Circuits coming soon.'
        platforms='iPhone · iPad · Mac · Android'
        icon='/products/midicircuit/app-icon.png'
        color='#FF5C24'
        render='/products/midicircuit/marketing/mc-devices.webp'
        renderAlt='Midicircuit playgrounds running on Mac, iPad and iPhone'
        renderFit='wide'
        backdrop='/products/midicircuit/cover-photo-full-pixelated.jpg'
        appStoreUrl='https://apps.apple.com/us/app/midicircuit/id1558844679'
        googlePlayUrl='https://play.google.com/store/apps/details?id=com.yonkolevel.midicircuit'
      />

      {/* Promotional Video Section */}
      <PromotionalVideoSection
        videoSource='/products/midicircuit/videos/promo-video.mp4'
        // appName='MIDICIRCUIT'
        // appDescription='Experience the future of music creation with our innovative MIDI circuit builder. Design, connect, and play with virtual circuits that respond to your creativity in real-time.'
        // learnMoreLink='/products/midicircuit'
        // backgroundColor='#000000'
        overlayOpacity={0.4}
        showControls={true}
      />

      <ProductContentSection
        title='Playgrounds'
        description='A simple and approachable DAW that makes it easy to start creating. Record audio, lay down MIDI in real-time, mix your tracks, and export when you are ready. Comes loaded with sound packs from artists like 7th Wonder.'
        image='/products/midicircuit/marketing/mc-appstore-playgrounds.jpg'
        imageAlt='Midicircuit song view on iPhone: drop in beats, stack melodies, make it yours'
        backgroundColor='#F9FAFB'
        textColor='text-black'
        patternColor='#FF5C24'
        showPixelEffect
        reverse
      />

      <ProductContentSection
        title='Whenever, Wherever'
        description='Works on iPhone, iPad and Mac. Your projects sync across devices via iCloud. Pick up exactly where you left off.'
        image='/products/midicircuit/marketing/mc-appstore-anywhere.jpg'
        imageAlt='Midicircuit playgrounds on Mac: play freely, anywhere, anytime'
        backgroundColor='#F8FAFC'
        textColor='text-black'
        patternColor='#FF5C24'
        showPixelEffect
      />

      <ProductContentSection
        title='Now on Android'
        description='Midicircuit is on Google Play too, with the same Playgrounds, tracks and mixer. Start an idea on a phone and carry on wherever you make music.'
        image='/products/midicircuit/marketing/mc-song.webp'
        imageAlt='Midicircuit song view with drum, melodic and bass tracks on an Android phone'
        backgroundColor='#121212'
        textColor='text-white'
        patternColor='#FF5C24'
        showPixelEffect
        reverse
      />

      <ProductContentSection
        title='Apple Entrepreneur Camp Alumni'
        description={`We are honoured to have been selected as a mentee company at the Apple Entrepreneur Camp. We've learned so much from the best minds in tech, and are ready to take our app to the next level.`}
        image='/products/midicircuit/press/photo-team-1.jpg'
        imageAlt='Ricardo and Delcio at Apple Entrepreneur Camp'
        imageClassName='rounded-lg'
        backgroundColor='#F9FAFB'
        textColor='text-black'
        patternColor='#FF5C24'
        showPixelEffect
        reverse
      />

      {/* Testimonials Section */}
      <section className='bg-black'>
        <Container>
          <div className='py-[5rem] lg:py-[7rem]'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center mb-12'
            >
              <h2 className='font-pixel text-3xl md:text-4xl lg:text-5xl text-white mb-[1rem] uppercase tracking-wider'>
                What people say
              </h2>
            </motion.div>
            <div className='grid md:grid-cols-2 gap-[2rem] max-w-4xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='bg-[#1a1a1a] border border-white/10 p-[2rem] rounded-lg'
              >
                <p className='text-lg text-white mb-6 leading-relaxed'>
                  "This is the coolest, most impressive thing I've seen in a
                  LONG fucking time."
                </p>
                <div className='text-sm text-white/60'>
                  <p className='font-pixel font-semibold text-white mb-1 uppercase tracking-wider'>
                    Ken Wheeler
                  </p>
                  <p className='font-pixel text-xs uppercase tracking-wider mb-1'>
                    SOFTWARE DEVELOPER AND MUSIC PRODUCER
                  </p>
                  <p className='text-[#FF5C24] font-pixel text-xs uppercase tracking-wider'>
                    @KEN_WHEELER
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='bg-[#1a1a1a] border border-white/10 p-[2rem] rounded-lg'
              >
                <p className='text-lg text-white mb-6 leading-relaxed'>
                  "Love it. I like the integration with Push. This program would
                  be really helpful to use with my introductory electronic music
                  students."
                </p>
                <div className='text-sm text-white/60'>
                  <p className='font-pixel font-semibold text-white mb-1 uppercase tracking-wider'>
                    Brian Ellison
                  </p>
                  <p className='font-pixel text-xs uppercase tracking-wider mb-1'>
                    ELECTRONIC MUSIC EDUCATOR
                  </p>
                  <p className='text-[#FF5C24] font-pixel text-xs uppercase tracking-wider'>
                    @MUSICTECHED
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* App Store Section */}
      <section className='bg-black'>
        <Container>
          <div className='py-[5rem] lg:py-[7rem]'>
            <div className='flex w-full flex-wrap items-center justify-center gap-[1.25rem]'>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://apps.apple.com/us/app/midicircuit/id1558844679'
                className='inline-flex transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black'
                onClick={handleAppStoreClick}
              >
                <img
                  className='h-[3.25rem] w-auto'
                  src='/images/common/download-on-the-app-store.svg'
                  alt='Download on the App Store'
                />
              </a>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://play.google.com/store/apps/details?id=com.yonkolevel.midicircuit'
                className='inline-flex transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black'
                onClick={() =>
                  posthog?.capture('play_store_badge_clicked', {
                    product: 'midicircuit',
                    location: 'product_page',
                  })
                }
              >
                {/* Google's badge carries its own margin, so it sits a little taller to match */}
                <img
                  className='h-[4.5rem] w-auto'
                  src='/images/common/get-it-on-google-play.png'
                  alt='Get it on Google Play'
                />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
