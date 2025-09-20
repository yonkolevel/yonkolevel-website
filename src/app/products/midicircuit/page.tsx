/* eslint-disable @next/next/no-img-element */
import ProductHeroSection from '@/components/ProductHeroSection';
import ProductDescriptionSection from '@/components/ProductDescriptionSection';
import ProductImageSection from '@/components/ProductImageSection';
import ProductContentSection from '@/components/ProductContentSection';
import ProductAppIcon from '@/components/ProductAppIcon';
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
          textColor='text-black'
          showPixelEffect
        />
      </div>

      <ProductImageSection
        image='/products/midicircuit/midicircuit-preview-1.png'
        imageAlt='MidiCircuit app interface showing musical grid'
        backgroundColor='#FF5C24'
        showPixelEffect
      />

      <ProductContentSection
        title='Learn'
        description='Delve into the fascinating world of music concepts and theories with Circuits. Practice musical patterns with instant feedback and challenge yourself with engaging lessons that make learning accessible and fun.'
        image='/products/midicircuit/midicircuit-preview-1.png'
        imageAlt='MidiCircuit Circuits for learning music'
        backgroundColor='bg-white'
        textColor='text-black'
        showPixelEffect
      />

      <ProductContentSection
        title='Playgrounds'
        description='Discover the potential of your creativity in Playgrounds, where you can unleash your imagination and give birth to new sounds and melodies. Our DAW experience is designed to be intuitive, making it easy for you to explore, create, and share your sonic masterpieces with your friends.'
        image='/products/midicircuit/midicircuit-preview-1.png'
        imageAlt='MidiCircuit Playgrounds creative DAW'
        backgroundColor='bg-gray-50'
        textColor='text-black'
        showPixelEffect
        reverse
      />

      <ProductContentSection
        title='Whenever, Wherever'
        description='Midicircuit is your trusty sidekick, ready to groove on any iOS and macOS device. Learn and create your beats and harmonies whenever and wherever the creativity strikes.'
        image='/products/midicircuit/midicircuit-preview-1.png'
        imageAlt='MidiCircuit on iOS and macOS devices'
        backgroundColor='bg-white'
        textColor='text-black'
        showPixelEffect
      />

      <ProductContentSection
        title='Apple Entrepreneur Camp Alumni'
        description={`We are honoured to have been selected as a mentee company at the Apple Entrepreneur Camp. We've learned so much from the best minds in tech, and are ready to take our app to the next level.`}
        image='/products/midicircuit/midicircuit-preview-1.png'
        imageAlt='Apple Entrepreneur Camp recognition'
        backgroundColor='bg-gray-50'
        textColor='text-black'
        showPixelEffect
        reverse
      />

      {/* Testimonials Section */}
      <section className='bg-white'>
        <Container>
          <div className='py-16'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-black mb-4'>
                What people say
              </h2>
            </div>
            <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
              <div className='bg-gray-50 p-8 rounded-lg'>
                <p className='text-lg text-black mb-4'>
                  "This is the coolest, most impressive thing I've seen in a
                  LONG fucking time."
                </p>
                <div className='text-sm text-gray-600'>
                  <p className='font-semibold'>Ken Wheeler</p>
                  <p>SOFTWARE DEVELOPER AND MUSIC PRODUCER</p>
                  <p className='text-blue-600'>@KEN_WHEELER</p>
                </div>
              </div>
              <div className='bg-gray-50 p-8 rounded-lg'>
                <p className='text-lg text-black mb-4'>
                  "Love it. I like the integration with Push. This program would
                  be really helpful to use with my introductory electronic music
                  students."
                </p>
                <div className='text-sm text-gray-600'>
                  <p className='font-semibold'>Brian Ellison</p>
                  <p>ELECTRONIC MUSIC EDUCATOR</p>
                  <p className='text-blue-600'>@MUSICTECHED</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* App Store Section */}
      <section className='bg-white'>
        <Container>
          <div className='py-16'>
            <div className='text-center flex justify-center w-full'>
              <div className='w-[320px]'>
                <a target='_blank' href=''>
                  <img
                    className='inline-block mr-2'
                    src='/images/common/badge-pre-order-on-the-app-store.svg'
                    alt='Apple pre-order badge'
                  />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Page;
