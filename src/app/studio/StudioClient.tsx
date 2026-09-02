'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePostHog } from 'posthog-js/react';
import Container from '@/components/Container';
import PixelDisplacementGrid from '@/components/PixelDisplacementGrid';
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
    description:
      'New mobile products, technical prototypes, major features and architecture for ideas that need to become real.',
  },
  {
    Mark: StrengthenMark,
    title: 'STRENGTHEN',
    description:
      'Performance, production reliability, analytics, release processes, CI/CD and difficult technical modernisation.',
  },
  {
    Mark: ConnectMark,
    title: 'CONNECT',
    description:
      'Audio, MIDI, camera systems, hardware integrations, payments, location services, health data and HealthKit—products that interact with the physical world.',
  },
] as const;

const products = [
  {
    name: 'MIDICIRCUIT',
    platforms: 'iPhone · iPad · Mac · Android',
    description:
      'A simple and approachable DAW for creating and sharing music. Record audio, lay down MIDI in real time, mix your tracks and export when you are ready.',
    href: '/products/midicircuit',
    shots: [
      '/products/midicircuit/app-store/1.png',
      '/products/midicircuit/app-store/2.png',
    ],
    shotAlt: 'Midicircuit playgrounds and piano roll on iPhone',
  },
  {
    name: 'INVISIBLE CAMERA',
    platforms: 'iPhone',
    description:
      'Bypass Apple’s Deep Fusion and Smart HDR for authentic, film-like photos. See exactly what you will capture in real time—no surprises, no post-processing.',
    href: '/products/invisible-camera',
    shots: [
      '/products/invisible-camera/app-store/1.png',
      '/products/invisible-camera/app-store/2.png',
    ],
    shotAlt: 'Invisible Camera viewfinder on iPhone',
  },
] as const;

/**
 * Roles and product work from before Yonko Level Studio. Named deliberately as
 * past employers and projects — never as Studio clients.
 */
const experience = [
  {
    domain: 'HEALTH',
    name: 'Babylon Health / eMed',
    detail:
      'Two years building consumer health products, including Apple HealthKit integration.',
  },
  {
    domain: 'FINTECH',
    name: 'Collectable',
    detail: 'Fractional investing in sports memorabilia, across iOS and web.',
  },
  {
    domain: 'AUCTIONS',
    name: 'Christie’s',
    detail: 'Mobile product work for the auction house.',
  },
  {
    domain: 'SYSTEMS',
    name: 'Across those teams',
    detail:
      'Payments, fraud detection, location systems, analytics infrastructure, release management and large-scale React Native architecture.',
  },
] as const;

/** Outcomes worth stating plainly, without attaching them to one employer. */
const experienceProof = [
  'Mobile products used by hundreds of thousands of people.',
  'Critical production incidents reduced by 70%.',
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
  'Expected investment — under £10k · £10k–£25k · £25k–£50k · £50k+ · not sure yet',
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
  'font-pixel text-2xl uppercase leading-tight tracking-tight md:text-4xl';
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
    <div className='grid grid-cols-1 gap-x-12 gap-y-16 border-t border-white/10 pt-14 md:grid-cols-2 lg:gap-x-20 lg:gap-y-24 lg:pt-20'>
      {children}
    </div>
  );
}

/** The slot each cell opens with, so titles line up across a row. */
function CellMarker({ children }: { children?: React.ReactNode }) {
  return <div className='flex h-16 items-center'>{children}</div>;
}

const SPRITE_WALKING = '/images/illustrations/dev_walking.gif';
const SPRITE_IDLE = '/images/illustrations/dev_idle.gif';
const SPRITE_STILL = '/images/illustrations/dev_idle-static.png';

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
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={source} alt='' className='block w-full' />
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

type Displacement = {
  row: number;
  col: number;
  displaceX: number;
  displaceY: number;
};

/**
 * Content on a solid colour panel built from the displacement grid, the way the
 * homepage showcase sections do it: a few pixels come loose from the panel's
 * edges and fly into the dark around it, leaving holes where they were.
 *
 * A negative column counts back from the panel's right edge — the grid derives
 * its column count from the measured width, so a fixed index near the right
 * edge would otherwise be dropped or wrap onto the next row.
 */
function PixelPanel({
  color,
  displacements,
  className = '',
  pad = 'p-8 sm:p-10 md:p-12',
  pixelSize = 40,
  children,
}: {
  color: string;
  displacements: Displacement[];
  className?: string;
  pad?: string;
  pixelSize?: number;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [cols, setCols] = React.useState(0);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () =>
      setCols(Math.floor(node.getBoundingClientRect().width / pixelSize));

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [pixelSize]);

  const resolved = React.useMemo(
    () =>
      cols === 0
        ? []
        : displacements
            .map((d) => (d.col < 0 ? { ...d, col: cols + d.col } : d))
            .filter((d) => d.col >= 0 && d.col < cols),
    [displacements, cols],
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <PixelDisplacementGrid
        backgroundColor={color}
        holeColor='transparent'
        displacedPixelColor={color}
        pixelSize={pixelSize}
        displacements={resolved}
        animationDelay={prefersReducedMotion ? 0 : 0.15}
        animationDuration={prefersReducedMotion ? 0 : 0.5}
      />
      <div className={`relative z-40 ${pad}`}>{children}</div>
    </div>
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
        className='relative flex min-h-screen items-center overflow-hidden bg-black py-28'
        aria-labelledby='studio-hero-title'
      >
        <Container>
          <div className='relative'>
            <PixelPanel
              color='#FE6A5A'
              className='relative z-40 max-w-[900px] lg:mr-48'
              pad='p-8 sm:p-10 md:p-14'
              pixelSize={32}
              displacements={[
                { row: 0, col: 0, displaceX: -2, displaceY: -2 },
                { row: 0, col: 6, displaceX: 1, displaceY: -4 },
                { row: 3, col: 0, displaceX: -4, displaceY: 1 },
                { row: 6, col: 1, displaceX: -5, displaceY: -2 },
                { row: 8, col: 0, displaceX: -1, displaceY: 3 },
                { row: 8, col: 4, displaceX: 2, displaceY: 4 },
                { row: 1, col: -1, displaceX: 3, displaceY: -2 },
                { row: 4, col: -2, displaceX: 5, displaceY: 1 },
                { row: 7, col: -1, displaceX: 2, displaceY: 3 },
              ]}
            >
              <h1 id='studio-hero-title' className='font-pixel uppercase'>
                <span className={`block ${EYEBROW} text-black/60 md:text-sm`}>
                  Yonko Level
                </span>
                <span className='mt-4 block text-[clamp(3.5rem,15vw,12rem)] leading-[0.85] tracking-tight text-black'>
                  Studio
                </span>
              </h1>

              <p className='mt-10 max-w-2xl text-lg leading-9 text-black md:text-xl'>
                Founder-led product engineering for ambitious mobile software.
                We take on one principal partnership at a time.
              </p>

              <div className='mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8'>
                <a
                  href='#enquiry'
                  onClick={() => posthog?.capture('studio_enquiry_cta_clicked')}
                  className={`inline-flex min-h-12 items-center rounded-full bg-black px-7 ${EYEBROW} tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange`}
                >
                  Tell us what you are building →
                </a>
                <p className={`${EYEBROW} tracking-[0.14em] text-black/60`}>
                  Limited partnerships. Founder-led.
                </p>
              </div>

              <span className='mt-14 block font-pixel text-xs tracking-[0.08em] text-black/40'>
                ヨンコ・レベル・スタジオ
              </span>
            </PixelPanel>

            <FounderSprite
              walkIn
              className='pointer-events-none absolute bottom-0 right-6 z-30 hidden w-[180px] lg:block xl:right-12 xl:w-[220px]'
            />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- EXPERTISE */}
      <section
        className='bg-black py-24 md:py-32'
        aria-labelledby='expertise-title'
      >
        <Container>
          <SectionGrid>
            <div>
              <p className={`mb-5 ${EYEBROW} text-orange`}>
                {'// WHERE WE HELP'}
              </p>
              <h2 id='expertise-title' className={`${HEADING} text-white`}>
                Areas of expertise
              </h2>
              <p className={`mt-10 ${BODY} text-white/70`}>
                Yonko Level is an independent product company and a selective
                product-engineering studio. We partner with teams to shape,
                build and improve ambitious mobile software—particularly where
                craft, reliability and unusual technical constraints matter.
              </p>
            </div>

            {expertise.map(({ Mark, title, description }) => (
              <article key={title}>
                <CellMarker>
                  <Mark className='h-14 w-14 md:h-16 md:w-16' />
                </CellMarker>
                <h3 className={`mt-8 ${CELL_TITLE} text-white`}>{title}</h3>
                <p className={`mt-5 ${BODY} text-white/70`}>{description}</p>
              </article>
            ))}
          </SectionGrid>
        </Container>
      </section>

      {/* ------------------------------------------------------------ PRODUCTS */}
      <section
        className='bg-black py-24 md:py-32'
        aria-labelledby='products-title'
      >
        <Container>
          <SectionGrid>
            <div>
              <p className={`mb-5 ${EYEBROW} text-orange`}>
                {'// PRODUCT COMPANY FIRST'}
              </p>
              <h2 id='products-title' className={`${HEADING} text-white`}>
                Products we have built
              </h2>
              <p className={`mt-10 ${BODY} text-white/70`}>
                We build and ship our own products. That first-hand experience
                is the foundation of every Studio partnership.
              </p>
            </div>

            {/* Left empty so the two products sit side by side on one row. */}
            <div aria-hidden='true' className='hidden md:block' />

            {products.map((product) => (
              <article key={product.name}>
                {/* Live App Store screenshots: each already carries its own
                    colour field, so the cell stays neutral behind them. */}
                <div className='flex aspect-[4/3] items-center justify-center gap-4 overflow-hidden bg-[#1a1a1a] p-6 sm:gap-6 sm:p-8'>
                  {product.shots.map((shot, index) => (
                    <div key={shot} className='relative h-full w-[44%]'>
                      <Image
                        src={shot}
                        alt={index === 0 ? product.shotAlt : ''}
                        fill
                        sizes='(min-width: 720px) 22vw, 44vw'
                        className='object-contain'
                      />
                    </div>
                  ))}
                </div>
                <div className='mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2'>
                  <h3 className={`${CELL_TITLE} text-white`}>{product.name}</h3>
                  <p className={`${MARKER} text-white/40`}>
                    {product.platforms}
                  </p>
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
        className='bg-black py-24 md:py-32'
        aria-labelledby='experience-title'
      >
        <Container>
          <SectionGrid>
            <PixelPanel
              color='#FCC552'
              className='min-h-[320px] md:min-h-[420px]'
              displacements={[
                { row: 0, col: -1, displaceX: 3, displaceY: -2 },
                { row: 4, col: 0, displaceX: -3, displaceY: 1 },
                { row: 7, col: -2, displaceX: 2, displaceY: 3 },
              ]}
            >
              <p className={`mb-5 ${EYEBROW} text-black/70`}>
                {'// SELECTED EXPERIENCE, NOT A CLIENT LIST'}
              </p>
              <h2 id='experience-title' className={`${HEADING} text-black`}>
                Selected experience
              </h2>
              <p className={`mt-10 ${BODY} text-black/80`}>
                Roles and product work from Ricardo’s career before Yonko Level
                Studio. These are past employers and projects, not Studio
                clients.
              </p>

              <ul role='list' className='mt-10 border-t border-black/20'>
                {experienceProof.map((item) => (
                  <li
                    key={item}
                    className='border-b border-black/20 py-5 text-base font-medium leading-7 text-black'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </PixelPanel>

            <ul role='list' className='contents'>
              {experience.map(({ domain, name, detail }) => (
                <li key={name}>
                  <CellMarker>
                    <p className={`${MARKER} text-white/40`}>{domain}</p>
                  </CellMarker>
                  <h3 className={`mt-8 ${CELL_TITLE} text-white`}>{name}</h3>
                  <p className={`mt-5 ${BODY} text-white/70`}>{detail}</p>
                </li>
              ))}
            </ul>
          </SectionGrid>
        </Container>
      </section>

      {/* -------------------------------------------------------- HOW WE WORK */}
      <section className='bg-black py-24 md:py-32' aria-labelledby='work-title'>
        <Container>
          <SectionGrid>
            <PixelPanel
              color='#007AFF'
              className='min-h-[320px] md:col-start-2 md:row-start-1 md:min-h-[420px]'
              displacements={[
                { row: 0, col: 1, displaceX: -2, displaceY: -3 },
                { row: 3, col: -1, displaceX: 4, displaceY: 1 },
                { row: 8, col: 2, displaceX: -1, displaceY: 4 },
              ]}
            >
              <p className={`mb-5 ${EYEBROW} text-white/70`}>
                {'// ENGAGEMENTS'}
              </p>
              <h2 id='work-title' className={`${HEADING} text-white`}>
                How we work
              </h2>
              <p className='mt-10 text-lg leading-9 text-white md:text-xl'>
                Start with a focused product health sprint. Continue with a
                bounded build partnership or ongoing fractional technical
                leadership where the work warrants it.
              </p>
            </PixelPanel>

            <ol role='list' className='contents'>
              {engagements.map(({ Mark, step, title, description }) => (
                <li key={title}>
                  <CellMarker>
                    <div className='flex items-center gap-4'>
                      <Mark className='h-12 w-12' />
                      <p className={`${MARKER} text-white/40`}>{step}</p>
                    </div>
                  </CellMarker>
                  <h3 className='mt-8 font-pixel text-base leading-snug text-white md:text-lg'>
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
        className='bg-black py-24 md:py-32'
        aria-labelledby='founder-title'
      >
        <Container>
          <SectionGrid>
            <PixelPanel
              color='#FE6A5A'
              className='min-h-[320px] md:min-h-[460px]'
              displacements={[
                { row: 0, col: 0, displaceX: -2, displaceY: -2 },
                { row: 5, col: -1, displaceX: 3, displaceY: 1 },
                { row: 9, col: 1, displaceX: -3, displaceY: 3 },
              ]}
            >
              <p className={`mb-5 ${EYEBROW} text-white/70`}>
                {'// FOUNDER-LED'}
              </p>
              <h2 id='founder-title' className={`${HEADING} text-white`}>
                Who you work with
              </h2>
              <div className={`mt-10 space-y-6 ${BODY} text-white`}>
                <p>
                  Yonko Level is led by Ricardo Abreu, a mobile product engineer
                  with experience shipping consumer software across creative
                  technology, transport, payments and high-reliability systems.
                </p>
                <p>
                  Ricardo works directly on every engagement. When a project
                  benefits from additional expertise, Yonko Level works with a
                  small network of trusted independent collaborators.
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

      {/* ------------------------------------------------------------- ENQUIRY */}
      <section
        id='enquiry'
        className='scroll-mt-8 bg-black py-24 md:py-32'
        aria-labelledby='enquiry-title'
      >
        <Container>
          <SectionGrid>
            <PixelPanel
              color='#FCC552'
              className='md:col-start-2 md:row-start-1'
              displacements={[
                { row: 0, col: -2, displaceX: 2, displaceY: -3 },
                { row: 3, col: 0, displaceX: -4, displaceY: 1 },
                { row: 9, col: -1, displaceX: 3, displaceY: 2 },
              ]}
            >
              <p className={`mb-5 ${EYEBROW} text-black/70`}>
                {'// START A CONVERSATION'}
              </p>
              <h2 id='enquiry-title' className={`${HEADING} text-black`}>
                Tell us what you are building
              </h2>
              <p className={`mt-10 ${BODY} text-black/80`}>
                Send us an email. The link opens a message with the useful
                questions already in it—answer what you can and leave the rest.
              </p>

              <a
                href={studioEmail}
                onClick={handleEnquiryStarted}
                className={`mt-10 inline-flex min-h-12 items-center rounded-full bg-black px-7 ${EYEBROW} tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-originalYellow`}
              >
                Start an email →
              </a>

              <p className='mt-8 text-sm leading-7 text-black/70'>
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

              <FounderSprite className='pointer-events-none mt-12 hidden w-[140px] lg:block' />
            </PixelPanel>

            <div>
              <CellMarker>
                <p className={`${MARKER} text-white/40`}>
                  {'// WHAT TO INCLUDE'}
                </p>
              </CellMarker>
              <ul role='list' className='mt-8 border-t border-white/10'>
                {enquiryPrompts.map((prompt) => (
                  <li
                    key={prompt}
                    className='border-b border-white/10 py-5 text-base leading-8 text-white/70'
                  >
                    {prompt}
                  </li>
                ))}
              </ul>
              <p className='mt-8 text-sm leading-7 text-white/40'>
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
