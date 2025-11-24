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
}

const ProductDescriptionSection: React.FC<ProductDescriptionSectionProps> = ({
  title,
  description,
  backgroundColor = 'bg-orange',
  textColor = 'text-black',
  className = '',
  showPixelEffect = true,
}) => {
  // Pixel displacement pattern for the corners
  const pixelDisplacements = [
    // Top left corner pixels
    { row: 0, col: 0, displaceX: -1, displaceY: -1 },
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

      <div className='relative z-10'>
        <Container>
          <div className='pt-32 pb-16 lg:pt-48 lg:pb-48'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: 'easeOut',
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
