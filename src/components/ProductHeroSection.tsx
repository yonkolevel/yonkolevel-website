'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Container from './Container';
import PixelDisplacementGrid from './PixelDisplacementGrid';

interface ProductHeroSectionProps {
  heroImage?: string;
  heroVideo?: string;
  className?: string;
  appIcon?: string;
  appIconAlt?: string;
  title?: string;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
  showPixelEffect?: boolean;
}

const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({
  heroImage,
  heroVideo,
  className = '',
  appIcon,
  appIconAlt,
  title,
  description,
  backgroundColor = 'bg-orange',
  textColor = 'text-black',
  showPixelEffect = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Trigger the animation after component mounts
    const timer = setTimeout(() => setImageLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Pixel displacement pattern for the corners
  const pixelDisplacements = [
    // Top left corner pixels
    { row: 0, col: 0, displaceX: -1, displaceY: -1 },
  ];

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

      {/* Pixel displacement effect overlay - only show if no hero image/video */}
      {showPixelEffect &&
        (title || description) &&
        !heroImage &&
        !heroVideo && (
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

      {/* App Store Banner Content */}
      <div className='relative z-10'>
        {/* Blurred backdrop for content area - frosted glass effect - full width and height */}
        {(appIcon || title || description) && (
          <div className='absolute inset-0 backdrop-blur-sm bg-black/40' />
        )}

        <Container>
          <div className='relative min-h-[60vh] lg:min-h-[70vh] flex items-center py-16 lg:py-24'>
            <div className='relative z-10 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center w-full px-4 lg:px-8'>
              {/* App Icon */}
              {appIcon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'backOut',
                  }}
                  className='flex justify-center lg:justify-start'
                >
                  <img
                    width={200}
                    height={200}
                    src={appIcon}
                    alt={appIconAlt}
                    className='drop-shadow-2xl'
                  />
                </motion.div>
              )}

              {/* Title and Description */}
              {(title || description) && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: 'easeOut',
                  }}
                  className='text-center lg:text-left'
                >
                  {title && (
                    <h1
                      className={`font-pixel font-bold text-3xl lg:text-4xl xl:text-5xl ${textColor} mb-6 uppercase tracking-wider drop-shadow-lg`}
                    >
                      {title}
                    </h1>
                  )}

                  {description && (
                    <div
                      className={`text-lg lg:text-xl ${textColor} leading-relaxed drop-shadow-md`}
                    >
                      {description}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ProductHeroSection;
