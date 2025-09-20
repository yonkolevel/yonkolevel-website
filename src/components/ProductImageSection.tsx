'use client';
import { motion } from 'framer-motion';
import Container from './Container';
import PixelDisplacementGrid from './PixelDisplacementGrid';

interface ProductImageSectionProps {
  image: string;
  imageAlt: string;
  backgroundColor?: string;
  className?: string;
  imageClassName?: string;
  showPixelEffect?: boolean;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  image,
  imageAlt,
  backgroundColor = 'bg-white',
  className = '',
  imageClassName = '',
  showPixelEffect = true,
}) => {
  // Pixel displacement pattern for varied corners and edges
  const pixelDisplacements = [
    // Top corners
    { row: 0, col: 1, displaceX: -1, displaceY: -1 },
    { row: 1, col: 0, displaceX: -2, displaceY: 0 },

    // Bottom right scattered pixels
    { row: -3, col: -1, displaceX: 2, displaceY: 1 },
    { row: -2, col: -3, displaceX: 1, displaceY: 2 },
    { row: -1, col: -2, displaceX: 3, displaceY: 1 },
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
        maxHeight: '100vh',
        minHeight: '60vh',
      }}
    >
      {/* Pixel displacement effect */}
      {showPixelEffect && (
        <PixelDisplacementGrid
          backgroundColor={backgroundColor}
          holeColor={'white'}
          displacedPixelColor={backgroundColor} // subtle gray pixels
          pixelSize={40}
          displacements={pixelDisplacements}
          animationDelay={0.3}
          animationDuration={0.5}
          className='z-0'
        />
      )}

      <div className='relative z-10 h-full'>
        <Container>
          <div className='py-16 lg:py-24 h-full flex items-center justify-center'>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
              className='w-full flex justify-center'
            >
              <img
                src={image}
                alt={imageAlt}
                className={`max-w-full max-h-[70vh] object-contain ${imageClassName}`}
              />
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ProductImageSection;
