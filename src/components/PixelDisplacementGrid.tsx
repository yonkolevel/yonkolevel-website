'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { getGridSize, resolveDisplacements, type Displacement, type GridSize, type ResolvedDisplacement } from './pixels/geometry';
import styles from './PixelDisplacementGrid.module.css';

export type { Displacement, GridSize, ResolvedDisplacement } from './pixels/geometry';

export interface PixelDisplacementGridProps {
  /** CSS colours, not framework class names. */
  backgroundColor: string;
  holeColor: string;
  displacedPixelColor: string;
  pixelSize?: number;
  displacements: readonly Displacement[];
  /** Optional layout policy applied to valid, edge-relative coordinates. */
  placement?: (pixels: readonly ResolvedDisplacement[], grid: GridSize) => readonly ResolvedDisplacement[];
  /** Seconds between pixels, and seconds per animation. */
  animationDelay?: number;
  animationDuration?: number;
  className?: string;
}

export default function PixelDisplacementGrid({
  backgroundColor,
  holeColor,
  displacedPixelColor,
  pixelSize = 60,
  displacements,
  placement,
  animationDelay = 0.3,
  animationDuration = 0.3,
  className = '',
}: PixelDisplacementGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<GridSize>({ cols: 0, rows: 0 });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const next = getGridSize(entry.contentRect.width, entry.contentRect.height, pixelSize);
      setGrid(previous => previous.cols === next.cols && previous.rows === next.rows ? previous : next);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [pixelSize]);

  const ready = grid.cols > 0 && grid.rows > 0;
  useEffect(() => {
    const node = ref.current;
    if (!node || !ready || entered) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = () => {
      setEntered(true);
      observer.disconnect();
    };
    // Observe the panel, not its cells; tall panels need only intersect, not fit in the viewport.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) reveal();
    });
    const onMotionChange = () => { if (reducedMotion.matches) reveal(); };
    if (reducedMotion.matches) reveal();
    else observer.observe(node);
    reducedMotion.addEventListener('change', onMotionChange);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, [ready, entered]);

  const resolved = resolveDisplacements(displacements, grid);
  const pixels = placement ? placement(resolved, grid) : resolved;
  const transparent = holeColor === 'transparent';
  const width = grid.cols * pixelSize;
  const height = grid.rows * pixelSize;
  // One even-odd path cuts real holes without mask IDs, backing colours, or a node per cell.
  const fillPath = ready && transparent
    ? `M0 0H${width}V${height}H0Z ` + pixels.map(({ col, row }) =>
      `M${col * pixelSize} ${row * pixelSize}h${pixelSize}v${pixelSize}h${-pixelSize}Z`).join(' ')
    : undefined;

  return (
    <div
      ref={ref}
      aria-hidden='true'
      data-pixel-grid=''
      data-entered={entered}
      data-transparent={transparent}
      className={`${styles.grid} ${className}`}
      style={{
        '--pixel-background': backgroundColor,
        '--pixel-hole': holeColor,
        '--pixel-color': displacedPixelColor,
        '--pixel-duration': `${Number.isFinite(animationDuration) ? Math.max(0, animationDuration) : 0}s`,
      } as CSSProperties}
    >
      <svg className={styles.fill} width='100%' height='100%' focusable='false'>
        {fillPath ? <path d={fillPath} fillRule='evenodd' /> : <rect width='100%' height='100%' />}
      </svg>
      {pixels.map((pixel, index) => {
        const style = {
          left: pixel.col * pixelSize,
          top: pixel.row * pixelSize,
          width: pixelSize,
          height: pixelSize,
          '--pixel-x': `${pixel.displaceX * pixelSize}px`,
          '--pixel-y': `${pixel.displaceY * pixelSize}px`,
          '--pixel-delay': `${index * (Number.isFinite(animationDelay) ? Math.max(0, animationDelay) : 0)}s`,
        } as CSSProperties;
        return (
          <Fragment key={pixel.index}>
            <div className={styles.origin} style={style} />
            <div className={styles.pixel} style={style} />
          </Fragment>
        );
      })}
    </div>
  );
}
