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
}) => {
  // Pixel displacement pattern for varied corners and edges
  const pixelDisplacements = [
    // Top left corner
    { row: 0, col: 0, displaceX: -1, displaceY: -1 },
    { row: 1, col: 1, displaceX: -2, displaceY: 0 },

    // Bottom right scattered pixels
    { row: -2, col: -1, displaceX: 2, displaceY: 1 },
    { row: -1, col: -3, displaceX: 1, displaceY: 2 },
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
                  ease: 'easeOut',
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
                  ease: 'easeOut',
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
