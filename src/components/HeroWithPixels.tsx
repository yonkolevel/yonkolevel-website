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
  // Edge-based minimal ladder pattern
  const heroPixelDisplacements = [
    // Top-left corner ladder flowing outward
    { row: 0, col: 0, displaceX: 2, displaceY: -1 },
    { row: 1, col: 1, displaceX: 2, displaceY: 1 },
    { row: 2, col: 0, displaceX: 1, displaceY: 2 },

    // Bottom-left corner ladder flowing outward
    { row: 11, col: 0, displaceX: -1, displaceY: 2 },
    { row: 11, col: 2, displaceX: 2, displaceY: 2 },
  ];

  return (
    <section className='relative min-h-screen flex items-center hero-section overflow-hidden'>
      {/* Pixel displacement background */}
      <div className='absolute inset-0'>
        <PixelDisplacementGrid
          backgroundColor={backgroundColor}
          holeColor={holeColor}
          displacedPixelColor={pixelColor}
          pixelSize={80} // Larger pixels for hero
          displacements={heroPixelDisplacements}
          animationDelay={0.5} // Slower animation
          animationDuration={0.6}
        />
      </div>

      <img
        className='hero-image z-10 absolute'
        src='/images/mercury-diagram.svg'
        alt='Mercury diagram'
      />

      {/* Hero content */}
      <Container>
        <div className='relative z-40 text-center container'>
          <motion.h1
            className='font-pixel text-6xl md:text-9xl text-white mb-8 font-black halation-text'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className='text-white font-pixel'>{title}</span>
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='font-pixel text-xl tracking-[0.08em] text-white/70 [writing-mode:horizontal-rl]'
          >
            ヨンコ・レベル
          </motion.span>

          <motion.p
            className='font-body text-l text-white opacity-90 mt-36'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </Container>
    </section>
  );
};

export default HeroWithPixels;
