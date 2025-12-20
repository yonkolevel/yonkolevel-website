/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import Container from '@/components/Container';
import RicardoIdle from '@/components/placeholders/RicardoIdle';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'About Us - Designers & Developers',
  description:
    'Building delightful apps and digital experiences with my friends.',
  keywords: [
    'app development',
    'iOS apps',
    'audio apps',
    'native apps',
    'creative studio',
    'Midicircuit',
    'Invisible Camera',
    'Yonko Level',
  ],
  openGraph: {
    title: 'About Yonko Level - Designers & Developers',
    description:
      'Building delightful apps and digital experiences with my friends.',
    url: 'https://yonkolevel.com/about',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yonko Level Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Yonko Level - Designers & Developers',
    description:
      'Meet the Yonko Level team. Your remote friendly tech and design team.',
    images: ['/images/og-image.jpg'],
  },
};

interface IAboutUsPageProps {}

const AboutUsPage: React.FunctionComponent<IAboutUsPageProps> = (props) => {
  return (
    <div>
      <section className='bg-originalYellow'>
        <div className='py-16'>
          <Container>
            <div className='pb-10'>
              <h1 className='font-pixel text-3xl text-blue2'>Who we are</h1>
            </div>
            <div className='grid grid-cols-2 gap-[40px]'>
              <div className='col-span-2 md:col-span-1 prose'>
                <h1 className='font-pixel text-black'>Designers</h1>

                <p className='text-black'>
                  Historically, the main area of design was regarded as only
                  architecture, which was understood as the major art. The
                  design of clothing, furniture, and other common artefacts was
                  left mostly to tradition or artisans specializing in
                  hand-making them With the increasing complexity in industrial
                  design of today&apos;s society, and due to the need for mass
                  production where more time is usually associated with more
                  cost, the production methods became more.
                </p>
              </div>
              <div className='col-span-2 md:col-span-1 flex self-center justify-center'>
                <img
                  className='w-[270px]'
                  src='/images/illustrations/digital_pen.png'
                  alt="A designer's digital pen"
                />
              </div>
            </div>
          </Container>
        </div>

        <div className='py-16'>
          <Container>
            <div className='grid grid-cols-2 gap-[40px] reverse'>
              <div className='col-span-2 md:col-span-1 flex self-center justify-center order-2 md:order-[-1]'>
                <img
                  className='w-[270px]'
                  src='/images/illustrations/keyboard.png'
                  alt='A computer keyboard'
                />
              </div>
              <div className='col-span-2 md:col-span-1 prose'>
                <h1 className='font-pixel text-black'>Developers</h1>

                <p className='text-black'>
                  A developer is a key individual behind all software
                  applications. Generally, developers are well versed in at
                  least one programming language and proficient in the art of
                  structuring and developing software code for software or a
                  program. Depending on the job role and type of software
                  developed, a developer may be classified as a software
                  developer, application developer, mobile developer, Web
                  developer, etc.
                </p>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <section className='bg-white'>
        <div className='py-16'>
          <Container>
            <div className='pb-10'>
              <h1 className='font-pixel text-3xl text-blue2'>How we do it</h1>
            </div>
            <div className='grid grid-cols-2 gap-[40px]'>
              <div className='col-span-2 md:col-span-1 prose'>
                <h1 className='font-pixel text-black'>Nakama</h1>

                <p className='text-black'>
                  Building a professional and friendly environment is very
                  important to develop a good project as a team. Communication,
                  trust and respect between both parties are essential for the
                  success of a project. As friends, we want to work closely with
                  your team so we can better comprehend your needs and vision,
                  enabling us to keep you updated on project progress and
                  receive your feedback. We aim to make everyone feel included
                  by sharing knowledge and opinions. We believe these impact the
                  success of the final product.
                </p>
              </div>
              <div className='col-span-2 md:col-span-1 flex self-center justify-center'>
                <img
                  className='w-[270px]'
                  src='/images/illustrations/fist_pump.gif'
                  alt='Two fists bumping into each other in a friendly manner'
                />
              </div>
            </div>
          </Container>
        </div>

        <div className='py-16'>
          <Container>
            <div className='grid grid-cols-2 gap-[40px] reverse'>
              <div className='col-span-2 md:col-span-1 flex self-center justify-center order-2 md:order-[-1]'>
                <img
                  className='w-[270px]'
                  src='/images/illustrations/sprint_run.webp'
                  alt='An illustration of person running in a sprint'
                />
              </div>
              <div className='col-span-2 md:col-span-1 prose'>
                <h1 className='font-pixel text-black'>Sprint</h1>

                <p className='text-black'>
                  We use Sprints to quickly assess the possibility of success of
                  a product to minimize risks. It is like seeing the future
                  before we invest too much time and money in product
                  development. This tool helps define goals and validate
                  assumptions when testing the product at the end of a Sprint.
                  Each project requires a different approach, this tool is
                  versatile and can be adapted to better fit the needs of your
                  product/project.
                </p>
              </div>
            </div>
          </Container>
        </div>

        <div className='py-16'>
          <Container>
            <div className='grid grid-cols-2 gap-[40px] reverse'>
              <div className='col-span-2 md:col-span-1 flex self-center justify-center order-2 md:order-[-1]'>
                <img
                  className='w-[270px]'
                  src='/images/illustrations/project_management.gif'
                  alt='An illustration with different elements related to managing a project'
                />
              </div>
              <div className='col-span-2 md:col-span-1 prose'>
                <h1 className='font-pixel text-black'>Project Management</h1>

                <p className='text-black'>
                  The brand visuals are based on these values, professional,
                  trustworthy, modern and clean. They seemed appropriated for
                  the field of operation, and also important for the customers.
                  I opted for a minimalistic approach reducing the visual
                  content to what is important. Another element that guided my
                  decisions was the logotype it wasn't created by me and there
                  was no briefing soo I imagined which kind of brand will fit
                  that logo.
                </p>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <section className='py-16'>
        <Container>
          <div className='grid grid-cols-2'>
            <div className='col-span-1 self-center'>
              <h1 className='font-pixel text-blue2 mb-8'>
                Let’s work together!
              </h1>
              <p>
                We will help you make your product a reality. Working closely,
                we will certainly achieve the best results.
              </p>
            </div>

            <div className='col-span-1  scale-x-[-1]'>
              <RicardoIdle />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutUsPage;
