'use client';
import { motion } from 'framer-motion';
import Container from './Container';
import PhoneMockup from './PhoneMockup';
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
    <section className='py-20 bg-white relative overflow-hidden min-h-screen'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full min-h-screen'>
        {/* Left side - Decorative elements and phone mockup */}
        <div className='relative lg:col-span-7 relative'>
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
        <div className='relative lg:col-span-5'>
          <div className='app-description-container grid'>
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
