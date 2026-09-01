'use client';

import * as React from 'react';

/**
 * Pixel marks for the Studio page.
 *
 * Everything is authored as a character map on a 16x16 grid — one character
 * per pixel — and rendered as hard-edged squares, so the marks sit in the same
 * 8-bit language as the hero grid and the founder sprite. `k` is the page ink,
 * so face pixels read as holes punched out of a block.
 */

const PALETTE: Record<string, string> = {
  o: '#FE6A5A',
  y: '#FCC552',
  b: '#007AFF',
  p: '#FDE895',
  k: '#121212',
  w: '#F8FAFC',
};

export function PixelArt({
  rows,
  unit = 8,
  className,
  title,
}: {
  rows: readonly string[];
  unit?: number;
  className?: string;
  title?: string;
}) {
  const height = rows.length;
  const width = Math.max(...rows.map((row) => row.length));

  return (
    <svg
      viewBox={`0 0 ${width * unit} ${height * unit}`}
      className={className}
      shapeRendering='crispEdges'
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
    >
      {rows.map((row, y) =>
        Array.from(row).map((char, x) =>
          char === '.' ? null : (
            <rect
              key={`${x}-${y}`}
              x={x * unit}
              y={y * unit}
              width={unit}
              height={unit}
              fill={PALETTE[char]}
            />
          ),
        ),
      )}
    </svg>
  );
}

/* ------------------------------------------------------- areas of expertise */

const CREATE = [
  '..........yyy...',
  '..........yyy...',
  '......p...yyy...',
  '................',
  '................',
  '..oooooooooo....',
  '..oooooooooo....',
  '..oooooooooo....',
  '..oookookooo....',
  '..oooooooooo....',
  '..oooooooooo....',
  '..oookookooo....',
  '..ooookkoooo....',
  '..oooooooooo....',
  '..oooooooooo....',
  '................',
] as const;

const STRENGTHEN = [
  '................',
  '................',
  '..........oooooo',
  '..........oooooo',
  '..........oooooo',
  '...p......oooooo',
  '..........okoook',
  '.....yyyy.oooooo',
  '.....yyyy.oooooo',
  '.....yyyy.okoook',
  'bbbb.yyyy.ookkko',
  'bbbb.yyyy.oooooo',
  'bbbb.yyyy.oooooo',
  'bbbb.yyyy.oooooo',
  'bbbb.yyyy.oooooo',
  '................',
] as const;

const CONNECT = [
  '................',
  'ooooooooo.......',
  'ooooooooo.......',
  'ooooooooo.......',
  'ookoookoo...p...',
  'ooooooooo.......',
  'ooooooooo.......',
  'ookoookoo.......',
  'oookkkooo.bbbbbb',
  'ooooooooo.bbbbbb',
  '.........ybbbbbb',
  '.........ybbbbbb',
  '..........bbbbbb',
  '..........bbbbbb',
  '..........bbbbbb',
  '................',
] as const;

/* ------------------------------------------------------------- engagements */

const ASSESS = [
  '................',
  '................',
  '..yyyooooooooo..',
  '..yyyooooooooo..',
  '..yyyooooooooo..',
  '..ooo......ooo..',
  '..ooo......ooo..',
  '..ooo..p...ooo..',
  '..ooo...p..ooo..',
  '..ooo......ooo..',
  '..ooo......ooo..',
  '..ooooooooobbb..',
  '..ooooooooobbb..',
  '..ooooooooobbb..',
  '................',
  '................',
] as const;

const BUILD = [
  '................',
  '................',
  '.............ppp',
  '.............ppp',
  '.............ppp',
  '.........oooo...',
  '.........oooo...',
  '.........oooo...',
  '.....yyyyoooo...',
  '.....yyyyoooo...',
  '.....yyyyoooo...',
  '.bbbbyyyyoooo...',
  '.bbbbyyyyoooo...',
  '.bbbbyyyyoooo...',
  '.bbbbyyyyoooo...',
  '................',
] as const;

const LEAD = [
  '................',
  '................',
  '......oooo......',
  '......oooo......',
  '......oooo......',
  '......oooo..p...',
  '................',
  '................',
  '....yyyyyyyy....',
  '....yyyyyyyy....',
  '....yyyyyyyy....',
  '....yyyyyyyy....',
  'bbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb',
  'bbbbbbbbbbbbbbbb',
  '................',
] as const;

type MarkProps = { className?: string };

export const CreateMark = ({ className }: MarkProps) => (
  <PixelArt rows={CREATE} className={className} />
);
export const StrengthenMark = ({ className }: MarkProps) => (
  <PixelArt rows={STRENGTHEN} className={className} />
);
export const ConnectMark = ({ className }: MarkProps) => (
  <PixelArt rows={CONNECT} className={className} />
);
export const AssessMark = ({ className }: MarkProps) => (
  <PixelArt rows={ASSESS} className={className} />
);
export const BuildMark = ({ className }: MarkProps) => (
  <PixelArt rows={BUILD} className={className} />
);
export const LeadMark = ({ className }: MarkProps) => (
  <PixelArt rows={LEAD} className={className} />
);
