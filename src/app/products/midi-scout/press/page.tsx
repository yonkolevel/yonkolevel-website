/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'Press Kit - MIDI Scout | Yonko Level',
  description: 'Press kit and media resources for the MIDI Scout app.',
};

export default function MidiScoutPressPage() {
  return (
    <div>
      <section className='bg-white'>
        <div className='py-16'>
          <Container>
            <div className='pb-16 text-center flex flex-col justify-center items-center'>
              <div>
                <img
                  width={120}
                  src='/products/midi-scout/icon.png'
                  alt='MIDI Scout app icon'
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
