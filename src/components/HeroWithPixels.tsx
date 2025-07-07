'use client';
import { motion } from 'framer-motion';
import Container from './Container';
import PixelDisplacementGrid from './PixelDisplacementGrid';

interface HeroWithPixelsProps {
  title: string;
  subtitle: string;
  backgroundColor?: string;
  pixelColor?: string;
  holeColor?: string;
}

const HeroWithPixels: React.FC<HeroWithPixelsProps> = ({
  title,
  subtitle,
  backgroundColor = '#007AFF',
  pixelColor = '#007AFF',
  holeColor = '#F8FAFC',
}) => {
  // Example: Different displacement pattern for hero sections
  const heroPixelDisplacements = [
    { row: 0, col: 0, displaceX: -1, displaceY: -1 }, // Top-left corner
    { row: 0, col: 2, displaceX: 1, displaceY: -1 }, // Top-right area
    { row: 2, col: 1, displaceX: -2, displaceY: 0 }, // Middle-left
    { row: 3, col: 3, displaceX: 2, displaceY: 1 }, // Lower-right
    { row: 1, col: 0, displaceX: -1, displaceY: 2 }, // Left side, down
  ];

  return (
    <section className='relative min-h-screen flex items-center'>
      {/* Pixel displacement background */}
      <div className='absolute inset-0'>
        <PixelDisplacementGrid
          backgroundColor={backgroundColor}
          holeColor={holeColor}
          displacedPixelColor={pixelColor}
          pixelSize={120} // Larger pixels for hero
          displacements={heroPixelDisplacements}
          animationDelay={0.5} // Slower animation
          animationDuration={0.6}
        />
      </div>

      {/* Hero content */}
      <Container>
        <div className='relative z-10 text-center'>
          <motion.h1
            className='font-pixel text-6xl md:text-8xl text-white mb-8'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className='font-body text-xl text-white opacity-90'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </Container>
    </section>
  );
};

export default HeroWithPixels;
