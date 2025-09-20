'use client';
import RightThingPixelBottom from '@/components/shapes/RightThingPixelBottom';
import { motion, useAnimation } from 'framer-motion';
import Head from 'next/head';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import Container from '../components/Container';
import PlayDate from '../components/PlayDate';
import SplitText from '../components/SplitText';
import USPCard from '../components/USPCard';
import RicardoIdle from '../components/placeholders/RicardoIdle';
import RicardoWalking from '../components/placeholders/RicardoWalking';
import { PopupButton } from '@typeform/embed-react';

const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.75, ease: 'easeOut' } },
};

const uspsSectionVariants = {
  hidden: {
    opacity: 0,
    y: 500,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

// hero section definitions
const walkingVariants = {
  hidden: {
    // opacity: 0,
    x: 'calc(-20vw - 273px)',
  },
  walking: {
    opacity: 1,
    x: 0,
    transition: { duration: 3, ease: 'easeOut' },
  },
  hide: {
    display: 'none',
  },
};

const idleVariants = {
  hidden: {
    display: 'none',
  },
  visible: {
    display: 'block',
  },
};

const titleVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

const Home = () => {
  const walkingControls = useAnimation();
  const idleControls = useAnimation();
  const heroControls = useAnimation();
  const heroSubControls = useAnimation();
  const heroButtonControls = useAnimation();
  const { ref: uspsSectionRef, inView: uspsSectionInView } = useInView();
  const uspsSectionControls = useAnimation();

  const sequence = useCallback(async () => {
    await idleControls.start('hidden');
    await walkingControls.start('hidden');
    await walkingControls.start('walking');
    await walkingControls.start('hide');
    await idleControls.start('visible');
    await heroControls.start('visible');
    await heroSubControls.start('visible');
    await heroButtonControls.start('visible');
    await uspsSectionControls.start('visible');
  }, [idleControls, walkingControls, heroControls, heroSubControls, heroButtonControls, uspsSectionControls]);

  useEffect(() => {
    sequence();
  }, [sequence]);

  return (
    <div>
      <Head>
        <title>Yonko Level</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <section className='mb-60 relative top-[25%]'>
          <div className='grid grid-cols-4 gap-4'>
            <div className='col-span-4 md:col-span-2'>
              <motion.div variants={item}>
                <div className='mb-8'>
                  <div>
                    <h1 className='font-pixel text-xl md:text-2xl text-blue2'>
                      <SplitText
                        initial='hidden'
                        animate={heroControls}
                        variants={titleVariants}
                      >
                        Software & Design Production Team
                      </SplitText>
                    </h1>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial='hidden'
                variants={item}
                animate={heroControls}
              >
                <p className='mb-16 text-black'>
                  We pride ourselves in building in-house software solutions
                  that delight users as well as helping companies deliver
                  stunning and high quality experiences to their customers.
                </p>
              </motion.div>
              <motion.div
                initial='hidden'
                animate={heroButtonControls}
                variants={item}
                className='text-center md:text-left'
              >
                <PopupButton id='JpaDXdWY' autoClose>
                  <Button>Start Project</Button>
                </PopupButton>
              </motion.div>
            </div>

            <div className='col-span-4 md:col-span-2 my-10'>
              <div className='relative scale-x-[-1] lg:block'>
                <motion.div
                  initial='hidden'
                  animate={walkingControls}
                  variants={walkingVariants}
                  className='w-[270px]'
                >
                  <RicardoWalking />
                </motion.div>

                <motion.div
                  initial='hidden'
                  animate={idleControls}
                  variants={idleVariants}
                  className='w-[270px]'
                >
                  <RicardoIdle />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <section>
        <Container>
          <motion.div
            initial='hidden'
            animate={uspsSectionControls}
            variants={uspsSectionVariants}
            ref={uspsSectionRef}
          >
            <div className='grid grid-cols-2 gap-8'>
              <div className='col-span-2 md:col-span-1'>
                <div className='h-[100%]'>
                  <USPCard
                    title='Native'
                    description="We're experts in building immersive native applications. Be it on iOS, macOS or Android with SwiftUI and React-Native"
                    backgroundImage='/images/usp-native.webp'
                    variant='blue'
                  />
                </div>
              </div>
              <div className='col-span-2 md:col-span-1 gap-y-8'>
                <div className='pb-8 md:h-[300px]'>
                  <USPCard
                    title='Web'
                    description='We transform early-stage ideas into dynamic digital realities. Our expertise ranges from initial prototyping for startups to sophisticated, interactive websites using cutting-edge technologies like React and NextJS.'
                    variant='yellow'
                  />
                </div>
                <div className='h-[100%] md:h-[300px]'>
                  <USPCard
                    title='Design'
                    description='UX and UI Design are part of our DNA. We have developed a set of principles and design processes that helps us deliver beautiful products or help you visualise the most complex ideas'
                    variant='orange'
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className='bg-black h-[540px] overflow-hidden my-[128px] p-36 right-thing-section'>
        <Container>
          <PlayDate />
        </Container>
        <div className='reverse-pixel-fade'>
          <RightThingPixelBottom />
        </div>
      </section>

      {/* <BlogBlock /> */}

      <section className='py-14 relative text-center'>
        <div className='container mx-auto'>
          <div className='text-center'>
            <h2 className='text-blue2 mb-[16px] text-xl font-pixel'>
              Let’s work together!
            </h2>
            <span className='mb-[80px] block text-black'>
              We will help you to make your product a reality. Working closely,
              we will certainly achieve the best results.
            </span>

            <PopupButton id='JpaDXdWY' autoClose>
              <Button>Start Project</Button>
            </PopupButton>
          </div>
          <Container>
            <div className='absolute left-[-40px] z-10 w-[270px]'>
              <RicardoIdle />
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
};

export default Home;
