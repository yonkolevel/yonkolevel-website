'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Widget } from '@typeform/embed-react';
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

const expertise = [
  {
    Spot: CreateMark,
    title: 'CREATE',
    description:
      'New mobile products, technical prototypes, major features and architecture for ideas that need to become real.',
  },
  {
    Spot: StrengthenMark,
    title: 'STRENGTHEN',
    description:
      'Performance, production reliability, analytics, release processes, CI/CD and difficult technical modernisation.',
  },
  {
    Spot: ConnectMark,
    title: 'CONNECT',
    description:
      'Audio, MIDI, camera systems, hardware integrations, payments, location services and products that interact with the physical world.',
  },
] as const;

const products = [
  {
    name: 'MIDICIRCUIT',
    description:
      'A simple and approachable DAW for creating and sharing music. Record audio, lay down MIDI in real time, mix your tracks and export when you are ready. Works on iPhone, iPad and Mac.',
    href: '/products/midicircuit',
    image: '/products/midicircuit/midicircuit-multi-platform.png',
    imageAlt: 'Midicircuit running across Apple devices',
    background: '#FF5C24',
  },
  {
    name: 'INVISIBLE CAMERA',
    description:
      'Bypass Apple’s Deep Fusion and Smart HDR for authentic, film-like photos. See exactly what you will capture in real time—no surprises, no post-processing.',
    href: '/products/invisible-camera',
    image: '/products/invisible-camera/ic-app-store-preview.png',
    imageAlt: 'Invisible Camera app preview',
    background: '#F3B23F',
  },
] as const;

const experience = [
  'Mobile products used by hundreds of thousands of people.',
  'Critical production incidents reduced by 70%.',
  'Payments, fraud detection, location systems, analytics infrastructure, release management and large-scale React Native architecture.',
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

/** Pixels that break loose from the STUDIO block. Negative columns are
 * measured from its right edge, so they hold wherever the panel ends. */
const heroPixels = [
  { row: 0, col: 0, displaceX: -2, displaceY: -2 },
  { row: 0, col: 6, displaceX: 1, displaceY: -4 },
  { row: 3, col: 0, displaceX: -4, displaceY: 1 },
  { row: 6, col: 1, displaceX: -5, displaceY: -2 },
  { row: 8, col: 0, displaceX: -1, displaceY: 3 },
  { row: 8, col: 4, displaceX: 2, displaceY: 4 },
  { row: 1, col: -1, displaceX: 3, displaceY: -2 },
  { row: 4, col: -2, displaceX: 5, displaceY: 1 },
  { row: 7, col: -1, displaceX: 2, displaceY: 3 },
];

const studioEmail =
  'mailto:team@yonkolevel.com?subject=Yonko%20Level%20Studio%20enquiry';

/** Section head using the same rhythm as the homepage sections. */
/** Section header: eyebrow and title, above the grid and never inside it. */
function SectionHeader({
  id,
  eyebrow,
  title,
}: {
  id: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className='border-t border-white/10 pt-14 lg:pt-20'>
      <p className='mb-5 font-pixel text-xs uppercase tracking-[0.22em] text-orange'>
        {eyebrow}
      </p>
      <h2
        id={id}
        className='font-pixel text-2xl uppercase leading-tight tracking-tight text-white md:text-4xl'
      >
        {title}
      </h2>
    </div>
  );
}

/** The marker slot every grid cell opens with, so titles line up across a row. */
function CellMarker({ children }: { children?: React.ReactNode }) {
  return <div className='flex h-16 items-center'>{children}</div>;
}

/** The 2x2 content grid. Short sections simply leave a quadrant empty. */
function SectionGrid({
  children,
  spacing = 'mt-16 lg:mt-24',
}: {
  children: React.ReactNode;
  spacing?: string;
}) {
  return (
    <div
      className={`${spacing} grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:gap-x-20 lg:gap-y-24`}
    >
      {children}
    </div>
  );
}

const SPRITE_WALKING = '/images/illustrations/dev_walking.gif';
const SPRITE_IDLE = '/images/illustrations/dev_idle.gif';
const SPRITE_STILL = '/images/illustrations/dev_idle-static.png';

/**
 * The pre-rebrand pixel sprite of the founder. With `walkIn` it repeats the old
 * homepage hero sequence: walk in from the left, then settle into the idle loop.
 * The sprite faces right, so it has to travel rightwards to read correctly.
 * Visitors who prefer reduced motion get a single still frame.
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

/**
 * A block of content sitting on a solid pixel panel, the way the homepage
 * showcase sections do it: the panel is built from the grid, so a few pixels
 * break off its edge and fly into the surrounding space.
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
  displacements: {
    row: number;
    col: number;
    displaceX: number;
    displaceY: number;
  }[];
  className?: string;
  pad?: string;
  pixelSize?: number;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [cols, setCols] = React.useState(0);

  // The grid derives its columns from the panel width, so a column index only
  // means what we think it means once the panel has been measured.
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

  // A negative column counts back from the panel's right edge.
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
        animationDelay={0.15}
        animationDuration={0.5}
      />
      <div className={`relative z-40 ${pad}`}>{children}</div>
    </div>
  );
}

/**
 * A slim band of the hero's pixel grid, used once as a section transition:
 * a few pixels pop out of the field and the rest is negative space.
 */
function PixelBand() {
  return (
    <div aria-hidden='true' className='relative h-24 overflow-hidden md:h-32'>
      <PixelDisplacementGrid
        backgroundColor='#121212'
        holeColor='#000000'
        displacedPixelColor='#FE6A5A'
        pixelSize={24}
        displacements={[
          { row: 1, col: 4, displaceX: 3, displaceY: 1 },
          { row: 2, col: 11, displaceX: -4, displaceY: -1 },
          { row: 3, col: 21, displaceX: 5, displaceY: -2 },
        ]}
      />
    </div>
  );
}

export default function StudioClient() {
  const posthog = usePostHog();
  const enquiryStarted = React.useRef(false);

  const handleEnquiryStarted = () => {
    if (enquiryStarted.current) return;

    enquiryStarted.current = true;
    posthog?.capture('studio_enquiry_started', { method: 'typeform' });
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
              displacements={heroPixels}
            >
              <h1 id='studio-hero-title' className='font-pixel uppercase'>
                <span className='block text-xs tracking-[0.22em] text-black/60 md:text-sm'>
                  Yonko Level
                </span>
                <span className='mt-4 block text-[clamp(3.5rem,15vw,12rem)] leading-[0.85] tracking-tight text-black'>
                  Studio
                </span>
              </h1>

              <div className='mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10'>
                <a
                  href='#enquiry'
                  onClick={() => posthog?.capture('studio_enquiry_cta_clicked')}
                  className='inline-flex min-h-12 items-center rounded-full bg-black px-7 font-pixel text-xs uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange'
                >
                  Tell us what you are building →
                </a>
                <p className='font-pixel text-xs uppercase tracking-[0.14em] text-black/60'>
                  Limited partnerships. Founder-led.
                </p>
              </div>
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
        className='bg-black py-24 md:py-36'
        aria-labelledby='expertise-title'
      >
        <Container>
          <SectionHeader
            id='expertise-title'
            eyebrow='// WHERE WE HELP'
            title='Areas of expertise'
          />

          <SectionGrid>
            <div>
              <CellMarker />
              <p className='mt-8 text-lg leading-9 text-white/80 md:text-xl'>
                Yonko Level is an independent product company and a selective
                product-engineering studio. We partner with teams to shape,
                build and improve ambitious mobile software—particularly where
                craft, reliability and unusual technical constraints matter.
              </p>
            </div>

            {expertise.map(({ Spot, title, description }) => (
              <article key={title}>
                <CellMarker>
                  <Spot className='h-14 w-14 md:h-16 md:w-16' />
                </CellMarker>
                <h3 className='mt-8 font-pixel text-lg uppercase text-white md:text-xl'>
                  {title}
                </h3>
                <p className='mt-5 text-base leading-8 text-white/70'>
                  {description}
                </p>
              </article>
            ))}
          </SectionGrid>
        </Container>
      </section>

      {/* ------------------------------------------------------------ PRODUCTS */}
      <section
        className='bg-black py-24 md:py-36'
        aria-labelledby='products-title'
      >
        <Container>
          <SectionHeader
            id='products-title'
            eyebrow='// PRODUCT COMPANY FIRST'
            title='Products we have built'
          />

          <SectionGrid>
            <div>
              <p className='text-lg leading-9 text-white/80 md:text-xl'>
                We build and ship our own products. That first-hand experience
                is the foundation of every Studio partnership.
              </p>
            </div>

            {/* Left empty so the two products stay side by side on one row. */}
            <div aria-hidden='true' className='hidden md:block' />

            {products.map((product) => (
              <article key={product.name}>
                <div
                  className='relative aspect-[4/3] overflow-hidden'
                  style={{ backgroundColor: product.background }}
                >
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes='(min-width: 720px) 50vw, 100vw'
                    className='object-contain p-8 sm:p-12'
                  />
                </div>
                <h3 className='mt-8 font-pixel text-lg uppercase text-white md:text-xl'>
                  {product.name}
                </h3>
                <p className='mt-5 text-base leading-8 text-white/70'>
                  {product.description}
                </p>
                <Link
                  href={product.href}
                  className='mt-7 inline-flex items-center border-b border-orange pb-2 font-pixel text-xs uppercase tracking-[0.14em] text-white transition-colors hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-black'
                >
                  Explore {product.name} →
                </Link>
              </article>
            ))}
          </SectionGrid>
        </Container>
      </section>

      <PixelBand />

      {/* ---------------------------------------------------------- EXPERIENCE */}
      <section
        className='bg-black py-24 md:py-36'
        aria-labelledby='experience-title'
      >
        <Container>
          <SectionGrid spacing='border-t border-white/10 pt-14 lg:pt-20'>
            <PixelPanel
              color='#FCC552'
              className='min-h-[320px] md:min-h-[420px]'
              displacements={[
                { row: 0, col: 10, displaceX: 3, displaceY: -2 },
                { row: 4, col: 0, displaceX: -3, displaceY: 1 },
                { row: 8, col: 8, displaceX: 2, displaceY: 3 },
              ]}
            >
              <p className='mb-5 font-pixel text-xs uppercase tracking-[0.22em] text-black/70'>
                {'// FOUNDER EXPERIENCE, NOT A CLIENT LIST'}
              </p>
              <h2
                id='experience-title'
                className='font-pixel text-2xl uppercase leading-tight tracking-tight text-black md:text-4xl'
              >
                Selected experience
              </h2>
              <p className='mt-10 text-base leading-8 text-black/80 md:text-lg'>
                Selected highlights from Ricardo’s wider product-engineering
                career. These are not claims that previous employers were Yonko
                Level Studio clients.
              </p>
            </PixelPanel>

            <ul role='list' className='contents'>
              {experience.map((item, index) => (
                <li key={item}>
                  <CellMarker>
                    <p className='font-pixel text-xs tracking-[0.2em] text-white/40'>
                      0{index + 1}
                    </p>
                  </CellMarker>
                  <p className='mt-8 text-lg leading-8 text-white md:text-xl md:leading-9'>
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </SectionGrid>
        </Container>
      </section>

      {/* -------------------------------------------------------- HOW WE WORK */}
      <section className='bg-black py-24 md:py-36' aria-labelledby='work-title'>
        <Container>
          <SectionGrid spacing='border-t border-white/10 pt-14 lg:pt-20'>
            <PixelPanel
              color='#007AFF'
              className='min-h-[320px] md:col-start-2 md:row-start-1 md:min-h-[420px]'
              displacements={[
                { row: 0, col: 0, displaceX: -2, displaceY: -1 },
                { row: 1, col: 1, displaceX: -3, displaceY: 1 },
                { row: 5, col: 9, displaceX: 3, displaceY: 2 },
              ]}
            >
              <p className='mb-5 font-pixel text-xs uppercase tracking-[0.22em] text-white/70'>
                {'// ENGAGEMENTS'}
              </p>
              <h2
                id='work-title'
                className='font-pixel text-2xl uppercase leading-tight tracking-tight text-white md:text-4xl'
              >
                How we work
              </h2>

              <p className='mt-10 text-lg leading-9 text-white md:text-xl'>
                Start with a focused product health sprint. Continue with a
                bounded build partnership or ongoing fractional technical
                leadership where the work warrants it.
              </p>
              <p className='mt-6 font-pixel text-xs uppercase tracking-[0.16em] text-white/80'>
                One principal partnership at a time.
              </p>
            </PixelPanel>

            <ol role='list' className='contents'>
              {engagements.map(({ Mark, step, title, description }) => (
                <li key={title}>
                  <CellMarker>
                    <div className='flex items-center gap-4'>
                      <Mark className='h-12 w-12' />
                      <p className='font-pixel text-xs tracking-[0.2em] text-white/40'>
                        {step}
                      </p>
                    </div>
                  </CellMarker>
                  <h3 className='mt-8 font-pixel text-base leading-snug text-white md:text-lg'>
                    {title}
                  </h3>
                  <p className='mt-5 text-base leading-8 text-white/70'>
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </SectionGrid>
        </Container>
      </section>

      {/* ------------------------------------------------------------- FOUNDER */}
      <section
        className='bg-black py-24 md:py-36'
        aria-labelledby='founder-title'
      >
        <Container>
          <SectionGrid spacing='border-t border-white/10 pt-14 lg:pt-20'>
            <PixelPanel
              color='#FE6A5A'
              className='min-h-[320px] md:min-h-[420px]'
              displacements={[
                { row: 0, col: 0, displaceX: -2, displaceY: -2 },
                { row: 3, col: 9, displaceX: 3, displaceY: 1 },
                { row: 7, col: 1, displaceX: -3, displaceY: 2 },
              ]}
            >
              <p className='mb-5 font-pixel text-xs uppercase tracking-[0.22em] text-white/70'>
                {'// FOUNDER-LED'}
              </p>
              <h2
                id='founder-title'
                className='font-pixel text-2xl uppercase leading-tight tracking-tight text-white md:text-4xl'
              >
                Who you work with
              </h2>

              <div className='mt-10 space-y-6 text-base leading-8 text-white md:text-lg'>
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

            <div className='relative min-h-[320px] w-full overflow-hidden md:min-h-[420px]'>
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
        className='scroll-mt-8 bg-black py-24 md:py-36'
        aria-labelledby='enquiry-title'
      >
        <Container>
          <SectionHeader
            id='enquiry-title'
            eyebrow='// START A CONVERSATION'
            title='Tell us what you are building'
          />

          <SectionGrid>
            <PixelPanel
              color='#007AFF'
              className='md:col-start-2 md:row-start-1'
              displacements={[
                { row: 0, col: 8, displaceX: 2, displaceY: -2 },
                { row: 2, col: 0, displaceX: -3, displaceY: 1 },
                { row: 8, col: 9, displaceX: 3, displaceY: 1 },
              ]}
            >
              <p className='text-base leading-8 text-white md:text-lg'>
                The form asks for your name, email and a project description. In
                that description, include any useful context about your company,
                product or website, desired start date, expected investment and
                what a successful outcome would look like.
              </p>
              <p className='mt-6 text-sm leading-7 text-white/80'>
                We will only use these details to discuss your enquiry. Prefer
                email? Write to{' '}
                <a
                  href={studioEmail}
                  onClick={() =>
                    posthog?.capture('studio_enquiry_started', {
                      method: 'email',
                    })
                  }
                  className='font-medium text-white underline decoration-2 underline-offset-4 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue1'
                >
                  team@yonkolevel.com
                </a>
                .
              </p>

              <FounderSprite className='pointer-events-none mt-14 hidden w-[150px] lg:block' />
            </PixelPanel>

            <div className='min-h-[660px] overflow-hidden bg-white'>
              <Widget
                id='JpaDXdWY'
                height={660}
                lazy
                iframeProps={{ title: 'Yonko Level Studio project enquiry' }}
                onReady={() => posthog?.capture('studio_enquiry_form_loaded')}
                onStarted={handleEnquiryStarted}
                onSubmit={() =>
                  posthog?.capture('studio_enquiry_submitted', {
                    method: 'typeform',
                  })
                }
              />
            </div>
          </SectionGrid>
        </Container>
      </section>
    </div>
  );
}
