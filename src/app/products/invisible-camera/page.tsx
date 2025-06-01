
/* eslint-disable @next/next/no-img-element */
import Container from '@/components/Container';
import * as React from 'react';

interface PageProps { }

const Page: React.FunctionComponent<PageProps> = (props) => {
  return (
    <div>
      <section className='bg-white'>
        <div className='py-16'>
          <Container>
            <div className='pb-32 text-center flex flex-col justify-center items-center'>
              <div>
                <img
                  width={200}
                  src='/images/products/invisible-camera/app-icon.png'
                  alt='Invisible Camera app icon'
                />
              </div>
            </div>
            <div className='pb-10'>
              <h1 className='font-body font-bold text-3xl text-black text-center'>
                Invisible Camera: <span className='text-orange'>what you see is what you get!</span>
              </h1>
            </div>
            <div className='text-center flex justify-center w-full pb-60'>
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
          </Container>
        </div>
      </section>
    </div>
  );
};

export default Page;
