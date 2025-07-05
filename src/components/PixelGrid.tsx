'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PixelGridProps {
  backgroundColor?: string;
  className?: string;
}

interface DisplacedPixel {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  displacement: { x: number; y: number };
  animationDelay: number;
}

const PixelGrid: React.FC<PixelGridProps> = ({
  backgroundColor = 'bg-blue2',
  className = '',
}) => {
  const [displacedPixels, setDisplacedPixels] = useState<DisplacedPixel[]>([]);

  useEffect(() => {
    // Generate displaced pixels based on the design
    const pixels: DisplacedPixel[] = [
      // Top area pixels
      {
        id: '1',
        x: 20,
        y: 20,
        size: 40,
        color: 'bg-white',
        displacement: { x: 15, y: -10 },
        animationDelay: 0,
      },
      {
        id: '2',
        x: 80,
        y: 30,
        size: 30,
        color: 'bg-blue4',
        displacement: { x: -20, y: 25 },
        animationDelay: 0.2,
      },
      {
        id: '3',
        x: 140,
        y: 10,
        size: 50,
        color: 'bg-white',
        displacement: { x: 30, y: 15 },
        animationDelay: 0.4,
      },

      // Middle area pixels
      {
        id: '4',
        x: 200,
        y: 120,
        size: 35,
        color: 'bg-blue4',
        displacement: { x: -15, y: -30 },
        animationDelay: 0.6,
      },
      {
        id: '5',
        x: 60,
        y: 150,
        size: 45,
        color: 'bg-white',
        displacement: { x: 25, y: 20 },
        animationDelay: 0.8,
      },
      {
        id: '6',
        x: 180,
        y: 180,
        size: 25,
        color: 'bg-blue4',
        displacement: { x: -10, y: -15 },
        animationDelay: 1.0,
      },

      // Bottom area pixels
      {
        id: '7',
        x: 30,
        y: 280,
        size: 40,
        color: 'bg-white',
        displacement: { x: 20, y: -25 },
        animationDelay: 1.2,
      },
      {
        id: '8',
        x: 120,
        y: 320,
        size: 35,
        color: 'bg-blue4',
        displacement: { x: -25, y: 10 },
        animationDelay: 1.4,
      },
      {
        id: '9',
        x: 220,
        y: 300,
        size: 30,
        color: 'bg-white',
        displacement: { x: 15, y: -20 },
        animationDelay: 1.6,
      },

      // Additional scattered pixels
      {
        id: '10',
        x: 160,
        y: 240,
        size: 20,
        color: 'bg-blue4',
        displacement: { x: -30, y: 25 },
        animationDelay: 1.8,
      },
      {
        id: '11',
        x: 90,
        y: 200,
        size: 25,
        color: 'bg-white',
        displacement: { x: 35, y: -10 },
        animationDelay: 2.0,
      },
      {
        id: '12',
        x: 40,
        y: 100,
        size: 30,
        color: 'bg-blue4',
        displacement: { x: -20, y: 30 },
        animationDelay: 2.2,
      },
    ];

    setDisplacedPixels(pixels);
  }, []);

  const pixelVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0,
    },
    visible: (custom: DisplacedPixel) => ({
      opacity: 0.7,
      scale: 1,
      x: custom.displacement.x,
      y: custom.displacement.y,
      transition: {
        delay: custom.animationDelay,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
    float: (custom: DisplacedPixel) => ({
      y: [
        custom.displacement.y - 5,
        custom.displacement.y + 5,
        custom.displacement.y - 5,
      ],
      transition: {
        delay: custom.animationDelay + 2,
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div className={`absolute inset-0 ${backgroundColor} ${className}`}>
      {/* Base grid pattern (optional subtle background) */}
      <div className='absolute inset-0 opacity-5'>
        <div className='grid grid-cols-8 gap-2 h-full p-4'>
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className='bg-white rounded-sm opacity-20'></div>
          ))}
        </div>
      </div>

      {/* Displaced animated pixels */}
      {displacedPixels.map((pixel) => (
        <motion.div
          key={pixel.id}
          custom={pixel}
          variants={pixelVariants}
          initial='hidden'
          whileInView='visible'
          animate='float'
          viewport={{ once: true }}
          className={`absolute ${pixel.color} opacity-70`}
          style={{
            left: `${pixel.x}px`,
            top: `${pixel.y}px`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default PixelGrid;
