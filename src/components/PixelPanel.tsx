'use client';

import type { ReactNode } from 'react';
import PixelDisplacementGrid, { type Displacement } from './PixelDisplacementGrid';
import { constrainPanelDisplacements, type PanelSide } from './pixels/panel-layout';

export type { Displacement } from './PixelDisplacementGrid';
export type { PanelSide } from './pixels/panel-layout';

/** Site layout adapter: content/padding and bounded edge throws, not measurement or motion. */
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
  displacements: readonly Displacement[];
  side?: PanelSide;
  className?: string;
  pad?: string;
  pixelSize?: number;
  /** Replaces the padded, in-flow content wrapper, e.g. `absolute inset-0` to fill the panel. */
  contentClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <PixelDisplacementGrid
        backgroundColor={color}
        holeColor='transparent'
        displacedPixelColor={color}
        pixelSize={pixelSize}
        displacements={displacements}
        placement={(pixels, grid) => constrainPanelDisplacements(pixels, grid, side)}
        animationDelay={0.15}
        animationDuration={0.5}
      />
      <div className={contentClassName ?? `relative z-40 ${pad}`}>
        {children}
      </div>
    </div>
  );
}
