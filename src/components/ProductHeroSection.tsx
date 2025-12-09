'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Container from './Container';

interface ProductHeroSectionProps {
  heroImage?: string;
  heroVideo?: string;
  className?: string;
}

const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({
  heroImage,
  heroVideo,
  className = '',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Trigger the animation after component mounts
    const timer = setTimeout(() => setImageLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Pixelated Background */}
      <div className='absolute inset-0'>
        {heroVideo ? (
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            className='w-full h-full object-cover'
            initial={{
              filter: 'blur(8px)',
              scale: 1.1,
            }}
            animate={{
              filter: imageLoaded ? 'blur(2px)' : 'blur(8px)',
              scale: imageLoaded ? 1.05 : 1.1,
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
            style={{
              imageRendering: 'pixelated',
            }}
            onLoadedData={() => setImageLoaded(true)}
          >
            <source src={heroVideo} type='video/mp4' />
          </motion.video>
        ) : heroImage ? (
          <>
            <motion.img
              src={heroImage}
              alt='Hero background'
              className='w-full h-full object-cover'
              initial={{
                filter: 'contrast(1.3) saturate(1.2) brightness(0.9)',
                scale: 1.1,
              }}
              animate={{
                filter: imageLoaded
                  ? 'contrast(1.15) saturate(1.1) brightness(0.98)'
                  : 'contrast(1.3) saturate(1.2) brightness(0.9)',
                scale: imageLoaded ? 1.05 : 1.1,
              }}
              transition={{
                duration: 2,
                ease: 'easeOut',
              }}
              style={{
                imageRendering: 'pixelated',
              }}
              onLoad={() => setImageLoaded(true)}
            />
            {/* Classic halftone/stippled dithering pattern */}
            <div
              className='absolute inset-0 opacity-60 mix-blend-mode-multiply'
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='halftone-dots' x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='1.5' cy='1.5' r='0.8' fill='%23000' opacity='0.4'/%3E%3Ccircle cx='4.5' cy='1.5' r='0.6' fill='%23000' opacity='0.3'/%3E%3Ccircle cx='1.5' cy='4.5' r='0.6' fill='%23000' opacity='0.3'/%3E%3Ccircle cx='4.5' cy='4.5' r='1' fill='%23000' opacity='0.5'/%3E%3Ccircle cx='3' cy='3' r='0.4' fill='%23000' opacity='0.25'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23halftone-dots)'/%3E%3C/svg%3E")`,
                backgroundSize: '6px 6px',
                pointerEvents: 'none',
              }}
            />
            {/* Fine stippled texture layer */}
            <div
              className='absolute inset-0 opacity-25 mix-blend-mode-overlay'
              style={{
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.5) 0.5px, transparent 0.5px), radial-gradient(circle, rgba(0,0,0,0.3) 0.5px, transparent 0.5px)`,
                backgroundSize: '3px 3px, 2px 2px',
                backgroundPosition: '0 0, 1px 1px',
                pointerEvents: 'none',
              }}
            />
          </>
        ) : (
          // Fallback pixelated pattern
          <div
            className='w-full h-full bg-gradient-to-br from-gray-300 via-gray-500 to-gray-700'
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #000 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              imageRendering: 'pixelated',
            }}
          />
        )}

        {/* Overlay for better contrast */}
        <div className='absolute inset-0 bg-black/20' />
      </div>

      {/* Patent-style technical overlay */}
      <div className='absolute inset-0 z-5 pointer-events-none opacity-20'>
        <svg
          className='w-full h-full'
          viewBox='0 0 1440 800'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          {/* Corner reference marks */}
          <g stroke='white' strokeWidth='2' opacity='0.6'>
            {/* Top left */}
            <line x1='40' y1='40' x2='80' y2='40' />
            <line x1='40' y1='40' x2='40' y2='80' />

            {/* Top right */}
            <line x1='1360' y1='40' x2='1400' y2='40' />
            <line x1='1400' y1='40' x2='1400' y2='80' />

            {/* Bottom left */}
            <line x1='40' y1='720' x2='40' y2='760' />
            <line x1='40' y1='760' x2='80' y2='760' />

            {/* Bottom right */}
            <line x1='1400' y1='720' x2='1400' y2='760' />
            <line x1='1360' y1='760' x2='1400' y2='760' />
          </g>

          {/* Center crosshair */}
          <g stroke='white' strokeWidth='1.5' opacity='0.3'>
            <line x1='720' y1='380' x2='720' y2='420' strokeDasharray='4 4' />
            <line x1='700' y1='400' x2='740' y2='400' strokeDasharray='4 4' />
            <circle cx='720' cy='400' r='30' fill='none' />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className='relative z-10 min-h-[60vh] flex items-center justify-center'>
        <Container>
          <div className='text-center flex flex-col justify-center items-center py-16'>
            {/* Content can be added here if needed */}
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ProductHeroSection;
