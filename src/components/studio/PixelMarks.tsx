'use client';

import * as React from 'react';

/**
 * Pixel marks for the Studio page.
 *
 * Each mark is a character map on a 24x24 grid — one character per pixel —
 * rendered as hard-edged squares, so they sit in the same 8-bit language as the
 * hero grid and the founder sprite. The grid is deliberately finer than the
 * type: strokes are two cells wide, shapes keep a cell of padding, and every
 * mark carries one dominant colour with the others supporting, so the six read
 * as a set at 48-64px rather than as coloured slabs.
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
  '........................',
  '........................',
  '........................',
  '..................yy....',
  '..................yy....',
  '..................yy....',
  '..................yy....',
  '..............yyyyyyyyyy',
  '..............yyyyyyyyyy',
  '..................yy....',
  '..................yy....',
  '..................yy....',
  '..................yy....',
  '..ooooooooooooo.........',
  '..ooooooooooooo.........',
  '..ooooooooooooo.........',
  '..oowwoowwoowwo.........',
  '..oowwoowwoowwo.........',
  '..oowwoowwoowwo.........',
  '..ooooooooooooo.........',
  '..ooooooooooooo.........',
  '..ooooooooooooo.........',
  '........................',
  '........................',
] as const;

const STRENGTHEN = [
  '........................',
  '...............ww.......',
  '...............ww.......',
  '.............ww..ww.....',
  '.............ww..ww.....',
  '...........ww......ww...',
  '...........ww.oooo.ww...',
  '..............oooo......',
  '..............oooo......',
  '..............oooo......',
  '..............oooo......',
  '........yyyy..oooo......',
  '........yyyy..oooo......',
  '........yyyy..oooo......',
  '........yyyy..oooo......',
  '........yyyy..oooo......',
  '..bbbb..yyyy..oooo......',
  '..bbbb..yyyy..oooo......',
  '..bbbb..yyyy..oooo......',
  '..bbbb..yyyy..oooo......',
  '..bbbb..yyyy..oooo......',
  '..bbbb..yyyy..oooo......',
  '........................',
  '........................',
] as const;

const CONNECT = [
  '........................',
  '........................',
  '........................',
  '..ooooooooo.............',
  '..ooooooooo.............',
  '..oo.....oo.............',
  '..oo.....ooyyy..........',
  '..oo.....ooyyy..........',
  '..oo.....oo.yy..........',
  '..oo.....oo.yy..........',
  '..ooooooooo.yy..........',
  '..ooooooooo.yy..........',
  '............yybbbbbbbb..',
  '............yybbbbbbbb..',
  '............yyb.....bb..',
  '............yyy.....bb..',
  '............yyy.....bb..',
  '.............bb.....bb..',
  '.............bb.....bb..',
  '.............bbbbbbbbb..',
  '.............bbbbbbbbb..',
  '........................',
  '........................',
  '........................',
] as const;

/* ------------------------------------------------------------- engagements */

const ASSESS = [
  '........................',
  '........................',
  '..ooooooooooooooo.......',
  '..ooooooooooooooo.......',
  '..oo...........oo.......',
  '..oo...........oo.......',
  '..oo..yyy..yyy.oo.......',
  '..oo..yyy..yyy.oo.......',
  '..oo..yyy..yyy.oo.......',
  '..oo...........oo.......',
  '..oo...........oo.......',
  '..oo..yyy..yyy.oo.......',
  '..oo..yyy..yyy.oo.......',
  '..oo..yyy..yyy.oo.......',
  '..oo...........oo.......',
  '..ooooooooooooooo.......',
  '..oooooooooooooowww.....',
  '................www.....',
  '................wwwww...',
  '..................www...',
  '..................wwwww.',
  '....................www.',
  '....................www.',
  '........................',
] as const;

const BUILD = [
  '........................',
  '........................',
  '...............wwwwww...',
  '...............wwwwww...',
  '...............wwwwww...',
  '...............wwwwww...',
  '........................',
  '.................ww.....',
  '.......oooooo....ww.....',
  '.......oooooo...........',
  '.......oooooo...........',
  '.......oooooo...........',
  '........................',
  '....yyyyyy.yyyyyy.......',
  '....yyyyyy.yyyyyy.......',
  '....yyyyyy.yyyyyy.......',
  '....yyyyyy.yyyyyy.......',
  '........................',
  '.bbbbbb.bbbbbb.bbbbbb...',
  '.bbbbbb.bbbbbb.bbbbbb...',
  '.bbbbbb.bbbbbb.bbbbbb...',
  '.bbbbbb.bbbbbb.bbbbbb...',
  '........................',
  '........................',
] as const;

const LEAD = [
  '........................',
  '........................',
  '........................',
  '..........wwooooooooo...',
  '..........wwooooooooo...',
  '..........wwooooooo.....',
  '..........wwooooooo.....',
  '..........wwooooo.......',
  '..........wwooooo.......',
  '..........ww............',
  '..........ww............',
  '..........ww............',
  '..........ww............',
  '..........ww............',
  '..........ww............',
  '..........ww............',
  '..........ww............',
  '..........ww............',
  '..........ww............',
  '....bbbbbbbbbbbbbbb.....',
  '....bbbbbbbbbbbbbbb.....',
  '....bbbbbbbbbbbbbbb.....',
  '........................',
  '........................',
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
