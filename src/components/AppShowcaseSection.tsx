'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import PixelDisplacementGrid from './PixelDisplacementGrid';
import Link from 'next/link';

interface AppShowcaseSectionProps {
  appName: string;
  appDescription: string;
  appScreenshot?: string;
  videoSource?: string;
  mediaType: 'image' | 'video';
  learnMoreLink: string;
  decorativeText?: string[];
  backgroundColor?: string;
  backgroundColorGrid?: string;
  sectionBackgroundColor?: string;
  reversed?: boolean;
  pixelDisplacements?: Array<{
    row: number;
    col: number;
    displaceX: number;
    displaceY: number;
  }>;
  contentSafeZones?: Array<{
    startRow: number;
    endRow: number;
    startCol: number;
    endCol: number;
  }>;
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
  videoSource,
  mediaType,
  learnMoreLink,
  sectionBackgroundColor = '#F8FAFC',
  backgroundColorGrid = '#007AFF',
  reversed = false,
  pixelDisplacements,
  contentSafeZones,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to split text into chunks of 4 characters
  const splitIntoChunks = (text: string, chunkSize: number = 4) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Default pixel displacements if none provided
  const defaultPixelDisplacements = [
    { row: 0, col: 1, displaceX: -2, displaceY: 1 }, // Row 0, Col 1: left 2x, down 1x
    { row: 1, col: 0, displaceX: -2, displaceY: 1 }, // Row 1, Col 0: left 2x, down 1x
    { row: 2, col: 2, displaceX: -3, displaceY: -1 }, // Row 2, Col 2: left 3x, up 1x
    { row: 4, col: 1, displaceX: 2, displaceY: -2 }, // Row 4, Col 1: right 2x, up 2x
    { row: 6, col: 0, displaceX: -1, displaceY: 2 }, // Row 6, Col 0: left 1x, down 2x
  ];

  // Default content-safe zones (typical areas where text content appears)
  const defaultContentSafeZones = [
    { startRow: 2, endRow: 4, startCol: 0, endCol: 2 }, // Title area
    { startRow: 5, endRow: 8, startCol: 0, endCol: 3 }, // Description area
    { startRow: 9, endRow: 10, startCol: 0, endCol: 2 }, // Button area
  ];

  // Function to check if a displacement is in a content-safe zone
  const isInSafeZone = (
    displacement: { row: number; col: number },
    safeZones: typeof defaultContentSafeZones
  ) => {
    return safeZones.some(
      (zone) =>
        displacement.row >= zone.startRow &&
        displacement.row <= zone.endRow &&
        displacement.col >= zone.startCol &&
        displacement.col <= zone.endCol
    );
  };

  // Use provided displacements or defaults, then filter out those in safe zones
  const activeDisplacements = pixelDisplacements || defaultPixelDisplacements;
  const activeSafeZones = contentSafeZones || defaultContentSafeZones;

  const safePixelDisplacements = activeDisplacements.filter(
    (displacement) => !isInSafeZone(displacement, activeSafeZones)
  );

  const padding = mediaType === 'video' ? '0' : reversed ? 'pl-12' : 'pr-12';

  // Define the left and right content based on media type
  const leftContent = (
    <div
      className={`relative lg:col-span-7 ${padding} ${
        reversed ? 'text-right' : ''
      }`}
    >
      {mediaType === 'video' ? (
        // Video mode: full container video or animated GIF
        <div className='w-full h-full min-h-screen flex items-center justify-center bg-black'>
          {videoSource?.endsWith('.gif') ? (
            <img
              className='w-full h-full object-cover'
              src={videoSource}
              alt={`${appName} demo`}
            />
          ) : (
            <video
              className='w-full h-full object-cover min-screen min-h-screen'
              autoPlay
              loop
              muted
              playsInline
              onError={(e) => {
                console.error('Video failed to load:', e);
              }}
            >
              <source src={videoSource} type='video/mp4' />
              <source
                src={videoSource?.replace('.mp4', '.webm')}
                type='video/webm'
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ) : (
        // Image mode: chunked text with image overlay (current behavior)
        <>
          <h2
            className={`font-pixel max-w-md ${reversed ? 'ml-auto' : ''}`}
            style={{ fontSize: '160px', color: backgroundColorGrid }}
          >
            {splitIntoChunks(appName).map((chunk, index) => (
              <div key={index}>{chunk}</div>
            ))}
          </h2>
          {appScreenshot && (
            <img
              className='app-image w-[320.15px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'
              src={appScreenshot}
              alt={appName}
            />
          )}
        </>
      )}
    </div>
  );

  const rightContent = (
    <div
      ref={containerRef}
      className='app-description-container relative lg:col-span-5 h-full'
      style={{ backgroundColor: backgroundColorGrid }}
    >
      {/* Pixel displacement grid */}
      <PixelDisplacementGrid
        backgroundColor={backgroundColorGrid}
        holeColor={sectionBackgroundColor}
        displacedPixelColor={backgroundColorGrid}
        pixelSize={80}
        displacements={safePixelDisplacements}
        animationDelay={0.3}
        animationDuration={0.3}
      />

      {/* App description content */}
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={sectionVariants}
        className='relative z-40 p-12 md:p-16 h-full flex flex-col justify-center'
      >
        <h2 className='font-pixel text-3xl md:text-4xl text-white mb-8'>
          {appName}
        </h2>

        <p className='font-body text-sm md:text-base text-white opacity-90 mb-8 leading-relaxed pb-12'>
          {appDescription}
        </p>

        <Link
          href={learnMoreLink}
          className='inline-flex items-center font-pixel text-white text-xl opacity-90 hover:opacity-100 transition-opacity'
        >
          Learn more →
        </Link>
      </motion.div>
    </div>
  );

  return (
    <section className='bg-white relative overflow-hidden min-h-screen overflow-hidden'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-0 items-center h-full min-h-screen'>
        {/* Conditionally render content based on reversed prop */}
        {reversed ? (
          <>
            {rightContent}
            {leftContent}
          </>
        ) : (
          <>
            {leftContent}
            {rightContent}
          </>
        )}
      </div>
    </section>
  );
};

export default AppShowcaseSection;
