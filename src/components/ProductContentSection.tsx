'use client';
import { motion } from 'framer-motion';
import Container from './Container';
import PixelDisplacementGrid from './PixelDisplacementGrid';

interface ProductContentSectionProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  imageClassName?: string;
  showPixelEffect?: boolean;
  reverse?: boolean;
  patternColor?: string;
}

const ProductContentSection: React.FC<ProductContentSectionProps> = ({
  title,
  description,
  image,
  imageAlt,
  backgroundColor = 'bg-white',
  textColor = 'text-black',
  className = '',
  imageClassName = '',
  showPixelEffect = true,
  reverse = false,
  patternColor = '#000000',
}) => {
  // Pixel displacement pattern for varied corners and edges
  const pixelDisplacements = [
    // Top left corner
    { row: 0, col: 0, displaceX: -1, displaceY: -1 },
    { row: 1, col: 1, displaceX: -2, displaceY: 0 },
    { row: 0, col: 2, displaceX: -1, displaceY: -1 },

    // Bottom right scattered pixels
    { row: 11, col: 13, displaceX: 2, displaceY: 1 },
    { row: 12, col: 12, displaceX: 1, displaceY: 2 },
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
          holeColor={'white'}
          displacedPixelColor={backgroundColor}
          pixelSize={40}
          displacements={pixelDisplacements}
          animationDelay={0.3}
          animationDuration={0.5}
          className='z-0'
        />
      )}

      {/* Subtle patent-style scribbles */}
      <div className='absolute inset-0 z-5 pointer-events-none opacity-10'>
        <svg
          className='w-full h-full'
          viewBox='0 0 1440 800'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {/* Corner brackets */}
          <g stroke={patternColor} strokeWidth='2' opacity='0.3'>
            {reverse ? (
              <>
                {/* Right side brackets for reversed layout */}
                <path d='M 1300 200 L 1320 200 L 1320 220' />
                <path d='M 1300 600 L 1320 600 L 1320 580' />
              </>
            ) : (
              <>
                {/* Left side brackets for normal layout */}
                <path d='M 120 200 L 100 200 L 100 220' />
                <path d='M 120 600 L 100 600 L 100 580' />
              </>
            )}
          </g>

          {/* Subtle dimension lines */}
          <g stroke={patternColor} strokeWidth='0.5' opacity='0.2'>
            <line x1='200' y1='150' x2='1240' y2='150' strokeDasharray='5 5' />
            <circle
              cx={reverse ? '1100' : '340'}
              cy='400'
              r='100'
              fill='none'
              strokeDasharray='8 4'
            />
          </g>
        </svg>
      </div>

      <div className='relative z-10'>
        <Container>
          <div className='py-16 lg:py-24'>
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                reverse ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content Column */}
              <motion.div
                initial={{ opacity: 0, x: reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                }}
                className={`${reverse ? 'lg:col-start-2' : 'lg:col-start-1'}`}
              >
                <h2
                  className={`font-pixel font-bold text-2xl lg:text-3xl xl:text-4xl ${textColor} mb-6 uppercase tracking-wider`}
                >
                  {title}
                </h2>

                <div
                  className={`text-lg lg:text-xl ${textColor} leading-relaxed`}
                >
                  {description}
                </div>
              </motion.div>

              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: reverse ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                }}
                className={`${
                  reverse ? 'lg:col-start-1' : 'lg:col-start-2'
                } flex justify-center`}
              >
                <img
                  src={image}
                  alt={imageAlt}
                  className={`max-w-full max-h-[400px] lg:max-h-[500px] h-auto object-contain ${imageClassName}`}
                />
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ProductContentSection;
