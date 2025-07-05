'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
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

interface DisplacedPixel {
  id: string;
  originalX: number;
  originalY: number;
  newX: number;
  newY: number;
  size: number;
  color: string;
}

interface GridPixel {
  x: number;
  y: number;
  isDisplaced: boolean;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [displacedPixels, setDisplacedPixels] = useState<DisplacedPixel[]>([]);
  const [gridPixels, setGridPixels] = useState<
    { x: number; y: number; isDisplaced: boolean }[]
  >([]);

  // Function to split text into chunks of 4 characters
  const splitIntoChunks = (text: string, chunkSize: number = 4) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (containerDimensions.width > 0 && containerDimensions.height > 0) {
      const pixelSize = 80;
      const cols = Math.floor(containerDimensions.width / pixelSize);
      const rows = Math.floor(containerDimensions.height / pixelSize);

      // Helper function to create displaced pixels using matrix coordinates
      const createDisplacedPixel = (
        row: number,
        col: number,
        displaceX: number, // in grid units (positive = right, negative = left)
        displaceY: number // in grid units (positive = down, negative = up)
      ) => {
        const gridIndex = row * cols + col;
        return {
          gridIndex,
          newX: displaceX * pixelSize,
          newY: displaceY * pixelSize,
        };
      };

      // Create grid positions
      const grid: GridPixel[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          grid.push({
            x: col * pixelSize,
            y: row * pixelSize,
            isDisplaced: false,
          });
        }
      }

      // Define which pixels to displace using matrix coordinates
      const pixelsToDisplace = [
        createDisplacedPixel(0, 1, -2, 1), // Row 0, Col 1: left 2x, down 1x
        createDisplacedPixel(1, 0, -2, 1), // Row 1, Col 0: left 2x, down 1x
        // Add your new ones:
        createDisplacedPixel(rows - 2, 0, -2, 0), // Second to last row, Col 0: left 2x
        createDisplacedPixel(rows - 1, 1, -1, 0), // Last row, Col 1: left 1x
      ];

      const displaced = pixelsToDisplace
        .filter((p) => p.gridIndex < grid.length)
        .map((p, index) => {
          const originalPixel = grid[p.gridIndex];
          grid[p.gridIndex].isDisplaced = true;

          return {
            id: `displaced-${index}`,
            originalX: originalPixel.x,
            originalY: originalPixel.y,
            newX: originalPixel.x + p.newX,
            newY: originalPixel.y + p.newY,
            size: pixelSize,
            color: '#007AFF',
          };
        });

      setGridPixels(grid);
      setDisplacedPixels(displaced);
    }
  }, [containerDimensions]);

  return (
    <section className='bg-white relative overflow-hidden min-h-screen'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-0 items-center h-full min-h-screen'>
        {/* Left side - Decorative elements and phone mockup */}
        <div className='relative lg:col-span-7 relative px-12'>
          <h2
            className='font-pixel text-blue2 max-w-md'
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

        {/* Right side - App description with pixel displacement */}
        <div
          ref={containerRef}
          className='app-description-container relative lg:col-span-5 h-full bg-blue2'
        >
          {/* Grid pixels (background) */}
          {gridPixels.map((pixel, index) => {
            // Find if this pixel has a displaced version and get its animation delay
            const displacedPixelIndex = displacedPixels.findIndex(
              (dp) => dp.originalX === pixel.x && dp.originalY === pixel.y
            );
            const hasDisplacedVersion = displacedPixelIndex !== -1;
            const animationDelay = hasDisplacedVersion
              ? displacedPixelIndex * 0.3
              : 0;

            return (
              <motion.div
                key={`grid-${index}`}
                className={`absolute bg-blue2`}
                initial={{ opacity: 1 }}
                animate={{
                  backgroundColor: pixel.isDisplaced ? '#fff' : '#007AFF',
                  opacity: 1,
                }}
                transition={{
                  delay: hasDisplacedVersion ? animationDelay : 0,
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                style={{
                  left: pixel.x,
                  top: pixel.y,
                  width: 80,
                  height: 80,
                }}
              />
            );
          })}

          {/* Displaced pixels */}
          {displacedPixels.map((pixel, index) => (
            <motion.div
              key={pixel.id}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * 0.3,
                duration: 0.3,
                ease: 'backOut',
              }}
              className='absolute'
              style={{
                left: pixel.newX,
                top: pixel.newY,
                width: pixel.size,
                height: pixel.size,
                backgroundColor: pixel.color,
                zIndex: 20,
              }}
            />
          ))}

          {/* App description content */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={sectionVariants}
            className='relative z-10 p-12 md:p-16 h-full flex flex-col justify-center'
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
      </div>
    </section>
  );
};

export default AppShowcaseSection;
