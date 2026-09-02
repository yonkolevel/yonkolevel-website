'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
    promise: 'Ideas that need to become real.',
    description:
      'New mobile products, technical prototypes, major features and architecture, from a sketch to something in the store.',
  },
  {
    Mark: StrengthenMark,
    title: 'STRENGTHEN',
    promise: 'Make what you have hold up.',
    description:
      'Performance, production reliability, analytics, release processes, CI/CD and the technical modernisation everyone has been putting off.',
  },
  {
    Mark: ConnectMark,
    title: 'CONNECT',
    promise: 'Software that touches the real world.',
    description:
      'Audio, MIDI, cameras, connected hardware, payments, location and health data, the parts of a product that meet something physical.',
  },
] as const;

type RenderFit = 'tall' | 'full' | 'wide';

type Product = {
  name: string;
  platforms: string;
  description: string;
  href: string;
  icon: string;
  render: string;
  renderAlt: string;
  /** tall: rises out of the plate's bottom edge; full: contained; wide: a landscape render, contained */
  renderFit: RenderFit;
  plate: string;
};

const products: Product[] = [
  {
    name: 'MIDICIRCUIT',
    platforms: 'iPhone · iPad · Mac · Android',
    description:
      'A simple and approachable DAW for creating and sharing music. Record audio, lay down MIDI in real time, mix your tracks and export when you are ready.',
    href: '/products/midicircuit',
    icon: '/products/midicircuit/app-icon.png',
    render: '/products/midicircuit/marketing/mc-devices.webp',
    renderAlt: 'Midicircuit playgrounds running on Mac, iPad and iPhone',
    renderFit: 'wide',
    plate: '#FF5C24',
  },
  {
    name: 'INVISIBLE CAMERA',
    platforms: 'iPhone',
    description:
      'Bypass Apple’s Deep Fusion and Smart HDR for authentic, film-like photos. See exactly what you will capture in real time. No surprises, no post-processing.',
    href: '/products/invisible-camera',
    icon: '/products/invisible-camera/app-icon.png',
    render: '/products/invisible-camera/marketing/ic-viewfinder.webp',
    renderAlt:
      'Invisible Camera viewfinder on iPhone, framing a street scene in Tokyo',
    renderFit: 'full',
    plate: '#F3B23F',
  },
];

/** The three surfaces a partnership can call on, led by the promise. */
const surfaces = [
  {
    label: 'MOBILE',
    promise: 'One codebase. Both app stores. Easier releases.',
    description:
      'We take apps that have outgrown their first architecture and make them modular, fast and releasable again, so several teams can ship in the same week without standing on each other.',
  },
  {
    label: 'NATIVE',
    promise: 'When the platform is the product.',
    description:
      'Audio engines, camera pipelines, health data and hardware integrations: where a cross-platform layer is not enough, written natively and bridged into the app cleanly.',
  },
  {
    label: 'WEB',
    promise: 'APIs and web flows that hold up.',
    description:
      'APIs, dashboards, booking flows and sites that hold up under real traffic, so the product does not stop at the app icon.',
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
      'A past product-team outcome: mobile releases built for national and international audiences in the hundreds of thousands.',
  },
  {
    label: 'RELIABILITY',
    headline: '70% fewer critical incidents',
    detail:
      'A measured result from earlier product-team work: crash resolution, monitoring, observability and proactive alerting.',
  },
  {
    label: 'RANGE',
    headline: 'Nearly a decade in product teams',
    detail:
      'Work across travel, health, fintech, retail and consumer apps, including regulated products where reliability matters.',
  },
  {
    label: 'RECOGNITION',
    headline: 'Apple Entrepreneur Camp alumni',
    detail:
      'Selected for Apple’s Entrepreneur Camp with Midicircuit, and our audio engineering was presented at ADC Japan 2026.',
  },
] as const;

const engagements = [
  {
    Mark: AssessMark,
    step: '01',
    title: 'Mobile Product Health Sprint',
    description:
      'A focused assessment of architecture, crashes, performance, reliability, analytics, observability, testing, release processes and technical risk. The outcome is a written assessment and prioritised plan.',
  },
  {
    Mark: BuildMark,
    step: '02',
    title: 'Focused Build Partnership',
    description:
      'A bounded engagement organised around one meaningful outcome: shipping a major feature, stabilising a product, building a technical prototype, modernising a critical flow, or preparing an application for launch or scale.',
  },
  {
    Mark: LeadMark,
    step: '03',
    title: 'Fractional Product Engineering Lead',
    description:
      'Ongoing technical direction, architecture, mentoring, production ownership and selective implementation for teams that need senior mobile leadership without a full-time hire.',
  },
] as const;

const STUDIO_ADDRESS = 'team@yonkolevel.com';

/** The questions a useful first email answers. */
const enquiryPrompts = [
  'Company',
  'Product or website',
  'What are you trying to ship, fix or understand?',
  'What would a successful outcome look like?',
  'Desired start date',
  'Constraints, dependencies or decisions already made',
] as const;

/**
 * Opens the visitor's mail client with the enquiry already laid out, so the
 * page asks the same questions a form would without shipping a form that could
 * quietly drop a message. CRLF keeps the line breaks intact across clients.
 */
const studioEmail = (() => {
  const subject = 'Yonko Level Studio enquiry';
  const body = [
    'Hello Yonko Level,',
    '',
    'Name:',
    'Company:',
    'Product or website:',
    '',
    'What we are trying to ship, fix or understand:',
    '',
    '',
    'What a successful outcome looks like:',
    '',
    '',
    'Desired start date:',
    'Expected investment (under £10k / £10k–£25k / £25k–£50k / £50k+ / not sure yet):',
    '',
    'Anything else worth knowing:',
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

const SPRITE_WALKING = '/images/pixel/characters/ricardo-walk.gif';
const SPRITE_IDLE = '/images/pixel/characters/ricardo-idle.gif';
const SPRITE_STILL = '/images/pixel/characters/ricardo-idle.png';

/**
 * The pre-rebrand pixel sprite of the founder. With `walkIn` it repeats the old
 * homepage hero sequence: walk in from the left, then settle into the idle
 * loop. The sprite faces right, so it has to travel rightwards to read
 * correctly. Reduced motion gets a single still frame.
 */
function FounderSprite({
  className,
  walkIn = false,
}: {
  className: string;
  walkIn?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [arrived, setArrived] = React.useState(!walkIn);

  React.useEffect(() => setMounted(true), []);

  // Decorative only, so it is fine to skip it until after hydration.
  if (!mounted) return null;

  const still = prefersReducedMotion === true;
  const source = still ? SPRITE_STILL : arrived ? SPRITE_IDLE : SPRITE_WALKING;
  // native frames are 128px (idle) and 125px (walk); shown at 2x, crisp
  const native = source === SPRITE_WALKING ? 125 : 128;
  const image = (
    <PixelSprite src={source} width={native} height={native} scale={2} />
  );

  if (!walkIn || still) {
    return (
      <div aria-hidden='true' className={className}>
        {image}
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden='true'
      className={className}
      initial={{ x: '-34vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        x: { duration: 2.8, ease: 'linear' },
        opacity: { duration: 0.4 },
      }}
      onAnimationComplete={() => setArrived(true)}
    >
      {image}
    </motion.div>
  );
}

/** The original fist-bump animation from the old About page, still frame under reduced motion. */
function FistBump() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <PixelSprite
      src={
        prefersReducedMotion
          ? '/images/pixel/scenes/fist-pump.png'
          : '/images/pixel/scenes/fist-pump.gif'
      }
      width={160}
      height={144}
      scale={2}
    />
  );
}

/* ------------------------------------------------------------------- page */

export default function StudioClient() {
  const posthog = usePostHog();
  const enquiryStarted = React.useRef(false);

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
              color='#FE6A5A'
              side='full'
              className='relative z-40 max-w-[900px] lg:mr-48'
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
                <span className={`block ${EYEBROW} text-black/60 md:text-sm`}>
                  Yonko Level
                </span>
                <span className='mt-[1rem] block text-[clamp(3.5rem,15vw,12rem)] leading-[0.85] tracking-tight text-black'>
                  Studio
                </span>
              </h1>

              <p className='mt-10 max-w-2xl text-lg leading-9 text-black md:text-xl'>
                We build mobile products for a living, and we help a few other
                teams build theirs. One partnership at a time, with the founder
                doing the work.
              </p>

              <div className='mt-12 flex flex-col items-start'>
                <a
                  href='#enquiry'
                  onClick={() => posthog?.capture('studio_enquiry_cta_clicked')}
                  className={`inline-flex min-h-12 items-center rounded-full bg-black px-7 ${EYEBROW} tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange`}
                >
                  Tell us what you are building →
                </a>
                <p
                  className={`mt-6 ${EYEBROW} tracking-[0.14em] text-black/60`}
                >
                  For founders, product teams and brands.
                </p>
              </div>

              {/* The pixel face carries no CJK glyphs, so this renders in the
                  body face with a normal line box, in font-pixel the metric
                  overrides on the fallback clip katakana. */}
              <span className='mt-14 block font-body text-sm leading-normal tracking-[0.08em] text-black/40'>
                ヨンコ・レベル・スタジオ
              </span>
            </PixelPanel>

            <FounderSprite
              walkIn
              className='pointer-events-none absolute bottom-0 right-6 z-30 hidden lg:block xl:right-12'
            />
          </div>
        </Container>
      </section>

      <TrustedBy />

      {/* ----------------------------------------------------------- EXPERTISE */}
      <section
        className='overflow-hidden bg-black py-[5rem] md:py-[7rem] lg:py-[10rem]'
        aria-labelledby='expertise-title'
      >
        <Container>
          <SectionGrid>
            <div>
              <p className={`mb-5 ${EYEBROW} text-orange`}>
                {'// WHERE WE HELP'}
              </p>
              <h2 id='expertise-title' className={`${HEADING} text-white`}>
                Where good products get unstuck
              </h2>
              <p className={`mt-10 ${BODY} text-white/70`}>
                Yonko Level is where we make our own apps. The Studio is the
                part where we work on other people’s. We like the problems that
                are awkward on purpose: audio, cameras, hardware, the places
                where a normal app framework runs out. If yours is one of those,
                we’ll get on.
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
                <h3 className='mt-[2rem] font-pixel text-base leading-snug text-white md:text-lg'>
                  {promise}
                </h3>
                <p className={`mt-5 ${BODY} text-white/70`}>{description}</p>
              </article>
            ))}
          </SectionGrid>
        </Container>
      </section>

      {/* ------------------------------------------------------------ SURFACES */}
      <section
        className='overflow-hidden bg-black py-[5rem] md:py-[7rem] lg:py-[10rem]'
        aria-labelledby='surfaces-title'
      >
        <Container>
          <SectionGrid>
            <div>
              <p className={`mb-5 ${EYEBROW} text-orange`}>
                {'// WHAT WE BRING'}
              </p>
              <h2 id='surfaces-title' className={`${HEADING} text-white`}>
                The whole product, not one layer
              </h2>
              <p className={`mt-10 ${BODY} text-white/70`}>
                We don’t hand things off. The architecture, the native work
                nobody wants to touch, and the release itself: same pair of
                hands. Fewer things fall through the gaps, because there aren’t
                many gaps.
              </p>
            </div>

            {surfaces.map(({ label, promise, description }) => (
              <article key={label}>
                <CellMarker>
                  <p className={`${MARKER} text-orange`}>{label}</p>
                </CellMarker>
                <h3 className='mt-[2rem] font-pixel text-base leading-snug text-white md:text-lg'>
                  {promise}
                </h3>
                <p className={`mt-5 ${BODY} text-white/70`}>{description}</p>
              </article>
            ))}
          </SectionGrid>
        </Container>
      </section>

      {/* ------------------------------------------------------------ PRODUCTS */}
      <section
        className='overflow-hidden bg-black py-[5rem] md:py-[7rem] lg:py-[10rem]'
        aria-labelledby='products-title'
      >
        <Container>
          <SectionGrid>
            <div>
              <p className={`mb-5 ${EYEBROW} text-orange`}>
                {'// PRODUCT COMPANY FIRST'}
              </p>
              <h2 id='products-title' className={`${HEADING} text-white`}>
                We ship our own products
              </h2>
              <p className={`mt-10 ${BODY} text-white/70`}>
                We’ve been shipping Midicircuit for five years, through a pivot,
                an Apple Entrepreneur Camp and a lot of App Store reviews.
                Invisible Camera came after. Everything we bring to a
                partnership, we learned the hard way on our own products first.
              </p>
            </div>

            {/* Left empty so the two products sit side by side on one row. */}
            <div aria-hidden='true' className='hidden md:block' />

            {products.map((product) => (
              <article key={product.name}>
                {/* Transparent device render on a solid plate, cropped by the
                    plate's bottom edge so it fills rather than floats. */}
                <div
                  className='relative aspect-[4/3] overflow-hidden'
                  style={{ backgroundColor: product.plate }}
                >
                  <div
                    className={
                      product.renderFit === 'wide'
                        ? 'absolute inset-x-6 bottom-6 top-6 sm:inset-x-10 sm:bottom-8 sm:top-8'
                        : product.renderFit === 'full'
                          ? 'absolute inset-x-0 bottom-6 top-6 sm:bottom-8 sm:top-8'
                          : 'absolute inset-x-0 -bottom-[18%] top-[2.5rem] sm:top-12'
                    }
                  >
                    <Image
                      src={product.render}
                      alt={product.renderAlt}
                      fill
                      sizes='(min-width: 720px) 50vw, 100vw'
                      className={
                        product.renderFit === 'tall'
                          ? 'object-contain object-top'
                          : 'object-contain object-center'
                      }
                    />
                  </div>
                </div>
                <div className='mt-[2rem] flex items-center gap-[1rem]'>
                  <Image
                    src={product.icon}
                    alt=''
                    aria-hidden='true'
                    width={44}
                    height={44}
                    className='h-11 w-11 rounded-[10px]'
                  />
                  <div>
                    <h3 className={`${CELL_TITLE} text-white`}>
                      {product.name}
                    </h3>
                    <p className={`mt-2 ${MARKER} text-white/40`}>
                      {product.platforms}
                    </p>
                  </div>
                </div>
                <p className={`mt-5 ${BODY} text-white/70`}>
                  {product.description}
                </p>
                <Link
                  href={product.href}
                  className={`mt-7 inline-flex items-center border-b border-orange pb-2 ${EYEBROW} tracking-[0.14em] text-white transition-colors hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-black`}
                >
                  Explore {product.name} →
                </Link>
              </article>
            ))}
          </SectionGrid>
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
                {'// TRACK RECORD'}
              </p>
              <h2 id='record-title' className={`${HEADING} text-black`}>
                Proven in production
              </h2>
              <p className={`mt-10 ${BODY} text-black/80`}>
                Some of this is from our own releases, some from years inside
                other people’s product teams. We’d rather show numbers than
                adjectives. Ask us about any of them.
              </p>
            </PixelPanel>

            <ul role='list' className='contents'>
              {trackRecord.map(({ label, headline, detail }) => (
                <li key={headline}>
                  <CellMarker>
                    <p className={`${MARKER} text-orange`}>{label}</p>
                  </CellMarker>
                  <h3 className='mt-[2rem] font-pixel text-base leading-snug text-white md:text-lg'>
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
                {'// ENGAGEMENTS'}
              </p>
              <h2 id='work-title' className={`${HEADING} text-white`}>
                A clear path to shipping
              </h2>
              <p className='mt-10 text-lg leading-9 text-white md:text-xl'>
                We start small, on purpose. A short health sprint tells us both
                whether this is worth doing. If it is, we carry on: a bounded
                build, or a fractional lead on your team. If it isn’t, you still
                leave with a written plan.
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
                  <h3 className='mt-[2rem] font-pixel text-base leading-snug text-white md:text-lg'>
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
                {'// FOUNDER-LED'}
              </p>
              <h2 id='founder-title' className={`${HEADING} text-white`}>
                The founder stays in the work
              </h2>
              <div className={`mt-10 space-y-6 ${BODY} text-white`}>
                <p>
                  Yonko Level is led by Ricardo Abreu. He has spent a decade
                  shipping consumer apps in travel, health, payments and
                  creative tech, and the last five building our own. He loves
                  understanding problems, solving them, making new things, and
                  teaching people to do the same.
                </p>
                <p>
                  Ricardo does the work himself. When a project needs more than
                  one person, we bring in friends we’ve worked with for years,
                  on design and on code. Never a bench, never a handover to
                  someone you haven’t met.
                </p>
              </div>
            </PixelPanel>

            <div className='relative min-h-[320px] w-full overflow-hidden md:min-h-[460px]'>
              <Image
                src='/products/midicircuit/press/photo-ricardo.jpg'
                alt='Ricardo Abreu, founder of Yonko Level'
                fill
                sizes='(min-width: 720px) 50vw, 100vw'
                className='object-cover'
              />
            </div>
          </SectionGrid>
        </Container>
      </section>

      <Friends />

      {/* ------------------------------------------------------------- ENQUIRY */}
      <section
        id='enquiry'
        className='scroll-mt-8 overflow-hidden bg-black py-[5rem] md:py-[7rem] lg:py-[10rem]'
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
                {'// START A CONVERSATION'}
              </p>
              <h2 id='enquiry-title' className={`${HEADING} text-black`}>
                Tell us what you are building
              </h2>
              <p className={`mt-10 ${BODY} text-black/80`}>
                Just email us. The link fills in the questions we’d ask anyway;
                answer the ones you can and skip the rest. Ricardo reads
                everything himself.
              </p>

              <a
                href={studioEmail}
                onClick={handleEnquiryStarted}
                className={`mt-10 inline-flex min-h-12 items-center rounded-full bg-black px-7 ${EYEBROW} tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-originalYellow`}
              >
                Start an email →
              </a>

              <p className='mt-[2rem] text-sm leading-7 text-black/70'>
                Or write to{' '}
                <a
                  href={`mailto:${STUDIO_ADDRESS}`}
                  onClick={handleEnquiryStarted}
                  className='font-medium text-black underline decoration-2 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-originalYellow'
                >
                  {STUDIO_ADDRESS}
                </a>{' '}
                directly. We will only use these details to discuss your
                enquiry.
              </p>

              <div className='pointer-events-none mt-12 hidden lg:block'>
                <FistBump />
              </div>
            </PixelPanel>

            <div>
              <CellMarker>
                <p className={`${MARKER} text-white/40`}>
                  {'// WHAT TO INCLUDE'}
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
              <p className='mt-[2rem] text-sm leading-7 text-white/40'>
                Name and email come with the message. Everything else is
                optional.
              </p>
            </div>
          </SectionGrid>
        </Container>
      </section>
    </div>
  );
}
