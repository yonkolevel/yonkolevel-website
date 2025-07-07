/* eslint-disable @next/next/no-img-element */
import ProductHeroSection from '@/components/ProductHeroSection';
import ProductDescriptionSection from '@/components/ProductDescriptionSection';
import ProductAppIcon from '@/components/ProductAppIcon';
import Container from '@/components/Container';
import * as React from 'react';
import Header from '@/components/Header';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = (props) => {
  return (
    <div>
      <div className='relative'>
        <ProductHeroSection
          className='bg-white'
          heroImage='/products/invisible-camera/cover-photo-full.jpeg'
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
