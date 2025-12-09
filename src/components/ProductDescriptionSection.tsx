'use client';
import { motion } from 'framer-motion';
import Container from './Container';
import PixelDisplacementGrid from './PixelDisplacementGrid';

interface ProductDescriptionSectionProps {
  title: string;
  description: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  showPixelEffect?: boolean;
  patternColor?: string;
}

const ProductDescriptionSection: React.FC<ProductDescriptionSectionProps> = ({
  title,
  description,
  backgroundColor = 'bg-orange',
  textColor = 'text-black',
  className = '',
  showPixelEffect = true,
  patternColor = '#000000',
}) => {
  // Pixel displacement pattern for the corners
  const pixelDisplacements = [
    // Top left corner pixels
    { row: 0, col: 0, displaceX: -1, displaceY: -1 },
    { row: 1, col: 0, displaceX: -2, displaceY: 0 },
    { row: 0, col: 1, displaceX: 0, displaceY: -2 },
  ];

  return (
    <section
      className={`relative ${
        backgroundColor.startsWith('#') ? '' : backgroundColor
      } ${className}`}
      style={{
        backgroundColor: backgroundColor.startsWith('#')
          ? backgroundColor
          : undefined,
      }}
    >
      {/* Pixel displacement effect */}
      {showPixelEffect && (
        <PixelDisplacementGrid
          backgroundColor={backgroundColor}
          holeColor='white'
          displacedPixelColor={backgroundColor}
          pixelSize={40}
          displacements={pixelDisplacements}
          animationDelay={0.2}
          animationDuration={0.4}
          className='z-0'
        />
      )}

      {/* Patent-style technical pattern overlay */}
      <div className='absolute inset-0 z-5 pointer-events-none opacity-10'>
        <svg
          className='w-full h-full'
          viewBox='0 0 1440 600'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {/* Technical grid pattern */}
          <defs>
            <pattern
              id='tech-grid'
              x='0'
              y='0'
              width='80'
              height='80'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M 80 0 L 0 0 0 80'
                fill='none'
                stroke={patternColor}
                strokeWidth='0.5'
                opacity='0.3'
              />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#tech-grid)' />

          {/* Dimension-style lines */}
          <g stroke={patternColor} strokeWidth='1' opacity='0.4'>
            <line x1='100' y1='100' x2='1340' y2='100' strokeDasharray='10 5' />
            <line x1='100' y1='100' x2='100' y2='500' strokeDasharray='10 5' />
          </g>
        </svg>
      </div>

      <div className='relative z-10'>
        <Container>
          <div className='pt-32 pb-16 lg:pt-48 lg:pb-48'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
              }}
              className='max-w-4xl'
            >
              <h2
                className={`font-pixel font-bold text-3xl lg:text-4xl xl:text-5xl ${textColor} mb-8 uppercase tracking-wider`}
              >
                {title}
              </h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                }}
                className={`text-lg lg:text-xl ${textColor} leading-relaxed`}
              >
                {description}
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ProductDescriptionSection;
