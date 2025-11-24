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
  // Split title into words for dramatic effect
  const titleWords = title.split(' ');
  const firstWord = titleWords[0] || title;
  const secondWord = titleWords.slice(1).join(' ') || '';

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
          animationDelay={0.15}
          animationDuration={0.5}
        />
      </div>

      <img
        className='hero-image z-10 absolute'
        src='/images/mercury-diagram.svg'
        alt='Mercury diagram'
      />

      {/* Hero content */}
      <Container>
        <div className='relative z-40 container'>
          {/* Split title for maximum impact */}
          <div className='flex flex-col items-center'>
            <motion.div
              className='mb-2 md:mb-4'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className='font-pixel text-5xl md:text-8xl lg:text-[10rem] text-white font-black leading-[0.9] tracking-tight uppercase'>
                {firstWord}
              </h1>
            </motion.div>

            {secondWord && (
              <motion.div
                className='mb-8 md:mb-12'
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1
                  className='font-pixel text-5xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] tracking-tight uppercase'
                  style={{
                    color: pixelColor,
                    textShadow: `0 0 20px ${pixelColor}40, 0 0 40px ${pixelColor}20`,
                  }}
                >
                  {secondWord}
                </h1>
              </motion.div>
            )}
          </div>

          {/* Decorative elements */}
          <motion.div
            className='flex items-center justify-center mb-8 md:mb-12'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.span className='font-pixel text-lg md:text-xl lg:text-2xl tracking-wider text-white/90 uppercase px-6 py-3 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm'>
              {subtitle}
            </motion.span>
          </motion.div>

          {/* Japanese text - repositioned */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className='font-pixel text-lg md:text-xl tracking-[0.08em] text-white/50 block text-center'
          >
            ヨンコ・レベル
          </motion.span>
        </div>
      </Container>
    </section>
  );
};

export default HeroWithPixels;
