import * as React from 'react';

/**
 * Small flat spot illustrations for the Studio sections: stacked pixel blocks
 * with a smiling face, built from the site palette. Decorative only.
 */

type SpotProps = {
  className?: string;
};

const INK = '#121212';
const ORANGE = '#FE6A5A';
const BLUE = '#007AFF';
const YELLOW = '#FCC552';
const PALE = '#FDE895';

function Face({
  x,
  y,
  spread = 10,
  size = 4,
}: {
  x: number;
  y: number;
  spread?: number;
  size?: number;
}) {
  return (
    <>
      <rect x={x} y={y} width={size} height={size} fill={INK} />
      <rect x={x + spread} y={y} width={size} height={size} fill={INK} />
      <path
        d={`M${x} ${y + 9} C${x + 2} ${y + 13}, ${x + spread + size - 2} ${
          y + 13
        }, ${x + spread + size} ${y + 9}`}
        stroke={INK}
        strokeWidth='3'
        strokeLinecap='round'
        fill='none'
      />
    </>
  );
}

function Spot({
  children,
  className = '',
}: SpotProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox='0 0 64 64'
      width='64'
      height='64'
      fill='none'
      aria-hidden='true'
      focusable='false'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      {children}
    </svg>
  );
}

/** A block lifted out of the stack: something being made. */
export function CreateSpot({ className }: SpotProps) {
  return (
    <Spot className={className}>
      <rect x='34' y='10' width='16' height='16' fill={YELLOW} />
      <rect x='22' y='14' width='6' height='6' fill={PALE} />
      <rect x='36' y='38' width='18' height='18' fill={BLUE} />
      <rect x='8' y='30' width='26' height='26' fill={ORANGE} />
      <Face x={14} y={38} spread={10} />
    </Spot>
  );
}

/** Blocks rising in a column: something getting stronger. */
export function StrengthenSpot({ className }: SpotProps) {
  return (
    <Spot className={className}>
      <rect x='45' y='4' width='6' height='6' fill={PALE} />
      <rect x='6' y='42' width='15' height='14' fill={YELLOW} />
      <rect x='24' y='30' width='15' height='26' fill={ORANGE} />
      <rect x='42' y='16' width='15' height='40' fill={BLUE} />
      <Face x={45} y={26} spread={7} size={3.5} />
    </Spot>
  );
}

/** Two blocks bridged by a pixel run: something joined up. */
export function ConnectSpot({ className }: SpotProps) {
  return (
    <Spot className={className}>
      <rect x='52' y='12' width='6' height='6' fill={PALE} />
      <rect x='30' y='29' width='8' height='5' fill={YELLOW} />
      <rect x='36' y='32' width='22' height='22' fill={BLUE} />
      <rect x='6' y='18' width='24' height='24' fill={ORANGE} />
      <Face x={12} y={26} spread={10} />
    </Spot>
  );
}
