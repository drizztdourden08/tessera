/* @layer renderer-components @kind logic */
import type { CellGeometry } from './cell-geometry.type';

const cellCount = (cells: CellGeometry, count?: number): number =>
  Math.max(0, Math.min(count ?? cells.lefts.length, cells.lefts.length, cells.widths.length));

export { cellCount };
