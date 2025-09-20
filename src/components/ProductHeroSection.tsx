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
          <motion.img
            src={heroImage}
            alt='Hero background'
            className='w-full h-full object-cover'
            initial={{
              filter: 'blur(8px) contrast(0.8)',
              scale: 1.1,
            }}
            animate={{
              filter: imageLoaded ? '' : 'blur(8px) contrast(0.8)',
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
