/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

/**
 * Renders one of the original pixel-art assets at its native resolution,
 * scaled by an integer with nearest-neighbour sampling so every pixel stays a
 * crisp square. The old site shipped 4x upscales of these; the source frames
 * are 40-160px and a few kilobytes each.
 */
export default function PixelSprite({
  src,
  width,
  height,
  scale = 1,
  alt = '',
  className = '',
}: {
  src: string;
  /** native width in pixels */
  width: number;
  /** native height in pixels */
  height: number;
  /** integer scale factor; non-integers reintroduce uneven pixels */
  scale?: number;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={width * scale}
      height={height * scale}
      className={`block ${className}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
