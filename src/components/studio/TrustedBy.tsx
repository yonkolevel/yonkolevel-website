import * as React from 'react';
import Container from '@/components/Container';

/**
 * Companies Yonko Level has been contracted by. Each mark is the company's own
 * logo used as a CSS mask and filled with a single tone, so the row reads as
 * one monochrome set rather than five brands shouting in their own colours.
 * Sizes are per mark: an italic stacked mark and a long wordmark need
 * different heights to look the same weight.
 */
const companies = [
  { name: 'ustwo', src: '/images/logos/ustwo.svg', width: 94, height: 28 },
  {
    name: 'Babylon Health',
    src: '/images/logos/babylon-health.png',
    width: 108,
    height: 27,
  },
  { name: 'Etermar', src: '/images/logos/etermar.svg', width: 134, height: 26 },
  { name: 'Planes', src: '/images/logos/planes.svg', width: 72, height: 32 },
  { name: 'Alteam', src: '/images/logos/alteam.svg', width: 104, height: 26 },
] as const;

export default function TrustedBy() {
  return (
    <section className='bg-black' aria-labelledby='trusted-by-title'>
      <Container>
        <div className='flex flex-col gap-[1.75rem] border-t border-white/10 pb-[5rem] pt-[2.5rem] md:pb-[7rem] lg:flex-row lg:items-center lg:gap-[4rem] lg:pb-[10rem] lg:pt-[3rem]'>
          <h2
            id='trusted-by-title'
            className='shrink-0 font-pixel text-xs uppercase tracking-[0.22em] text-orange'
          >
            {'// TRUSTED BY'}
          </h2>
          <ul
            role='list'
            className='flex flex-wrap items-center gap-x-[2.75rem] gap-y-[1.25rem] text-white/55'
          >
            {companies.map(({ name, src, width, height }) => (
              <li key={name} className='flex items-center'>
                <span
                  role='img'
                  aria-label={name}
                  className='block bg-current'
                  style={{
                    width,
                    height,
                    WebkitMaskImage: `url(${src})`,
                    maskImage: `url(${src})`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
