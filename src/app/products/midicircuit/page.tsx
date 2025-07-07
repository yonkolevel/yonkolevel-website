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
            appIconAlt='Invisible Camera app icon'
          />
        </div>

        <ProductDescriptionSection
          title='For Moments, Not Menus'
          description="What you see is what you get. A camera app designed for capturing life's spontaneous moments without the complexity of endless menus and settings. Simply point, shoot, and let the magic happen."
          backgroundColor='#FF5C24'
          textColor='text-black'
          showPixelEffect
        />
      </div>

      <ProductImageSection
        image='/products/midicircuit/ic-app-store-preview.png'
        imageAlt='Invisible Camera app screenshot'
        backgroundColor='#FF5C24'
        showPixelEffect
      />

      <ProductContentSection
        title='Capture Life Instantly'
        description='No complex settings, no overwhelming options. Just open the app and start capturing. Invisible Camera strips away the clutter to give you the purest photography experience possible.'
        image='/products/midicircuit/ic-app-store-preview.png'
        imageAlt='App interface showing simple camera view'
        backgroundColor='bg-white'
        textColor='text-black'
        showPixelEffect
      />

      <ProductContentSection
        title='Privacy First Design'
        description='Your photos stay yours. Built with privacy at its core, Invisible Camera ensures your memories remain secure while delivering an exceptional user experience.'
        image='/products/midicircuit/ic-app-store-preview.png'
        imageAlt='Privacy features interface'
        backgroundColor='bg-gray-50'
        textColor='text-black'
        showPixelEffect
        reverse
      />

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
