'use client';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface PromotionalVideoSectionProps {
  videoSource: string;
  appName?: string;
  appDescription?: string;
  learnMoreLink?: string;
  backgroundColor?: string;
  overlayOpacity?: number;
  showControls?: boolean;
}

const PromotionalVideoSection: React.FC<PromotionalVideoSectionProps> = ({
  videoSource,
  appName,
  appDescription,
  learnMoreLink,
  backgroundColor = '#000000',
  overlayOpacity = 0.3,
  showControls = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Reset loading state when video source changes
      setIsLoaded(false);

      // Check if video is already loaded (e.g., from cache)
      if (video.readyState >= 2) {
        setIsLoaded(true);
        return;
      }

      const handleLoaded = () => setIsLoaded(true);

      // Listen to multiple events to catch different loading stages
      video.addEventListener('loadeddata', handleLoaded);
      video.addEventListener('canplay', handleLoaded);
      video.addEventListener('loadedmetadata', handleLoaded);

      // Safety timeout - hide loading after 5 seconds even if events don't fire
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 5000);

      return () => {
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('canplay', handleLoaded);
        video.removeEventListener('loadedmetadata', handleLoaded);
        clearTimeout(timeout);
      };
    }
  }, [videoSource]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      className='relative w-full overflow-hidden'
      style={{ backgroundColor }}
    >
      {/* Video Container */}
      <div className='relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-screen'>
        <video
          ref={videoRef}
          className='w-full h-full object-cover'
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src={videoSource} type='video/mp4' />
          <source
            src={videoSource?.replace('.mp4', '.webm')}
            type='video/webm'
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Gradient */}
        <div
          className='absolute inset-0'
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,${
              overlayOpacity * 0.5
            }) 0%, rgba(0,0,0,${overlayOpacity}) 50%, rgba(0,0,0,${
              overlayOpacity * 0.8
            }) 100%)`,
          }}
        />

        {/* Content Overlay */}
        {(appName || appDescription || learnMoreLink) && (
          <div className='absolute inset-0 flex items-center justify-center z-10'>
            <div className='text-center px-4 sm:px-6 md:px-12 max-w-4xl'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {appName && (
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className='font-pixel text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12'
                  >
                    {appName}
                  </motion.h2>
                )}

                {appDescription && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className='font-body text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 md:mb-12 lg:mb-14 leading-relaxed px-2 sm:px-0'
                  >
                    {appDescription}
                  </motion.p>
                )}

                {learnMoreLink && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <Link
                      href={learnMoreLink}
                      className='inline-flex items-center font-pixel text-white text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 hover:opacity-100 transition-opacity border-2 border-white/30 px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:border-white/60 transition-colors'
                    >
                      Learn more →
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* Play/Pause Control (optional) */}
        {showControls && (
          <button
            onClick={handlePlayPause}
            className='absolute bottom-8 right-8 z-20 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors'
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                className='text-white'
              >
                <rect x='6' y='4' width='4' height='16' fill='currentColor' />
                <rect x='14' y='4' width='4' height='16' fill='currentColor' />
              </svg>
            ) : (
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                className='text-white ml-1'
              >
                <path d='M8 5v14l11-7z' fill='currentColor' />
              </svg>
            )}
          </button>
        )}

        {/* Loading State */}
        {!isLoaded && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 z-[5]'>
            <div className='w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin' />
          </div>
        )}
      </div>
    </section>
  );
};

export default PromotionalVideoSection;
