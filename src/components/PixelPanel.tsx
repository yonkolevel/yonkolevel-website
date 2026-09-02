'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import PixelDisplacementGrid from './PixelDisplacementGrid';

export type Displacement = {
  row: number;
  col: number;
  displaceX: number;
  displaceY: number;
};

export type PanelSide = 'left' | 'right' | 'full';

/**
 * Content on a solid colour panel built from the displacement grid, the way the
 * homepage showcase sections do it: a few pixels come loose from the panel's
 * edges and fly into the dark around it, leaving holes where they were.
 *
 * The panel measures itself and then disciplines every displacement so the
 * decoration can never damage the layout:
 *
 * - negative rows and columns count back from the bottom and right edges, so
 *   an entry holds wherever the panel ends instead of being dropped or
 *   wrapping onto the next row
 * - only perimeter cells may move, and only outwards, so a hole is always in
 *   the panel's padding rather than under its text
 * - throws are capped: one cell upwards (under the section rule), one cell
 *   towards the neighbouring column (inside the gutter), two cells towards the
 *   page edge, three downwards into the section's own padding
 */
export default function PixelPanel({
  color,
  displacements,
  side = 'left',
  className = '',
  pad = 'p-[2.5rem] md:p-12',
  pixelSize = 40,
  contentClassName,
  children,
}: {
  color: string;
  displacements: Displacement[];
  side?: PanelSide;
  className?: string;
  pad?: string;
  pixelSize?: number;
  /** Replaces the padded, in-flow content wrapper — e.g. `absolute inset-0` to fill the panel. */
  contentClassName?: string;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ cols: 0, rows: 0 });

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      setSize({
        cols: Math.floor(rect.width / pixelSize),
        rows: Math.floor(rect.height / pixelSize),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [pixelSize]);

  const resolved = React.useMemo(() => {
    const { cols, rows } = size;
    if (cols === 0 || rows === 0) return [];

    const inwardX = side === 'left' ? 1 : side === 'right' ? -1 : 0;

    return displacements.flatMap((d) => {
      const col = d.col < 0 ? cols + d.col : d.col;
      const row = d.row < 0 ? rows + d.row : d.row;
      if (col < 0 || col >= cols || row < 0 || row >= rows) return [];

      const onLeft = col === 0;
      const onRight = col === cols - 1;
      const onTop = row === 0;
      const onBottom = row === rows - 1;
      if (!onLeft && !onRight && !onTop && !onBottom) return [];

      let dx = d.displaceX;
      let dy = d.displaceY;

      // only outwards from the edge the pixel sits on
      if (onLeft && !onRight && dx > 0) dx = 0;
      if (onRight && !onLeft && dx < 0) dx = 0;
      if (onTop && !onBottom && dy > 0) dy = 0;
      if (onBottom && !onTop && dy < 0) dy = 0;

      // capped throws
      dy = Math.max(-1, Math.min(3, dy));
      const towardsNeighbour = inwardX !== 0 && Math.sign(dx) === inwardX;
      const limit = towardsNeighbour ? 1 : 2;
      dx = Math.max(-limit, Math.min(limit, dx));

      if (dx === 0 && dy === 0) return [];
      return [{ row, col, displaceX: dx, displaceY: dy }];
    });
  }, [displacements, size, side]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <PixelDisplacementGrid
        backgroundColor={color}
        holeColor='transparent'
        displacedPixelColor={color}
        pixelSize={pixelSize}
        displacements={resolved}
        animationDelay={prefersReducedMotion ? 0 : 0.15}
        animationDuration={prefersReducedMotion ? 0 : 0.5}
      />
      <div className={contentClassName ?? `relative z-40 ${pad}`}>
        {children}
      </div>
    </div>
  );
}
