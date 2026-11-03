/* @layer renderer-components @kind logic */
import type { CellGeometry } from './cell-geometry.type';

const borderX = (cells: CellGeometry, border: number, count: number): number => {
  if (count === 0) return 0;
  if (border >= count) return (cells.lefts[count - 1] ?? 0) + (cells.widths[count - 1] ?? 0);
  return cells.lefts[Math.max(0, border)] ?? 0;
};

export { borderX };
