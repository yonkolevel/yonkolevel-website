'use client';

import Image from 'next/image';
import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePostHog } from 'posthog-js/react';
import Container from '@/components/Container';
import PixelPanel from '@/components/PixelPanel';
import PixelSprite from '@/components/PixelSprite';
import TrustedBy from '@/components/studio/TrustedBy';
import Friends from '@/components/studio/Friends';
import {
  AssessMark,
  BuildMark,
  ConnectMark,
  CreateMark,
  LeadMark,
  StrengthenMark,
} from '@/components/studio/PixelMarks';

/* ----------------------------------------------------------------- content */

const expertise = [
  {
    Mark: CreateMark,
    title: 'CREATE',
    promise: 'Build something new',
    description:
      'We help turn an idea into an app, website, prototype or major feature. Together, we figure out what to build first and choose an architecture that fits the product.',
  },
  {
    Mark: StrengthenMark,
    title: 'STRENGTHEN',
    promise: 'Improve what’s already there',
    description:
      'We make existing apps and websites faster, more reliable and easier to work on. That might mean fixing bugs, improving analytics and monitoring, making testing and releases simpler, or untangling code that’s become difficult to maintain.',
  },
  {
    Mark: ConnectMark,
    title: 'CONNECT',
    promise: 'Bring devices and services together',
    description:
      'We work with audio, MIDI, cameras, connected hardware, payments, location and health data. From connecting a musical instrument to handling a payment, we build the integrations behind those experiences.',
  },
] as const;

/** Three layers of product expertise, led by the promise. */
const surfaces = [
  {
    label: 'NATIVE',
    promise: 'Audio, cameras and hardware',
    description:
      'Native integrations for features that need to work directly with the device.',
  },
  {
    label: 'MOBILE',
    promise: 'One app for iOS and Android',
    description:
      'Cross-platform apps that are fast, reliable and easy to build on.',
  },
  {
    label: 'WEB',
    promise: 'Websites, dashboards and APIs',
    description:
      'We build websites and web apps, from landing pages to dashboards and booking flows.',
  },
] as const;

/**
 * Outcomes from the founder's product-engineering career and Yonko Level's own
 * releases. Stated as results rather than roles, no employer is a client.
 */
const trackRecord = [
  {
    label: 'REACH',
    headline: 'Hundreds of thousands of users',
    detail:
      'Ricardo has helped build and release mobile apps serving hundreds of thousands of users, as part of teams working with national and international audiences.',
  },
  {
    label: 'RELIABILITY',
    headline: '70% fewer critical incidents',
    detail:
      'In a previous product-team role, Ricardo helped reduce critical incidents by 70% through crash fixes, better monitoring and proactive alerts.',
  },
  {
    label: 'RANGE',
    headline: 'More than ten years building apps',
    detail:
      'Ricardo’s work spans travel, health, fintech, retail and consumer apps, including regulated products where reliability is especially important.',
  },
  {
    label: 'RECOGNITION',
    headline: 'Apple Entrepreneur Camp alumni',
    detail: 'Midicircuit was selected for Apple’s Entrepreneur Camp.',
  },
  {
    label: 'PUBLIC SPEAKING',
    headline: 'Public speaking on music apps',
    detail:
      'Ricardo has spoken about building music apps across platforms at various events, most recently at ADC Japan 2026.',
  },
] as const;

const engagements = [
  {
    Mark: AssessMark,
    step: '01',
    title: 'Mobile Product Health Sprint',
    description:
      'We look at how your app is built, how it behaves in production and how your team develops and releases it. That covers architecture, crashes, performance, analytics, monitoring, testing and technical risk. You get a written assessment with priorities and practical next steps, whether we continue together or not.',
  },
  {
    Mark: BuildMark,
    step: '02',
    title: 'Focused Build Partnership',
    description:
      'We agree on one clear outcome and work towards it together. That could be launching an app or website, building a technical prototype, adding a major feature, modernising a critical flow or making an existing product more reliable.',
  },
  {
    Mark: LeadMark,
    step: '03',
    title: 'Fractional Product Engineering Lead',
    description:
      'Ricardo works with your team on technical direction, architecture, mentoring and production ownership, while continuing to write code. This is for teams that need senior engineering support without a full-time hire.',
  },
] as const;

const STUDIO_ADDRESS = 'team@yonkolevel.com';

/** The questions a useful first email answers. */
const enquiryPrompts = [
  'Your company',
  'Your product or website',
  'What are you trying to build, fix or figure out?',
  'What would a good outcome look like?',
  'When would you like to start?',
  'Any constraints or decisions we should know about?',
] as const;

/**
 * Opens the visitor's mail client with the enquiry already laid out, so the
 * page asks the same questions a form would without shipping a form that could
 * quietly drop a message. CRLF keeps the line breaks intact across clients.
 */
const studioEmail = (() => {
  const subject = 'Yonko Level Studio enquiry';
  const body = [
    'Hey Ricardo,',
    '',
    'Company:',
    'Product or website:',
    '',
    'What we’re trying to build, fix or figure out:',
    '',
    '',
    'What a good outcome looks like:',
    '',
    '',
    'When we’d like to start:',
    '',
    'Constraints or decisions worth knowing about:',
    '',
  ].join('\r\n');

  return `mailto:${STUDIO_ADDRESS}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
})();

/* ------------------------------------------------------------- type tokens */

const EYEBROW = 'font-pixel text-xs uppercase tracking-[0.22em]';
const HEADING =
  'font-pixel text-2xl uppercase leading-tight tracking-tight lg:text-3xl xl:text-4xl';
const CELL_TITLE = 'font-pixel text-lg uppercase md:text-xl';
const MARKER = 'font-pixel text-xs tracking-[0.2em]';
const CELL_PROMISE_BASE =
  'font-pixel font-[500] text-xl leading-snug tracking-[0.03em]';
const CELL_PROMISE_COMPACT = `${CELL_PROMISE_BASE} lg:text-[1.75rem]`;
const CELL_PROMISE = `${CELL_PROMISE_BASE} lg:text-[2rem]`;
const BODY = 'text-base leading-8 md:text-lg';

/* -------------------------------------------------------------- primitives */

/**
 * The 2x2 content grid every section uses: the section's own eyebrow and title
 * live in the leading cell, so a section reads as one group of four blocks
 * rather than a heading with a list under it. Short sections leave a quadrant
 * empty instead of stretching to fill it.
 */
function SectionGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-1 gap-x-[3rem] gap-y-[4rem] border-t border-white/10 pt-[3.5rem] md:grid-cols-2 lg:gap-x-[5rem] lg:gap-y-[7.5rem] lg:pt-[6rem]'>
      {children}
    </div>
  );
}

/** The slot each cell opens with, so titles line up across a row. */
function CellMarker({ children }: { children?: React.ReactNode }) {
  return <div className='flex h-16 items-center'>{children}</div>;
}

/**
 * The original fist-bump animation from the old About page. It rests on its
 * first frame (fists apart) and plays once each time `play` increments —
 * hovering or focusing the enquiry button bumps it. Reduced motion keeps the still.
 */
function FistBump({ play }: { play: number }) {
  const prefersReducedMotion = useReducedMotion();
  const animate = play > 0 && !prefersReducedMotion;

  return (
    <PixelSprite
      key={animate ? play : 'still'}
      src={
        animate
          ? '/images/pixel/scenes/fist-pump.webp'
          : '/images/pixel/scenes/fist-pump.png'
      }
      width={80}
      height={52}
      scale={2}
    />
  );
}

/* ------------------------------------------------------------------- page */

export default function StudioClient() {
  const posthog = usePostHog();
  const enquiryStarted = React.useRef(false);
  const [bumps, setBumps] = React.useState(0);

  // the bump replays on every hover (and keyboard focus); the analytics
  // event fires once, on the first press
  const bump = () => setBumps((n) => n + 1);

  const handleEnquiryStarted = () => {
    if (enquiryStarted.current) return;

    enquiryStarted.current = true;
    posthog?.capture('studio_enquiry_started', { method: 'email' });
  };

  return (
    <div className='bg-black text-white'>
      {/* ---------------------------------------------------------------- HERO */}
      <section
        className='relative flex items-center overflow-hidden bg-black py-[5rem] md:py-[7rem] lg:min-h-screen'
        aria-labelledby='studio-hero-title'
      >
        <Container>
          <div className='relative'>
            <PixelPanel
              color='#007AFF'
              side='full'
              className='relative z-40 mx-auto max-w-[900px]'
              pad='p-[2rem] sm:p-10 md:p-14'
              pixelSize={32}
              displacements={[
                { row: 0, col: 0, displaceX: -2, displaceY: -1 },
                { row: 0, col: 6, displaceX: 0, displaceY: -1 },
                { row: 0, col: -3, displaceX: 1, displaceY: -1 },
                { row: -1, col: 0, displaceX: -1, displaceY: 1 },
                { row: -1, col: 4, displaceX: 0, displaceY: 2 },
                { row: -1, col: 9, displaceX: 1, displaceY: 3 },
                { row: -1, col: -1, displaceX: 2, displaceY: 1 },
                { row: 0, col: -1, displaceX: 2, displaceY: 0 },
              ]}
            >
              <h1 id='studio-hero-title' className='font-pixel uppercase'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='/images/logo.svg'
                  alt='Yonko Level'
                  className='mb-[1rem] block w-[9.5rem] md:w-[11.5rem]'
                />
                <span className='mt-[1rem] block text-[clamp(3.5rem,15vw,12rem)] leading-[0.85] tracking-tight text-white'>
                  Studio
                </span>
              </h1>

              <p className='mt-10 max-w-2xl text-lg leading-9 text-white md:text-xl'>
                We build our own products and help you build yours. One
                partnership at a time, with Ricardo hands-on from first chat
                to launch.
              </p>

              <div className='mt-12 flex flex-col items-start'>
                <a
                  href='#enquiry'
                  onClick={() => posthog?.capture('studio_enquiry_cta_clicked')}
                  className={`inline-flex min-h-12 items-center rounded-full bg-black px-7 ${EYEBROW} tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue1`}
                >
                  Tell us what you’re building →
                </a>
                <p
                  className={`mt-6 ${EYEBROW} tracking-[0.14em] text-white/70`}
                >
                  For founders, product teams and brands.
                </p>
              </div>

              {/* The pixel face carries no CJK glyphs, so this renders in the
                  body face with a normal line box, in font-pixel the metric
                  overrides on the fallback clip katakana. */}
              <span className='mt-14 block font-body text-sm leading-normal tracking-[0.08em] text-white/50'>
                ヨンコ・レベル・スタジオ
              </span>
            </PixelPanel>

            {/* The studio: desk, monitor, bonsai, chair and plant from the
                original prop set, composed into one scene and shown at 2x. */}
            {/* The studio scene, absolutely placed so the hero keeps its
                height: bottom-right of the panel from md, and from xl shifted
                half its width past the panel's edge. */}
            <div
              aria-hidden='true'
              className='pointer-events-none absolute bottom-0 right-6 z-50 hidden translate-x-1/2 md:block xl:right-0'
            >
              <PixelSprite
                src='/images/pixel/scenes/studio-desk.png'
                width={172}
                height={154}
                scale={2}
              />
            </div>
          </div>
        </Container>
      </section>

      <TrustedBy />

      {/* ----------------------------------------------------------- EXPERTISE */}
      <section
        className='overflow-hidden bg-black pb-[5rem] pt-[2rem] md:pb-[7rem] md:pt-[3rem] lg:pb-[10rem] lg:pt-[4rem]'
        aria-labelledby='expertise-title'
      >
        <Container>
          <SectionGrid>
            <div>
              <p className={`mb-5 ${EYEBROW} text-orange`}>
                WHERE WE HELP
              </p>
              <h2 id='expertise-title' className={`${HEADING} text-white`}>
                What are you working on?
              </h2>
              <p className={`mt-10 ${BODY} text-white/70`}>
                Maybe you have an idea you want to try, an app or website that’s
                getting harder to work on, or a feature you’re not sure how to
                build. We can help. We especially enjoy working with audio, cameras
                and connected hardware, where figuring out how things work is
                part of the fun.
              </p>
            </div>

            {expertise.map(({ Mark, title, promise, description }) => (
              <article key={title}>
                <CellMarker>
                  <div className='flex items-center gap-[1rem]'>
                    <Mark className='h-14 w-14 md:h-16 md:w-16' />
                    <p className={`${MARKER} text-orange`}>{title}</p>
                  </div>
                </CellMarker>
                <h3 className={`mt-[2rem] ${CELL_PROMISE} text-white`}>
                  {promise}
                </h3>
                <p className={`mt-5 ${BODY} text-white/70`}>{description}</p>
              </article>
            ))}
          </SectionGrid>
        </Container>
      </section>

      {/* ------------------------------------------------------------ EXPERTISE */}
      <section
        className='overflow-hidden bg-black py-[5rem] md:py-[7rem] lg:py-[10rem]'
        aria-labelledby='surfaces-title'
      >
        <Container>
          <div className='border-t border-white/10 pt-[4rem] lg:pt-[6rem]'>
            <div className='max-w-3xl'>
              <p className={`mb-5 ${EYEBROW} text-orange`}>WHAT WE BRING</p>
              <h2 id='surfaces-title' className={`${HEADING} text-white`}>
                We have the expertise you need
              </h2>
              <p className={`mt-10 ${BODY} text-white/70`}>
                Native features, mobile apps and websites.
              </p>
            </div>

            <div className='mt-14 grid grid-cols-1 gap-x-[3rem] gap-y-[4rem] md:grid-cols-3 lg:mt-20 lg:gap-x-[5rem]'>
              {surfaces.map(({ label, promise, description }) => (
                <article key={label}>
                  <p className={`${MARKER} text-orange`}>{label}</p>
                  <h3 className={`mt-6 ${CELL_PROMISE_COMPACT} text-white`}>
                    {promise}
                  </h3>
                  <p className={`mt-5 ${BODY} text-white/70`}>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- EXPERIENCE */}
      <section
        className='overflow-hidden bg-black py-[5rem] md:py-[7rem] lg:py-[10rem]'
        aria-labelledby='record-title'
      >
        <Container>
          <SectionGrid>
            <PixelPanel
              color='#FCC552'
              side='left'
              className='lg:min-h-[420px]'
              displacements={[
                { row: 0, col: 0, displaceX: -1, displaceY: -1 },
                { row: 0, col: 3, displaceX: 0, displaceY: -1 },
                { row: -1, col: 2, displaceX: 0, displaceY: 2 },
                { row: -1, col: -1, displaceX: 1, displaceY: 1 },
              ]}
            >
              <p className={`mb-5 ${EYEBROW} text-black/70`}>
                TRACK RECORD
              </p>
              <h2 id='record-title' className={`${HEADING} text-black`}>
                Some of the work behind the Studio
              </h2>
              <p className={`mt-10 ${BODY} text-black/80`}>
                Some of this comes from our own products, and some from
                Ricardo’s work within other product teams. Here are a few
                examples.
              </p>
            </PixelPanel>

            <ul role='list' className='contents'>
              {trackRecord.map(({ label, headline, detail }) => (
                <li key={headline}>
                  <CellMarker>
                    <p className={`${MARKER} text-orange`}>{label}</p>
                  </CellMarker>
                  <h3 className={`mt-[2rem] ${CELL_PROMISE} text-white`}>
                    {headline}
                  </h3>
                  <p className={`mt-5 ${BODY} text-white/70`}>{detail}</p>
                </li>
              ))}
            </ul>
          </SectionGrid>
        </Container>
      </section>

      {/* -------------------------------------------------------- HOW WE WORK */}
      <section
        className='overflow-hidden bg-black py-[5rem] md:py-[7rem] lg:py-[10rem]'
        aria-labelledby='work-title'
      >
        <Container>
          <SectionGrid>
            <PixelPanel
              color='#007AFF'
              side='right'
              className='md:col-start-2 md:row-start-1 lg:min-h-[420px]'
              displacements={[
                { row: 0, col: 1, displaceX: 0, displaceY: -1 },
                { row: 0, col: -1, displaceX: 2, displaceY: 0 },
                { row: -1, col: -1, displaceX: 1, displaceY: 2 },
                { row: -1, col: 3, displaceX: 0, displaceY: 3 },
              ]}
            >
              <p className={`mb-5 ${EYEBROW} text-white/70`}>
                ENGAGEMENTS
              </p>
              <h2 id='work-title' className={`${HEADING} text-white`}>
                How we can work together
              </h2>
              <p className='mt-10 text-lg leading-9 text-white md:text-xl'>
                We start by understanding what you want to build or improve,
                whether it’s an app or a website. From there, we can agree on a
                focused build, assess an existing mobile app through a health
                sprint, or work with your team on an ongoing basis.
              </p>
            </PixelPanel>

            <ol role='list' className='contents'>
              {engagements.map(({ Mark, step, title, description }) => (
                <li key={title}>
                  <CellMarker>
                    <div className='flex items-center gap-[1rem]'>
                      <Mark className='h-12 w-12' />
                      <p className={`${MARKER} text-white/40`}>{step}</p>
                    </div>
                  </CellMarker>
                  <h3 className={`mt-[2rem] ${CELL_PROMISE} text-white`}>
                    {title}
                  </h3>
                  <p className={`mt-5 ${BODY} text-white/70`}>{description}</p>
                </li>
              ))}
            </ol>
          </SectionGrid>
        </Container>
      </section>

      {/* ------------------------------------------------------------- FOUNDER */}
      <section
        className='overflow-hidden bg-black py-[5rem] md:py-[7rem] lg:py-[10rem]'
        aria-labelledby='founder-title'
      >
        <Container>
          <SectionGrid>
            <PixelPanel
              color='#FE6A5A'
              side='left'
              className='lg:min-h-[460px]'
              displacements={[
                { row: 0, col: 0, displaceX: -2, displaceY: -1 },
                { row: 0, col: -2, displaceX: 0, displaceY: -1 },
                { row: -1, col: 1, displaceX: -1, displaceY: 2 },
                { row: -1, col: -2, displaceX: 0, displaceY: 3 },
              ]}
            >
              <p className={`mb-5 ${EYEBROW} text-white/70`}>
                FOUNDER-LED
              </p>
              <h2 id='founder-title' className={`${HEADING} text-white`}>
                Hey, I’m Ricardo.
              </h2>
              <div className={`mt-10 space-y-6 ${BODY} text-white`}>
                <p>
                  I started Yonko Level as a place to build things I care about.
                  I’ve spent more than ten years working on apps across travel,
                  health, payments and creative technology, and the last five
                  building our own too. I love figuring out how things work and
                  making something useful from what I learn. Teaching people and
                  helping them build their own things is a big part of that too.
                </p>
                <p>
                  When we work together, you’ll be working directly with me.
                  If a project needs more people, I bring in friends and
                  collaborators I’ve worked with for years, across design and
                  engineering. You’ll know who’s involved and what each of us
                  is working on.
                </p>
              </div>
            </PixelPanel>

            <div className='relative min-h-[320px] w-full overflow-hidden md:min-h-[460px]'>
              <Image
                src='/images/studio/ricardo-riso.webp'
                alt='Ricardo Abreu, founder of Yonko Level'
                fill
                sizes='(min-width: 720px) 50vw, 100vw'
                className='object-cover object-[center_35%]'
              />
            </div>
          </SectionGrid>
        </Container>
      </section>

      <Friends />

      {/* ------------------------------------------------------------- ENQUIRY */}
      <section
        id='enquiry'
        className='scroll-mt-8 overflow-hidden bg-black pb-[5rem] pt-[2rem] md:pb-[7rem] md:pt-[3rem] lg:pb-[10rem] lg:pt-[4rem]'
        aria-labelledby='enquiry-title'
      >
        <Container>
          <SectionGrid>
            <PixelPanel
              color='#FCC552'
              side='right'
              className='md:col-start-2 md:row-start-1'
              displacements={[
                { row: 0, col: -2, displaceX: 1, displaceY: -1 },
                { row: 0, col: 2, displaceX: 0, displaceY: -1 },
                { row: -1, col: -1, displaceX: 2, displaceY: 2 },
                { row: -1, col: 1, displaceX: 0, displaceY: 3 },
              ]}
            >
              <p className={`mb-5 ${EYEBROW} text-black/70`}>
                START A CONVERSATION
              </p>
              <h2 id='enquiry-title' className={`${HEADING} text-black`}>
                Tell us what you’re building
              </h2>
              <p className={`mt-10 ${BODY} text-black/80`}>
                Tell us about your idea, what you’d like to improve or the
                problem you’re trying to figure out. The email link includes a
                few questions to get you started. Answer what you can; it doesn’t
                need to be a complete brief. Ricardo reads every enquiry.
              </p>

              <div className='mt-10 flex flex-wrap items-center gap-x-[1.25rem] gap-y-[0.75rem]'>
                <a
                  href={studioEmail}
                  onClick={handleEnquiryStarted}
                  onMouseEnter={bump}
                  onFocus={bump}
                  className={`inline-flex min-h-12 items-center rounded-full bg-black px-7 whitespace-nowrap ${EYEBROW} tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-originalYellow`}
                >
                  Start an email →
                </a>

                <div
                  aria-hidden='true'
                  className='pointer-events-none hidden sm:block'
                >
                  <FistBump play={bumps} />
                </div>
              </div>

              <p className='mt-[2rem] text-sm leading-7 text-black/70'>
                Or write to{' '}
                <a
                  href={`mailto:${STUDIO_ADDRESS}`}
                  onClick={handleEnquiryStarted}
                  className='font-medium text-black underline decoration-2 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-originalYellow'
                >
                  {STUDIO_ADDRESS}
                </a>{' '}
                directly. We’ll only use the details you share to discuss your
                enquiry.
              </p>
            </PixelPanel>

            <div>
              <CellMarker>
                <p className={`${MARKER} text-white/40`}>
                  WHAT TO INCLUDE
                </p>
              </CellMarker>
              <ul role='list' className='mt-[2rem] border-t border-white/10'>
                {enquiryPrompts.map((prompt) => (
                  <li
                    key={prompt}
                    className='border-b border-white/10 py-5 text-base leading-8 text-white/70'
                  >
                    {prompt}
                  </li>
                ))}
              </ul>
            </div>
          </SectionGrid>
        </Container>
      </section>
    </div>
  );
}
