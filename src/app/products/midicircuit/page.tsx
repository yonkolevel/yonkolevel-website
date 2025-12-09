/* eslint-disable @next/next/no-img-element */
'use client';
import { motion } from 'framer-motion';
import ProductHeroSection from '@/components/ProductHeroSection';
import ProductDescriptionSection from '@/components/ProductDescriptionSection';
import ProductImageSection from '@/components/ProductImageSection';
import ProductContentSection from '@/components/ProductContentSection';
import ProductAppIcon from '@/components/ProductAppIcon';
import PromotionalVideoSection from '@/components/PromotionalVideoSection';
import Container from '@/components/Container';
import * as React from 'react';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = (props) => {
  return (
    <div>
      <div className='relative'>
        <ProductHeroSection
          className='bg-white'
          heroImage='/products/midicircuit/cover-photo-full-pixelated.jpg'
        />

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
          <ProductAppIcon
            appIcon='/products/midicircuit/app-icon.png'
            appIconAlt='MidiCircuit app icon'
          />
        </div>

        <ProductDescriptionSection
          title='Learn, Create, Share'
          description='Midicircuit takes you on a musical journey with our Circuits, offering engaging lessons and challenges. Plus, our Playgrounds give you the space to express your creativity and share your music with the world.'
          backgroundColor='#FF5C24'
          textColor='text-white'
          patternColor='#FFFFFF'
          showPixelEffect
        />
      </div>

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
        description='Discover the potential of your creativity in Playgrounds, where you can unleash your imagination and give birth to new sounds and melodies. Our DAW experience is designed to be intuitive, making it easy for you to explore, create, and share your sonic masterpieces with your friends.'
        image='/products/midicircuit/app-store-6.png'
        imageAlt='MidiCircuit Playgrounds creative DAW'
        backgroundColor='bg-gray-50'
        textColor='text-black'
        patternColor='#FF5C24'
        showPixelEffect
        reverse
      />

      <ProductContentSection
        title='Whenever, Wherever'
        description='Midicircuit is your trusty sidekick, ready to groove on any iOS and macOS device. Learn and create your beats and harmonies whenever and wherever the creativity strikes.'
        image='/products/midicircuit/midicircuit-multi-platform.png'
        imageAlt='MidiCircuit on iOS and macOS devices'
        backgroundColor='bg-white'
        textColor='text-black'
        patternColor='#FF5C24'
        showPixelEffect
      />

      <ProductContentSection
        title='Apple Entrepreneur Camp Alumni'
        description={`We are honoured to have been selected as a mentee company at the Apple Entrepreneur Camp. We've learned so much from the best minds in tech, and are ready to take our app to the next level.`}
        image='/images/other/apple-logo.svg'
        imageAlt='Apple Entrepreneur Camp recognition'
        backgroundColor='bg-gray-50'
        textColor='text-black'
        patternColor='#FF5C24'
        showPixelEffect
        reverse
      />

      {/* Testimonials Section */}
      <section className='bg-black'>
        <Container>
          <div className='py-16 lg:py-24'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center mb-12'
            >
              <h2 className='font-pixel text-3xl md:text-4xl lg:text-5xl text-white mb-4 uppercase tracking-wider'>
                What people say
              </h2>
            </motion.div>
            <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='bg-[#1a1a1a] border border-white/10 p-8 rounded-lg'
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
                className='bg-[#1a1a1a] border border-white/10 p-8 rounded-lg'
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
          <div className='py-16 lg:py-24'>
            <div className='text-center flex justify-center w-full'>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='w-[320px]'
              >
                <a target='_blank' href='' className='inline-block'>
                  <img
                    className='inline-block transition-opacity hover:opacity-80'
                    src='/images/common/badge-pre-order-on-the-app-store.svg'
                    alt='Apple pre-order badge'
                  />
                </a>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Page;
