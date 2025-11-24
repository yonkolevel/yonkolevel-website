/* eslint-disable @next/next/no-img-element */
'use client';
import { motion } from 'framer-motion';
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
          heroImage='/products/invisible-camera/cover-photo-full-pixelated.jpg'
        />

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
          <ProductAppIcon
            appIcon='/products/invisible-camera/app-icon.png'
            appIconAlt='Invisible Camera app icon'
          />
        </div>

        <ProductDescriptionSection
          title='For Moments, Not Menus'
          description="What you see is what you get. A camera app designed for capturing life's spontaneous moments without the complexity of endless menus and settings. Simply point, shoot, and let the magic happen."
          backgroundColor='#FBBF2A'
          textColor='text-black'
          showPixelEffect
        />
      </div>

      <ProductImageSection
        image='/products/invisible-camera/app-store-2.png'
        imageAlt='Invisible Camera app screenshot'
        backgroundColor='#FBBF2A'
        showPixelEffect
      />

      <ProductContentSection
        title='Capture Life Instantly'
        description='No complex settings, no overwhelming options. Just open the app and start capturing. Invisible Camera strips away the clutter to give you the purest photography experience possible.'
        image='/products/invisible-camera/app-store-1.png'
        imageAlt='App interface showing simple camera view'
        backgroundColor='bg-white'
        textColor='text-black'
        showPixelEffect
      />

      <ProductContentSection
        title='Privacy First Design'
        description='Your photos stay yours. Built with privacy at its core, Invisible Camera ensures your memories remain secure while delivering an exceptional user experience.'
        image='/products/invisible-camera/app-store-3.png'
        imageAlt='Privacy features interface'
        backgroundColor='bg-gray-50'
        textColor='text-black'
        showPixelEffect
        reverse
      />

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
