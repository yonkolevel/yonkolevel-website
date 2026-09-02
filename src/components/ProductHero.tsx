'use client';

import Image from 'next/image';
import * as React from 'react';
import { usePostHog } from 'posthog-js/react';
import Container from './Container';
import PixelPanel from './PixelPanel';

/**
 * Product page hero, in the same language as the homepage showcase and the
 * Studio page: the copy and store badges on the left, the current device
 * render on a solid colour panel that sheds a few pixels on the right. The
 * old pixelated cover photograph stays on as a dim backdrop.
 */
export default function ProductHero({
  product,
  name,
  tagline,
  description,
  platforms,
  icon,
  color,
  render,
  renderAlt,
  renderFit = 'tall',
  backdrop,
  appStoreUrl,
  googlePlayUrl,
}: {
  /** analytics id, e.g. 'midicircuit' */
  product: string;
  name: string;
  tagline: string;
  description: string;
  platforms: string;
  icon: string;
  color: string;
  render: string;
  renderAlt: string;
  renderFit?: 'tall' | 'wide';
  backdrop?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
}) {
  const posthog = usePostHog();

  return (
    <section className='relative overflow-hidden bg-black text-white'>
      {backdrop && (
        <div
          aria-hidden='true'
          className='absolute inset-0 opacity-[0.16]'
          style={{
            backgroundImage: `url(${backdrop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <Container>
        <div className='relative grid grid-cols-1 items-center gap-y-[3rem] py-[5rem] md:grid-cols-2 md:gap-x-[3rem] lg:min-h-[85vh] lg:gap-x-[5rem] lg:py-[7rem]'>
          <div>
            <div className='flex items-center gap-[1rem]'>
              <Image
                src={icon}
                alt=''
                aria-hidden='true'
                width={64}
                height={64}
                className='h-16 w-16 rounded-[14px]'
              />
              <p className='font-pixel text-xs uppercase tracking-[0.22em] text-orange'>
                {'// '}
                {platforms}
              </p>
            </div>

            <h1 className='mt-[2rem] font-pixel text-3xl uppercase leading-tight tracking-tight lg:text-4xl xl:text-5xl'>
              {name}
            </h1>
            <p className='mt-[1rem] font-pixel text-base uppercase tracking-[0.12em] text-white/60 md:text-lg'>
              {tagline}
            </p>
            <p className='mt-[2rem] max-w-xl text-base leading-8 text-white/70 md:text-lg'>
              {description}
            </p>

            {(appStoreUrl || googlePlayUrl) && (
              <div className='mt-[2.5rem] flex flex-wrap items-center gap-[1.25rem]'>
                {appStoreUrl && (
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href={appStoreUrl}
                    className='inline-flex transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black'
                    onClick={() =>
                      posthog?.capture('app_store_badge_clicked', {
                        product,
                        location: 'product_hero',
                      })
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className='h-[3.25rem] w-auto'
                      src='/images/common/download-on-the-app-store.svg'
                      alt='Download on the App Store'
                    />
                  </a>
                )}
                {googlePlayUrl && (
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href={googlePlayUrl}
                    className='inline-flex transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black'
                    onClick={() =>
                      posthog?.capture('play_store_badge_clicked', {
                        product,
                        location: 'product_hero',
                      })
                    }
                  >
                    {/* Google's badge carries its own margin, so it sits a little taller to match */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className='h-[4.5rem] w-auto'
                      src='/images/common/get-it-on-google-play.png'
                      alt='Get it on Google Play'
                    />
                  </a>
                )}
              </div>
            )}
          </div>

          <PixelPanel
            color={color}
            side='right'
            className={
              renderFit === 'wide'
                ? 'min-h-[260px] sm:min-h-[340px] lg:min-h-[480px]'
                : 'min-h-[340px] sm:min-h-[420px] lg:min-h-[560px]'
            }
            contentClassName='absolute inset-0 z-40 overflow-hidden'
            displacements={[
              { row: 0, col: 1, displaceX: 0, displaceY: -1 },
              { row: 0, col: -1, displaceX: 2, displaceY: -1 },
              { row: -1, col: -2, displaceX: 1, displaceY: 2 },
              { row: -1, col: 2, displaceX: 0, displaceY: 3 },
            ]}
          >
            <div
              className={
                renderFit === 'wide'
                  ? 'absolute inset-5 sm:inset-8'
                  : 'absolute inset-x-0 -bottom-[18%] top-[2.5rem] sm:top-12'
              }
            >
              <Image
                src={render}
                alt={renderAlt}
                fill
                priority
                sizes='(min-width: 720px) 50vw, 100vw'
                className={
                  renderFit === 'wide'
                    ? 'object-contain object-center'
                    : 'object-contain object-top'
                }
              />
            </div>
          </PixelPanel>
        </div>
      </Container>
    </section>
  );
}
