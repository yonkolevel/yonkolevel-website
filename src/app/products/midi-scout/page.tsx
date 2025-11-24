/* eslint-disable @next/next/no-img-element */
'use client';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import Container from '@/components/Container';
import ProductImageSection from '@/components/ProductImageSection';
import * as React from 'react';

interface IAboutUsPageProps {}

const AboutUsPage: React.FunctionComponent<IAboutUsPageProps> = (props) => {
  return (
    <div>
      {/* Hero Section */}
      <section className='bg-black relative overflow-hidden'>
          <Container>
          <div className='py-24 md:py-32 lg:py-40'>
            <div className='text-center flex flex-col justify-center items-center'>
              {/* App Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='mb-12'
              >
                <img
                  width={200}
                  height={200}
                  src='/products/midi-scout/icon.png'
                  alt='MIDI Scout app icon'
                  className='drop-shadow-2xl'
                />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className='font-pixel text-4xl md:text-5xl lg:text-6xl text-white text-center mb-6 uppercase tracking-wider'
              >
                Debug MIDI events{' '}
                <span className='text-[#FF5C24]'>Faster & Smarter</span> with
                MIDIScout
              </motion.h1>

              {/* Download Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className='text-center flex justify-center w-full mt-12'
              >
                <div className='w-full max-w-[320px]'>
                <Button variant='primary' className='w-full'>
                    <a
                      target='_blank'
                      href='/midi-scout/downloads/midiscout.zip'
                      className='block w-full'
                    >
                    Download for macOS
                  </a>
                </Button>
              </div>
              </motion.div>
            </div>
            </div>
          </Container>
      </section>

      {/* Promo Graphic Section */}
      <ProductImageSection
        image='/products/midi-scout/promo-graphic.png'
        imageAlt='Screenshot of MIDI Scout with details of key features'
        backgroundColor='#121212'
        showPixelEffect
      />
    </div>
  );
};

export default AboutUsPage;
