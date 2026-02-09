'use client';
import { motion } from 'framer-motion';
import Container from '@/components/Container';
import PixelDisplacementGrid from '@/components/PixelDisplacementGrid';

const heroPixelDisplacements = [
  { row: 0, col: 0, displaceX: 2, displaceY: -1 },
  { row: 1, col: 1, displaceX: 2, displaceY: 1 },
  { row: 2, col: 0, displaceX: 1, displaceY: 2 },
  { row: 7, col: 0, displaceX: -1, displaceY: 2 },
  { row: 7, col: 2, displaceX: 2, displaceY: 2 },
];

export default function ShopHero() {
  return (
    <section className='relative h-[60vh] flex items-center overflow-hidden'>
      <div className='absolute inset-0'>
        <PixelDisplacementGrid
          backgroundColor='#1a1a1a'
          holeColor='#000000'
          displacedPixelColor='#FCC552'
          pixelSize={40}
          displacements={heroPixelDisplacements}
          animationDelay={0.15}
          animationDuration={0.5}
        />
      </div>

      <Container>
        <div className='relative z-40'>
          <div className='flex flex-col items-center'>
            <motion.div
              className='mb-2 sm:mb-3 md:mb-4'
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className='font-pixel text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[10rem] text-white font-black leading-[0.9] tracking-tight uppercase px-2 sm:px-0'>
                SHOP
              </h1>
            </motion.div>

            <motion.div
              className='flex items-center justify-center mb-6 sm:mb-8 md:mb-12'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className='font-pixel text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wider text-white/90 uppercase px-4 py-2 sm:px-6 sm:py-3 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm mx-2 sm:mx-0'>
                Collectibles & Digital Goods
              </span>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
