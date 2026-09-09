'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import PixelDisplacementGrid from './PixelDisplacementGrid';
import Link from 'next/link';
import { HEADING, LEAD } from '@/lib/typography';

const PIXEL_SIZE = 40;
/** Below this the panel is narrow enough that the copy runs its full width. */
const NARROW_PANEL_COLS = 12;

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
  backgroundImage?: string;
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
    transition: { duration: 0.75 },
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
  backgroundImage,
  reversed = false,
  pixelDisplacements,
  contentSafeZones,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Rows the copy occupies, measured rather than declared.
   *
   * The safe zones below are written in grid cells for the wide layout, where
   * the copy sits in the first few columns. Once the panel narrows the copy
   * runs full width and those column bounds stop describing it, so squares
   * land on the text. Measuring the copy keeps the two in step at any width,
   * and it does not drift when the copy or the type scale changes.
   */
  const [copyRows, setCopyRows] = useState<{ top: number; bottom: number } | null>(null);

  useEffect(() => {
    const panel = containerRef.current;
    if (!panel) return;
    const measure = () => {
      const heading = panel.querySelector('h2');
      const last = panel.querySelector('a');
      if (!heading || !last) return;
      const box = panel.getBoundingClientRect();
      const top = heading.getBoundingClientRect().top - box.top;
      const bottom = last.getBoundingClientRect().bottom - box.top;
      setCopyRows(previous =>
        previous && previous.top === top && previous.bottom === bottom
          ? previous
          : { top, bottom });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

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

  // Media Content Component (Left Column)
  const MediaContent = () => {
    if (mediaType === 'video') {
      // Video mode: full container video or animated GIF
      return (
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
      );
    }

    // Image mode: Just show the app screenshot with proper alignment based on reversed prop
    return (
      <div
        className={`w-full h-full flex items-center py-12 justify-center lg:${
          reversed ? 'justify-end' : 'justify-start'
        }`}
      >
        {appScreenshot && (
          <img
            className='w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] h-auto object-contain'
            src={appScreenshot}
            alt={appName}
          />
        )}
      </div>
    );
  };

  const leftContent = (
    <div className='relative lg:col-span-7 h-full min-h-[400px] sm:min-h-[500px] md:min-h-screen'>
      <MediaContent />
    </div>
  );

  // App Content Component (Right Column)
  const AppContent = () => (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      variants={sectionVariants}
      className='relative z-40 flex-1 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center'
    >
      <h2 className={`${HEADING} text-white mb-4 sm:mb-6 md:mb-8`}>
        {appName}
      </h2>

      <p className='font-body text-xs sm:text-sm md:text-base text-white opacity-90 mb-6 sm:mb-8 leading-relaxed pb-6 sm:pb-8 md:pb-12'>
        {appDescription}
      </p>

      <Link
        href={learnMoreLink}
        className={`inline-flex items-center ${LEAD} text-white opacity-90 hover:opacity-100 transition-opacity`}
      >
        Learn more →
      </Link>
    </motion.div>
  );

  const rightContent = (
    <div
      ref={containerRef}
      className='app-description-container relative flex flex-col lg:col-span-5 min-h-[400px] sm:min-h-[450px] md:h-[523px]'
    >
      {/* Pixel displacement grid */}
      <PixelDisplacementGrid
        backgroundColor={backgroundColorGrid}
        holeColor='transparent'
        displacedPixelColor={backgroundColorGrid}
        pixelSize={PIXEL_SIZE}
        displacements={activeDisplacements}
        placement={(pixels, grid) => pixels.filter((pixel) => {
          if (isInSafeZone(pixel, activeSafeZones)) return false;
          // Wide panels keep the copy in the leading columns, so the declared
          // zones already describe it and the squares beside it should stay.
          if (!copyRows || grid.cols > NARROW_PANEL_COLS) return true;
          const top = pixel.row * PIXEL_SIZE;
          return top + PIXEL_SIZE <= copyRows.top || top >= copyRows.bottom;
        })}
        animationDelay={0.15}
        animationDuration={0.5}
      />

      {/* App description content */}
      <AppContent />
    </div>
  );

  return (
    <section
      className='relative overflow-hidden py-16 md:py-24'
      style={{ backgroundColor: sectionBackgroundColor }}
    >
      {/* Background SVG Overlay */}
      {backgroundImage && (
        <div
          className='absolute inset-0 w-full h-full z-0'
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* Content */}
      <div className='relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center px-4 sm:px-6 md:px-12'>
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
