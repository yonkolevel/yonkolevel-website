export type Displacement = {
  row: number;
  col: number;
  displaceX: number;
  displaceY: number;
};

export type GridSize = { cols: number; rows: number };
export type ResolvedDisplacement = Displacement & { index: number };

export function getGridSize(width: number, height: number, pixelSize: number): GridSize {
  if (![width, height, pixelSize].every(Number.isFinite) || pixelSize <= 0) {
    return { cols: 0, rows: 0 };
  }
  return {
    cols: Math.max(0, Math.floor(width / pixelSize)),
    rows: Math.max(0, Math.floor(height / pixelSize)),
  };
}

/** Negative coordinates count from the far edge; invalid cells never wrap. First duplicate wins. */
export function resolveDisplacements(
  displacements: readonly Displacement[],
  { cols, rows }: GridSize,
): ResolvedDisplacement[] {
  const seen = new Set<string>();
  return displacements.flatMap((d, index) => {
    if (!Number.isInteger(d.col) || !Number.isInteger(d.row) ||
        !Number.isFinite(d.displaceX) || !Number.isFinite(d.displaceY)) return [];
    const col = d.col < 0 ? cols + d.col : d.col;
    const row = d.row < 0 ? rows + d.row : d.row;
    const key = `${row}:${col}`;
    if (col < 0 || col >= cols || row < 0 || row >= rows || seen.has(key) ||
        (d.displaceX === 0 && d.displaceY === 0)) return [];
    seen.add(key);
    return [{ ...d, row, col, index }];
  });
}
