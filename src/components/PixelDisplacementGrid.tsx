'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface DisplacedPixel {
  id: string;
  originalX: number;
  originalY: number;
  newX: number;
  newY: number;
  size: number;
  color: string;
}

interface GridPixel {
  x: number;
  y: number;
  isDisplaced: boolean;
}

interface PixelDisplacement {
  row: number;
  col: number;
  displaceX: number; // in grid units (positive = right, negative = left)
  displaceY: number; // in grid units (positive = down, negative = up)
}

interface PixelDisplacementGridProps {
  backgroundColor: string;
  holeColor: string;
  displacedPixelColor: string;
  pixelSize?: number;
  displacements: PixelDisplacement[];
  animationDelay?: number;
  animationDuration?: number;
  className?: string;
}

const PixelDisplacementGrid: React.FC<PixelDisplacementGridProps> = ({
  backgroundColor,
  holeColor,
  displacedPixelColor,
  pixelSize = 60,
  displacements,
  animationDelay = 0.3,
  animationDuration = 0.3,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [displacedPixels, setDisplacedPixels] = useState<DisplacedPixel[]>([]);
  const [gridPixels, setGridPixels] = useState<GridPixel[]>([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (containerDimensions.width > 0 && containerDimensions.height > 0) {
      const cols = Math.floor(containerDimensions.width / pixelSize);
      const rows = Math.floor(containerDimensions.height / pixelSize);

      // Helper function to create displaced pixels using matrix coordinates
      const createDisplacedPixel = (displacement: PixelDisplacement) => {
        const gridIndex = displacement.row * cols + displacement.col;
        return {
          gridIndex,
          newX: displacement.displaceX * pixelSize,
          newY: displacement.displaceY * pixelSize,
        };
      };

      // Create grid positions
      const grid: GridPixel[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          grid.push({
            x: col * pixelSize,
            y: row * pixelSize,
            isDisplaced: false,
          });
        }
      }

      // Process displacements
      const pixelsToDisplace = displacements.map(createDisplacedPixel);

      const displaced = pixelsToDisplace
        .filter((p) => p.gridIndex < grid.length && p.gridIndex >= 0)
        .map((p, index) => {
          const originalPixel = grid[p.gridIndex];
          grid[p.gridIndex].isDisplaced = true;

          return {
            id: `displaced-${index}`,
            originalX: originalPixel.x,
            originalY: originalPixel.y,
            newX: originalPixel.x + p.newX,
            newY: originalPixel.y + p.newY,
            size: pixelSize,
            color: displacedPixelColor,
          };
        });

      setGridPixels(grid);
      setDisplacedPixels(displaced);
    }
  }, [containerDimensions, pixelSize, displacements, displacedPixelColor]);

  // Determine if we should use transparent holes or colored holes
  const useTransparentHoles = holeColor === 'transparent';

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ backgroundColor: useTransparentHoles ? 'transparent' : backgroundColor }}
    >
      {/* Grid pixels (background) */}
      {gridPixels.map((pixel, index) => {
        // Find if this pixel has a displaced version and get its animation delay
        const displacedPixelIndex = displacedPixels.findIndex(
          (dp) => dp.originalX === pixel.x && dp.originalY === pixel.y
        );
        const hasDisplacedVersion = displacedPixelIndex !== -1;
        const delay = hasDisplacedVersion
          ? displacedPixelIndex * animationDelay
          : 0;

        return (
          <motion.div
            key={`grid-${index}`}
            className='absolute'
            initial={{ opacity: 1, scale: 1 }}
            whileInView={{
              opacity: pixel.isDisplaced && useTransparentHoles ? 0 : 1,
              scale: pixel.isDisplaced ? 0.8 : 1,
              backgroundColor: pixel.isDisplaced && !useTransparentHoles ? holeColor : backgroundColor,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: hasDisplacedVersion ? delay : 0,
              duration: animationDuration,
              ease: 'easeInOut',
            }}
            style={{
              left: pixel.x,
              top: pixel.y,
              width: pixelSize,
              height: pixelSize,
              backgroundColor: backgroundColor,
            }}
          />
        );
      })}

      {/* Displaced pixels */}
      {displacedPixels.map((pixel, index) => (
        <motion.div
          key={pixel.id}
          initial={{
            left: pixel.originalX,
            top: pixel.originalY,
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            left: pixel.newX,
            top: pixel.newY,
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: index * animationDelay,
            duration: animationDuration,
            ease: 'easeInOut',
          }}
          className='absolute z-100'
          style={{
            width: pixel.size,
            height: pixel.size,
            backgroundColor: pixel.color,
            zIndex: 20,
          }}
        />
      ))}
    </div>
  );
};

export default PixelDisplacementGrid;
