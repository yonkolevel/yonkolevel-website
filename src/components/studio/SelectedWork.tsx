'use client';

import Image from 'next/image';
import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import Container from '@/components/Container';
import { BODY, HEADING, LABEL, SUBHEAD } from '@/lib/typography';

/* ----------------------------------------------------------------- content */

/**
 * Client projects, each shown as a capture of the live site framed as a
 * browser window. Captures are 1920x1200 so every slide shares one aspect
 * ratio. The label names our part and the tool it was built with; the
 * description describes the client in their own words, from their metadata
 * or hero copy, and stays within three lines on desktop.
 */
const projects = [
  {
    name: 'Christie’s',
    work: 'DEVELOPMENT',
    tool: 'SITECORE',
    description:
      'A world-leading art and luxury auction house, trusted for live and online auctions and private sales.',
    href: 'https://www.christies.com/en',
    domain: 'christies.com',
    image: '/images/studio/work/christies.webp',
  },
  {
    name: 'Etermar',
    work: 'DEVELOPMENT',
    tool: 'NEXT.JS',
    description:
      'A leading European marine engineering company in port works, dredging and submarine pipelines.',
    href: 'https://www.etermar.pt/',
    domain: 'etermar.pt',
    image: '/images/studio/work/etermar.webp',
  },
  {
    name: 'Rule 30',
    work: 'DEVELOPMENT',
    tool: 'WEBFLOW',
    description:
      'An AI research lab building systematic strategies to identify and back outlier founders at scale.',
    href: 'https://www.rule30.vc/',
    domain: 'rule30.vc',
    image: '/images/studio/work/rule30.webp',
  },
] as const;

/** Seconds a slide rests before the carousel moves on by itself. */
const ROTATE_SECONDS = 6;

/* -------------------------------------------------------------- primitives */

/** A pixel arrow for the previous and next buttons, drawn on a 5x5 grid. */
function Arrow({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg
      viewBox='0 0 5 5'
      aria-hidden='true'
      className={`h-[0.75rem] w-[0.75rem] ${direction === 'previous' ? '-scale-x-100' : ''}`}
      shapeRendering='crispEdges'
      fill='currentColor'
    >
      <path d='M2 0h1v1H2zM3 1h1v1H3zM0 2h5v1H0zM3 3h1v1H3zM2 4h1v1H2z' />
    </svg>
  );
}

/**
 * Where each slide sits within the track's scroll. offsetLeft is measured from
 * the nearest positioned ancestor, not the track, so it is taken relative to
 * the first slide.
 */
function slideOffsets(node: HTMLElement) {
  const slides = Array.from(node.children) as HTMLElement[];
  const origin = slides[0]?.offsetLeft ?? 0;
  return slides.map((slide) => slide.offsetLeft - origin);
}

/* ------------------------------------------------------------------- page */

export default function SelectedWork() {
  const prefersReducedMotion = useReducedMotion();
  const track = React.useRef<HTMLUListElement>(null);
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const goTo = React.useCallback((index: number) => {
    const node = track.current;
    if (!node) return;

    const wrapped = (index + projects.length) % projects.length;
    node.scrollTo({ left: slideOffsets(node)[wrapped] ?? 0, behavior: 'smooth' });
  }, []);

  // the active slide follows the scroll position, so swiping, the buttons and
  // the timer all move through one path
  const handleScroll = () => {
    const node = track.current;
    if (!node) return;

    const offsets = slideOffsets(node);
    const nearest = offsets.reduce(
      (best, offset, index) =>
        Math.abs(offset - node.scrollLeft) <
        Math.abs(offsets[best] - node.scrollLeft)
          ? index
          : best,
      0,
    );
    setActive(nearest);
  };

  // only rotate while the carousel is on screen
  React.useEffect(() => {
    const node = track.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // rotation stops for reduced motion, and waits while the visitor is
  // hovering, focused inside or looking at another part of the page
  React.useEffect(() => {
    if (prefersReducedMotion || paused || !visible) return;

    const timer = window.setTimeout(
      () => goTo(active + 1),
      ROTATE_SECONDS * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [active, goTo, paused, prefersReducedMotion, visible]);

  const rotating = !prefersReducedMotion && !paused && visible;

  return (
    <section
      className='overflow-hidden bg-black py-[5rem] md:py-[7rem] lg:py-[10rem]'
      aria-labelledby='selected-work-title'
    >
      <Container>
        <div className='border-t border-white/10 pt-[4rem] lg:pt-[6rem]'>
          {/* ---------------------------------------------------------- HEAD */}
          <div className='flex flex-col gap-[2.5rem] md:flex-row md:items-end md:justify-between'>
            <div className='max-w-3xl'>
              <p className={`mb-5 ${LABEL} text-orange`}>SELECTED WORK</p>
              <h2
                id='selected-work-title'
                className={`${HEADING} uppercase text-white`}
              >
                Client work
              </h2>
              <p className={`mt-10 ${BODY} text-white/70`}>
                A few of the projects we’ve worked on with clients.
              </p>
            </div>

            <div className='flex shrink-0 items-center gap-[1.25rem]'>
              <p
                className={`${LABEL} tabular-nums text-white/40`}
                aria-live={rotating ? 'off' : 'polite'}
              >
                <span className='text-white'>
                  {String(active + 1).padStart(2, '0')}
                </span>{' '}
                / {String(projects.length).padStart(2, '0')}
              </p>
              <div className='flex gap-[0.5rem]'>
                <button
                  type='button'
                  onClick={() => goTo(active - 1)}
                  aria-label='Previous project'
                  className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                >
                  <Arrow direction='previous' />
                </button>
                <button
                  type='button'
                  onClick={() => goTo(active + 1)}
                  aria-label='Next project'
                  className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                >
                  <Arrow direction='next' />
                </button>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- TRACK */}
          <div
            role='region'
            aria-roledescription='carousel'
            aria-label='Selected client work'
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className='mt-14 lg:mt-20'
          >
            <ul
              ref={track}
              role='list'
              onScroll={handleScroll}
              className='-mx-6 flex snap-x snap-mandatory gap-[1.5rem] overflow-x-auto scroll-px-6 px-6 [scrollbar-width:none] md:-mx-12 md:scroll-px-12 md:px-12 lg:gap-[3rem] [&::-webkit-scrollbar]:hidden'
            >
              {projects.map((project, index) => (
                <li
                  key={project.name}
                  aria-roledescription='slide'
                  aria-label={`${index + 1} of ${projects.length}: ${project.name}`}
                  className='w-[88%] shrink-0 snap-start lg:w-[80%]'
                >
                  <a
                    href={project.href}
                    target='_blank'
                    rel='noreferrer'
                    tabIndex={index === active ? 0 : -1}
                    className='group block focus-visible:outline-none'
                  >
                    {/* The capture framed as a browser window, so it reads as
                        a live site rather than a flat picture. */}
                    <div className='overflow-hidden border border-white/10 bg-[#1c1c1c] transition-colors group-hover:border-orange group-focus-visible:border-orange'>
                      <div className='flex h-10 items-center gap-[1rem] border-b border-white/10 px-[1rem]'>
                        <div aria-hidden='true' className='flex gap-[0.375rem]'>
                          <span className='h-[0.5rem] w-[0.5rem] bg-orange' />
                          <span className='h-[0.5rem] w-[0.5rem] bg-originalYellow' />
                          <span className='h-[0.5rem] w-[0.5rem] bg-blue1' />
                        </div>
                        <span className={`${LABEL} truncate normal-case tracking-[0.08em] text-white/50`}>
                          {project.domain}
                        </span>
                      </div>
                      <div className='relative aspect-[16/10]'>
                        <Image
                          src={project.image}
                          alt={`The ${project.name} website`}
                          fill
                          sizes='(min-width: 1024px) 80vw, 88vw'
                          className='object-cover object-top'
                        />
                      </div>
                    </div>

                    <div className='mt-[2rem] grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-[3rem] lg:gap-x-[5rem]'>
                      <div>
                        <p className={`${LABEL} text-orange`}>
                          {project.work} · {project.tool}
                        </p>
                        <h3 className={`mt-5 ${SUBHEAD} text-white`}>
                          {project.name}
                        </h3>
                      </div>
                      <div>
                        <p className={`${BODY} text-white/70`}>
                          {project.description}
                        </p>
                        <p
                          className={`mt-5 ${LABEL} text-white transition-colors group-hover:text-orange`}
                        >
                          Visit {project.domain} →
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
