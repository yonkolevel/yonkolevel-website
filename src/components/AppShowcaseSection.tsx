'use client';
import { motion } from 'framer-motion';
import Container from './Container';
import PhoneMockup from './PhoneMockup';
import PixelGrid from './PixelGrid';
import Link from 'next/link';

interface AppShowcaseSectionProps {
  appName: string;
  appDescription: string;
  appScreenshot: string;
  learnMoreLink: string;
  decorativeText?: string[];
  backgroundColor?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

const AppShowcaseSection: React.FC<AppShowcaseSectionProps> = ({
  appName,
  appDescription,
  appScreenshot,
  learnMoreLink,
  decorativeText = ['I', 'N', 'V', 'I', 'S', 'I', 'B', 'L', 'E'],
  backgroundColor = 'bg-blue2',
}) => {
  // Function to split text into chunks of 4 characters
  const splitIntoChunks = (text: string, chunkSize: number = 4) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  };

  return (
    <section className='bg-white relative overflow-hidden min-h-screen'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-0 items-center h-full min-h-screen'>
        {/* Left side - Decorative elements and phone mockup */}
        <div className='relative lg:col-span-7 relative px-12'>
          <h2
            className='font-departure-mono text-blue2 max-w-md'
            style={{ fontSize: '160px' }}
          >
            {splitIntoChunks(appName).map((chunk, index) => (
              <div key={index}>{chunk}</div>
            ))}
          </h2>
          <img
            className='app-image w-[393.15px] h-[784px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'
            src={appScreenshot}
            alt={appName}
          />
        </div>

        {/* Right side - App description with pixel grid background */}
        <div className='app-description-container relative lg:col-span-5 h-full bg-blue2'>
          {/* Pixel grid background that fills top to bottom of section */}
          {/* <PixelGrid backgroundColor={backgroundColor} /> */}

          {/* App description content */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={sectionVariants}
            className='relative z-10 p-12 md:p-16 h-full flex flex-col justify-center'
          >
            <h2 className='font-departure-mono text-3xl md:text-4xl text-white mb-8'>
              {appName}
            </h2>

            <p className='font-departure-mono text-sm md:text-base text-white opacity-90 mb-8 leading-relaxed'>
              {appDescription}
            </p>

            <Link
              href={learnMoreLink}
              className='inline-flex items-center font-departure-mono text-white opacity-90 hover:opacity-100 transition-opacity'
            >
              Learn more →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
