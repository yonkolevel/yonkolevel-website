/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'Press Kit - Invisible Camera | Yonko Level',
  description: 'Press kit and media resources for the Invisible Camera app.',
};

export default function InvisibleCameraPressPage() {
  return (
    <div>
      <section className='bg-white'>
        <div className='py-16'>
          <Container>
            <div className='pb-16 text-center flex flex-col justify-center items-center'>
              <div>
                <img
                  width={120}
                  src='/products/invisible-camera/app-icon.png'
                  alt='Invisible Camera app icon'
                />
              </div>
            </div>
            <div className='max-w-4xl mx-auto'>
              <div className='pb-10 text-center'>
                <h1 className='font-body font-bold text-3xl text-black'>
                  Press Kit
                </h1>
              </div>
              <div className='prose prose-lg text-gray-700 text-center'>
                <p className='text-gray-400'>Coming soon.</p>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}
