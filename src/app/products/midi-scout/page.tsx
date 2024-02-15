/* eslint-disable @next/next/no-img-element */
import Button from '@/components/Button';
import Container from '@/components/Container';
import * as React from 'react';

interface IAboutUsPageProps {}

const AboutUsPage: React.FunctionComponent<IAboutUsPageProps> = (props) => {
  return (
    <div>
      <section className='bg-black'>
        <div className='py-16'>
          <Container>
            <div className='pb-40 text-center flex flex-col justify-center items-center'>
              <div>
                <img
                  width={200}
                  src='/images/products/midi-scout/icon.png'
                  alt='midiscout app icon'
                />
              </div>
            </div>
            <div className='pb-10'>
              <h1 className='font-body font-bold text-3xl text-white text-center'>
                Debug MIDI events{' '}
                <span className='text-orange'>Faster & Smarter</span> with
                MIDIScout
              </h1>
            </div>
            <div className='text-center flex justify-center w-full pb-60'>
              <div className='w-[320px]'>
                <Button variant='primary' className='w-full'>
                  <a target='_blank' href='/midi-scout/downloads/midiscout.zip'>
                    Download for macOS
                  </a>
                </Button>
              </div>
            </div>
            <div>
              <img
                className='shadow'
                src='/images/products/midi-scout/promo-graphic.png'
                alt='Screenshot of MIDI Scout with details of key features.'
              />
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
