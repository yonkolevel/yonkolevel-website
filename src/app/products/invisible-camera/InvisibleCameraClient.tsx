/* eslint-disable @next/next/no-img-element */
'use client';
import { motion } from 'framer-motion';
import ProductContentSection from '@/components/ProductContentSection';
import ProductHero from '@/components/ProductHero';
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
      <ProductHero
        product='invisible-camera'
        name='Invisible Camera'
        tagline='For Moments, Not Menus'
        description="Bypass Apple's Deep Fusion and Smart HDR for authentic, film-like photos. See exactly what you'll capture in real-time. No surprises, no post-processing. What you see is what you get."
        platforms='iPhone'
        icon='/products/invisible-camera/app-icon.png'
        color='#F3B23F'
        render='/products/invisible-camera/marketing/ic-viewfinder.webp'
        renderAlt='Invisible Camera viewfinder with the AMY film look, framing a street scene in Tokyo'
        renderFit='full'
        backdrop='/products/invisible-camera/cover-photo-full-pixelated.jpg'
        appStoreUrl='https://apps.apple.com/gb/app/invisible-camera/id6477348664'
      />

      <ProductContentSection
        title='Capture Life Instantly'
        description='Real-time preview with curated film looks inspired by classic film stocks. Apply filters before you shoot and get predictable results: same shot, same result, every time.'
        image='/products/invisible-camera/marketing/ic-mockup-2.webp'
        imageAlt='Invisible Camera viewfinder with the AMY film look, framing a studio session'
        backgroundColor='bg-white'
        textColor='text-black'
        patternColor='#F3B23F'
        showPixelEffect
      />

      <ProductContentSection
        title='Privacy First Design'
        description='Your photos never leave your device. No accounts, no cloud uploads. We collect anonymous usage analytics to improve the app. Nothing more.'
        image='/products/invisible-camera/marketing/ic-blue-frame.webp'
        imageAlt='Invisible Camera on iPhone with the viewfinder open'
        backgroundColor='bg-gray-50'
        textColor='text-black'
        patternColor='#F3B23F'
        showPixelEffect
        reverse
      />

      {/* App Store Section */}
      <section className='bg-black'>
        <Container>
          <div className='py-[5rem] lg:py-[7rem]'>
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
                  rel='noreferrer'
                  href='https://apps.apple.com/gb/app/invisible-camera/id6477348664'
                  className='inline-block'
                  onClick={handleAppStoreClick}
                >
                  <img
                    className='inline-block transition-opacity hover:opacity-80'
                    src='/images/common/download-on-the-app-store.svg'
                    alt='Download on the App Store'
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
