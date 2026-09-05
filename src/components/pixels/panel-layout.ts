import type { GridSize, ResolvedDisplacement } from './geometry';

export type PanelSide = 'left' | 'right' | 'full';

/** Site panel policy: keep holes at the perimeter and throws within the padding/gutter. */
export function constrainPanelDisplacements(
  pixels: readonly ResolvedDisplacement[],
  { cols, rows }: GridSize,
  side: PanelSide,
): ResolvedDisplacement[] {
  const inwardX = side === 'left' ? 1 : side === 'right' ? -1 : 0;
  return pixels.flatMap((d) => {
    const onLeft = d.col === 0;
    const onRight = d.col === cols - 1;
    const onTop = d.row === 0;
    const onBottom = d.row === rows - 1;
    if (!onLeft && !onRight && !onTop && !onBottom) return [];

    let dx = d.displaceX;
    let dy = d.displaceY;
    if (onLeft && !onRight && dx > 0) dx = 0;
    if (onRight && !onLeft && dx < 0) dx = 0;
    if (onTop && !onBottom && dy > 0) dy = 0;
    if (onBottom && !onTop && dy < 0) dy = 0;
    dy = Math.max(-1, Math.min(3, dy));
    const limit = inwardX !== 0 && Math.sign(dx) === inwardX ? 1 : 2;
    dx = Math.max(-limit, Math.min(limit, dx));
    return dx === 0 && dy === 0 ? [] : [{ ...d, displaceX: dx, displaceY: dy }];
  });
}
