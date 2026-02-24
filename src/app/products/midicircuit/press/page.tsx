/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'Press Kit - Midicircuit | Yonko Level',
  description:
    'Press kit and media resources for the Midicircuit app. Download logos, screenshots, photos, and learn about Midicircuit.',
};

const iosScreenshots = [
  { src: '/products/midicircuit/press/screenshot-ios-1.jpg', alt: 'Midicircuit iOS - Main view' },
  { src: '/products/midicircuit/press/screenshot-ios-2.jpg', alt: 'Midicircuit iOS - Tracks view' },
  { src: '/products/midicircuit/press/screenshot-ios-3.jpg', alt: 'Midicircuit iOS - Grid view' },
  { src: '/products/midicircuit/press/screenshot-ios-4.jpg', alt: 'Midicircuit iOS - Mixer view' },
];

const macosScreenshots = [
  { src: '/products/midicircuit/press/screenshot-macos-1.jpg', alt: 'Midicircuit macOS - Main view' },
  { src: '/products/midicircuit/press/screenshot-macos-2.jpg', alt: 'Midicircuit macOS - Tracks view' },
  { src: '/products/midicircuit/press/screenshot-macos-3.jpg', alt: 'Midicircuit macOS - Grid view' },
  { src: '/products/midicircuit/press/screenshot-macos-4.jpg', alt: 'Midicircuit macOS - Mixer view' },
];

const photos = [
  { src: '/products/midicircuit/press/photo-team-1.jpg', alt: 'Ricardo and Delcio at Second Home London' },
  { src: '/products/midicircuit/press/photo-team-2.jpg', alt: 'Ricardo and Delcio at Second Home London' },
  { src: '/products/midicircuit/press/photo-app-tracks.jpg', alt: 'Midicircuit app showing tracks on phone' },
  { src: '/products/midicircuit/press/photo-app-grid.jpg', alt: 'Midicircuit app close-up grid view' },
  { src: '/products/midicircuit/press/photo-app-piano.jpg', alt: 'Hand holding phone with Midicircuit piano view' },
  { src: '/products/midicircuit/press/photo-ricardo.jpg', alt: 'Ricardo, co-founder of Yonko Level' },
];

const factSheet = [
  { label: 'App', value: 'Midicircuit' },
  { label: 'Tagline', value: 'Learn, Create, Share' },
  {
    label: 'Description',
    value:
      'A simple and approachable DAW in your pocket. Create beats, share songs with friends, and learn music — no experience needed.',
  },
  { label: 'Platforms', value: 'iOS, iPad, macOS' },
  { label: 'Developer', value: 'Yonko Level' },
  { label: 'Website', value: 'yonkolevel.com/products/midicircuit', href: 'https://yonkolevel.com/products/midicircuit' },
];

const features = [
  'Simple and approachable beat-making',
  'Record audio and lay down MIDI in real time',
  'Mix tracks and export songs',
  'Sound packs from artists like 7th Wonder',
  'iCloud sync across iPhone, iPad, and Mac',
  'Apple Entrepreneur Camp alumni',
];

export default function MidicircuitPressPage() {
  return (
    <div>
      <section className='bg-white'>
        <div className='py-16'>
          <Container>
            {/* Header */}
            <div className='pb-16 text-center flex flex-col justify-center items-center'>
              <div>
                <img
                  width={120}
                  src='/products/midicircuit/app-icon.png'
                  alt='Midicircuit app icon'
                />
              </div>
            </div>
            <div className='max-w-4xl mx-auto'>
              <div className='pb-10 text-center'>
                <h1 className='font-body font-bold text-3xl text-black'>
                  Press Kit
                </h1>
              </div>

              <div className='space-y-16'>
                {/* About */}
                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>About</h2>
                  <div className='grid grid-cols-[auto_1fr] gap-x-6 gap-y-3'>
                    {factSheet.map(({ label, value, href }) => (
                      <div key={label} className='contents'>
                        <dt className='text-gray-500 font-medium'>{label}</dt>
                        <dd className='text-black'>
                          {href ? (
                            <a
                              href={href}
                              className='text-blue-600 underline'
                            >
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </dd>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Key Features */}
                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>
                    Key Features
                  </h2>
                  <ul className='list-disc pl-6 space-y-2 text-gray-700'>
                    {features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </section>

                {/* About Yonko Level */}
                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>
                    About Yonko Level
                  </h2>
                  <p className='text-gray-700 italic mb-4'>
                    Apps that make you smile.
                  </p>
                  <p className='text-gray-700'>
                    Founded in 2020 by Ricardo Abreu, Yonko Level is an
                    independent studio building delightful apps and digital
                    experiences. We are designers and developers who work as
                    friends — nakama — combining trust, communication, and a
                    shared love for making creative tools that are simple and
                    accessible. We are proud Apple Entrepreneur Camp alumni.
                  </p>
                </section>

                {/* Logos */}
                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Logos</h2>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <img
                      src='/products/midicircuit/press/logo-color.svg'
                      alt='Yonko Level logo (color)'
                      className='h-16'
                    />
                    <img
                      src='/products/midicircuit/press/logo-black.svg'
                      alt='Yonko Level logo (black)'
                      className='h-16'
                    />
                  </div>
                </section>

                {/* Screenshots - iOS */}
                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>
                    Screenshots
                  </h2>
                  <h3 className='font-semibold text-lg text-black mb-3'>iOS</h3>
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                    {iosScreenshots.map((screenshot) => (
                      <img
                        key={screenshot.src}
                        src={screenshot.src}
                        alt={screenshot.alt}
                        className='rounded-lg w-full'
                      />
                    ))}
                  </div>

                  <h3 className='font-semibold text-lg text-black mb-3 mt-8'>
                    macOS
                  </h3>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {macosScreenshots.map((screenshot) => (
                      <img
                        key={screenshot.src}
                        src={screenshot.src}
                        alt={screenshot.alt}
                        className='rounded-lg w-full'
                      />
                    ))}
                  </div>
                </section>

                {/* Photos */}
                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>Photos</h2>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {photos.map((photo) => (
                      <img
                        key={photo.src}
                        src={photo.src}
                        alt={photo.alt}
                        className='rounded-lg w-full'
                      />
                    ))}
                  </div>
                </section>

                {/* Download Assets */}
                <section className='text-center'>
                  <h2 className='font-bold text-xl text-black mb-4'>
                    Download Assets
                  </h2>
                  <p className='text-gray-700 mb-6'>
                    Download the full media kit including high-resolution logos,
                    screenshots, and photos.
                  </p>
                  <a
                    href='https://drive.google.com/drive/folders/1sI_eXYnUwOqr32tyMww5PSB_phytKR8S?usp=drive_link'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-block bg-black text-white font-pixel text-sm tracking-wider px-8 py-3 rounded-md hover:bg-black/80 transition-colors'
                  >
                    DOWNLOAD ASSETS
                  </a>
                </section>

                {/* Contact */}
                <section>
                  <h2 className='font-bold text-xl text-black mb-4'>
                    Contact
                  </h2>
                  <p className='text-gray-700'>
                    For press inquiries, please contact us at:
                  </p>
                  <div className='bg-gray-50 p-4 rounded-lg mt-4'>
                    <p className='font-mono text-sm'>
                      team@yonkolevel.com
                      <br />
                      Yonko Level
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}
