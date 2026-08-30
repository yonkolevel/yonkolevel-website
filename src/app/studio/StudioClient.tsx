'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Widget } from '@typeform/embed-react';
import { usePostHog } from 'posthog-js/react';
import Container from '@/components/Container';

const expertise = [
  {
    title: 'CREATE',
    description:
      'New mobile products, technical prototypes, major features and architecture for ideas that need to become real.',
  },
  {
    title: 'STRENGTHEN',
    description:
      'Performance, production reliability, analytics, release processes, CI/CD and difficult technical modernisation.',
  },
  {
    title: 'CONNECT',
    description:
      'Audio, MIDI, camera systems, hardware integrations, payments, location services and products that interact with the physical world.',
  },
] as const;

const products = [
  {
    name: 'Midicircuit',
    description:
      'A simple and approachable DAW for creating and sharing music. Record audio, lay down MIDI in real time, mix your tracks and export when you are ready. Works on iPhone, iPad and Mac.',
    href: '/products/midicircuit',
    image: '/products/midicircuit/midicircuit-multi-platform.png',
    imageAlt: 'Midicircuit running across Apple devices',
    background: '#FF5C24',
  },
  {
    name: 'Invisible Camera',
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
    title: 'Mobile Product Health Sprint',
    description:
      'A focused assessment of architecture, crashes, performance, reliability, analytics, observability, testing, release processes and technical risk. The outcome is a written assessment and prioritised plan.',
    label: 'START HERE',
  },
  {
    title: 'Focused Build Partnership',
    description:
      'A bounded engagement organised around one meaningful outcome: shipping a major feature, stabilising a product, building a technical prototype, modernising a critical flow, or preparing an application for launch or scale.',
    label: 'BUILD',
  },
  {
    title: 'Fractional Product Engineering Lead',
    description:
      'Ongoing technical direction, architecture, mentoring, production ownership and selective implementation for teams that need senior mobile leadership without a full-time hire.',
    label: 'LEAD',
  },
] as const;

const studioEmail =
  'mailto:team@yonkolevel.com?subject=Yonko%20Level%20Studio%20enquiry';

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
      <section
        className='relative overflow-hidden border-b border-white/10 bg-black py-24 sm:py-32 lg:py-40'
        aria-labelledby='studio-hero-title'
      >
        <div
          aria-hidden='true'
          className='absolute inset-y-0 right-0 hidden w-1/2 opacity-20 md:block'
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div
          aria-hidden='true'
          className='absolute right-[8%] top-16 hidden h-12 w-12 bg-orange sm:block sm:h-16 sm:w-16'
        />

        <Container>
          <div className='relative z-10 max-w-5xl'>
            <p className='mb-7 font-pixel text-xs uppercase tracking-[0.22em] text-orange'>
              Yonko Level Studio
            </p>
            <h1
              id='studio-hero-title'
              className='max-w-5xl font-pixel text-2xl leading-tight tracking-tight text-white sm:text-3xl md:text-5xl'
            >
              SOME PRODUCTS ARE HARD TO MAKE WELL.
              <br />
              <span className='text-orange'>THOSE ARE OUR FAVOURITE.</span>
            </h1>

            <div className='mt-10 max-w-3xl space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9'>
              <p>
                Yonko Level is an independent product company and a selective
                product-engineering studio.
              </p>
              <p>
                We partner with teams to shape, build and improve ambitious mobile
                software—particularly where craft, reliability and unusual technical
                constraints matter.
              </p>
            </div>

            <div className='mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8'>
              <a
                href='#enquiry'
                onClick={() => posthog?.capture('studio_enquiry_cta_clicked')}
                className='inline-flex min-h-14 items-center bg-orange px-6 font-pixel text-xs uppercase tracking-[0.12em] text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black'
              >
                Tell us what you are building →
              </a>
              <p className='font-pixel text-xs uppercase tracking-[0.14em] text-white/50'>
                Limited partnerships. Founder-led.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className='bg-[#121212] py-20 md:py-28' aria-labelledby='expertise-title'>
        <Container>
          <div className='max-w-3xl'>
            <p className='mb-4 font-pixel text-xs uppercase tracking-[0.22em] text-orange'>
              Where we help
            </p>
            <h2
              id='expertise-title'
              className='font-pixel text-2xl uppercase tracking-tight text-white md:text-4xl'
            >
              Areas of expertise
            </h2>
          </div>

          <div className='mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3'>
            {expertise.map((area, index) => (
              <article
                key={area.title}
                className='border border-white/10 border-t-orange bg-white/[0.03] p-7 sm:p-9'
              >
                <p className='font-pixel text-xs tracking-[0.18em] text-white/60'>
                  0{index + 1}
                </p>
                <h3 className='mt-10 font-pixel text-xl text-white sm:text-2xl'>
                  {area.title}
                </h3>
                <p className='mt-5 text-base leading-8 text-white/65'>
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className='bg-white py-20 text-black md:py-28' aria-labelledby='products-title'>
        <Container>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16'>
            <div>
              <p className='mb-4 font-pixel text-xs uppercase tracking-[0.22em] text-[#A33118]'>
                Product company first
              </p>
              <h2
                id='products-title'
                className='font-pixel text-2xl uppercase tracking-tight md:text-4xl'
              >
                Products we have built
              </h2>
            </div>
            <p className='max-w-2xl text-lg leading-8 text-black/65 lg:pt-9'>
              We build and ship our own products. That first-hand experience is the
              foundation of every Studio partnership.
            </p>
          </div>

          <div className='mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2'>
            {products.map((product) => (
              <article key={product.name} className='border border-black/10 bg-white'>
                <div
                  className='relative aspect-[4/3] overflow-hidden'
                  style={{ backgroundColor: product.background }}
                >
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes='(min-width: 1025px) 50vw, 100vw'
                    className='object-contain p-8 sm:p-12'
                  />
                </div>
                <div className='p-7 sm:p-9'>
                  <h3 className='font-pixel text-2xl uppercase sm:text-3xl'>
                    {product.name}
                  </h3>
                  <p className='mt-5 text-base leading-8 text-black/65'>
                    {product.description}
                  </p>
                  <Link
                    href={product.href}
                    className='mt-8 inline-flex border-b border-orange pb-2 font-pixel text-xs uppercase tracking-[0.14em] text-black transition-colors hover:text-[#A33118] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-white'
                  >
                    Explore {product.name} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        className='bg-originalYellow py-20 text-black md:py-28'
        aria-labelledby='experience-title'
      >
        <Container>
          <div className='grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20'>
            <div>
              <p className='mb-4 font-pixel text-xs uppercase tracking-[0.22em] text-black/70'>
                Founder experience, not a client list
              </p>
              <h2
                id='experience-title'
                className='font-pixel text-2xl uppercase tracking-tight md:text-4xl'
              >
                Selected experience
              </h2>
              <p className='mt-6 max-w-lg text-base leading-8 text-black/65'>
                These are selected highlights from Ricardo’s wider product-engineering
                experience, not claims about previous employers being Yonko Level Studio
                clients.
              </p>
            </div>

            <ol className='border-t border-black/20'>
              {experience.map((item, index) => (
                <li
                  key={item}
                  className='grid grid-cols-[2.5rem_1fr] gap-4 border-b border-black/20 py-7 sm:grid-cols-[4rem_1fr] sm:py-9'
                >
                  <span className='font-pixel text-xs tracking-[0.16em] text-black/65'>
                    0{index + 1}
                  </span>
                  <p className='text-lg font-medium leading-8 sm:text-xl'>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className='bg-black py-20 md:py-28' aria-labelledby='work-title'>
        <Container>
          <div className='max-w-3xl'>
            <p className='mb-4 font-pixel text-xs uppercase tracking-[0.22em] text-orange'>
              Engagements
            </p>
            <h2
              id='work-title'
              className='font-pixel text-2xl uppercase tracking-tight text-white md:text-4xl'
            >
              How we work
            </h2>
          </div>

          <div className='mt-12 grid grid-cols-1 gap-px bg-white/10 lg:grid-cols-3'>
            {engagements.map((engagement) => (
              <article key={engagement.title} className='bg-black p-7 sm:p-9'>
                <p className='font-pixel text-xs uppercase tracking-[0.18em] text-orange'>
                  {engagement.label}
                </p>
                <h3 className='mt-8 font-pixel text-xl leading-snug text-white sm:text-2xl'>
                  {engagement.title}
                </h3>
                <p className='mt-5 text-base leading-8 text-white/65'>
                  {engagement.description}
                </p>
              </article>
            ))}
          </div>

          <div className='mt-12 max-w-4xl border-l-4 border-orange pl-6 sm:pl-8'>
            <p className='text-lg leading-8 text-white/75 sm:text-xl'>
              Start with a focused product health sprint. Continue with a bounded build
              partnership or ongoing fractional technical leadership where the work
              warrants it.
            </p>
            <p className='mt-5 font-pixel text-xs uppercase tracking-[0.16em] text-white'>
              We take on one principal partnership at a time.
            </p>
          </div>
        </Container>
      </section>

      <section className='bg-white py-20 text-black md:py-28' aria-labelledby='founder-title'>
        <Container>
          <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
            <div className='relative aspect-[4/5] overflow-hidden bg-originalYellow'>
              <Image
                src='/products/midicircuit/press/photo-ricardo.jpg'
                alt='Ricardo Abreu, founder of Yonko Level'
                fill
                sizes='(min-width: 1025px) 50vw, 100vw'
                className='object-cover'
              />
            </div>

            <div>
              <p className='mb-4 font-pixel text-xs uppercase tracking-[0.22em] text-[#A33118]'>
                Founder-led
              </p>
              <h2
                id='founder-title'
                className='font-pixel text-2xl uppercase tracking-tight md:text-4xl'
              >
                Who you work with
              </h2>
              <div className='mt-8 space-y-6 text-lg leading-9 text-black/65'>
                <p>
                  Yonko Level is led by Ricardo Abreu, a mobile product engineer with
                  experience shipping consumer software across creative technology,
                  transport, payments and high-reliability systems.
                </p>
                <p>
                  Ricardo works directly on every engagement. When a project benefits
                  from additional expertise, Yonko Level works with a small network of
                  trusted independent collaborators.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id='enquiry'
        className='scroll-mt-8 bg-black py-20 md:py-28'
        aria-labelledby='enquiry-title'
      >
        <Container>
          <div className='grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20'>
            <div>
              <p className='mb-4 font-pixel text-xs uppercase tracking-[0.22em] text-orange'>
                Start a conversation
              </p>
              <h2
                id='enquiry-title'
                className='font-pixel text-2xl uppercase tracking-tight text-white md:text-4xl'
              >
                Tell us what you are building
              </h2>
              <p className='mt-7 text-base leading-8 text-white/65'>
                The existing project form requires your name, email and a project
                description. In that description, include any useful context about your
                company, product or website, desired start date, expected investment and
                what a successful outcome would look like.
              </p>
              <p className='mt-5 text-sm leading-7 text-white/65'>
                Expected investment: Under £10k · £10k–£25k · £25k–£50k · £50k+ ·
                Not sure yet
              </p>
            </div>

            <div>
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
              <p className='mt-5 text-sm leading-7 text-white/65'>
                We will only use these details to discuss your enquiry.
              </p>
              <p className='mt-3 text-sm leading-7 text-white/65'>
                If the form is unavailable, email{' '}
                <a
                  href={studioEmail}
                  onClick={() =>
                    posthog?.capture('studio_enquiry_started', {
                      method: 'email',
                    })
                  }
                  className='text-white underline decoration-orange underline-offset-4 transition-colors hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-black'
                >
                  team@yonkolevel.com
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
