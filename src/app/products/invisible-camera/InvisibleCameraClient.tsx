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
import { usePostHog } from 'posthog-js/react';

export default function InvisibleCameraClient() {
  const posthog = usePostHog();

  const handleAppStoreClick = () => {
    posthog?.capture('app_store_badge_clicked', {
      product: 'invisible-camera',
      location: 'product_page',
    });
  };
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
          description="Bypass Apple's Deep Fusion and Smart HDR for authentic, film-like photos. See exactly what you'll capture in real-time — no surprises, no post-processing. What you see is what you get."
          backgroundColor='#FBBF2A'
          textColor='text-black'
          patternColor='#F3B23F'
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
        description='Real-time preview with curated film looks inspired by classic film stocks. Apply filters before you shoot and get predictable results — same shot, same result, every time.'
        image='/products/invisible-camera/app-store-1.png'
        imageAlt='App interface showing simple camera view'
        backgroundColor='bg-white'
        textColor='text-black'
        patternColor='#F3B23F'
        showPixelEffect
      />

      <ProductContentSection
        title='Privacy First Design'
        description='Your photos never leave your device. No accounts, no cloud uploads. We collect anonymous usage analytics to improve the app — nothing more.'
        image='/products/invisible-camera/app-store-3.png'
        imageAlt='Privacy features interface'
        backgroundColor='bg-gray-50'
        textColor='text-black'
        patternColor='#F3B23F'
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
                <a
                  target='_blank'
                  href=''
                  className='inline-block'
                  onClick={handleAppStoreClick}
                >
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
}



