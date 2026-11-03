/* @layer renderer-components @kind logic */
import { borderX } from './border-x';
import type { CellGeometry } from './cell-geometry.type';

const nearestBorder = (cells: CellGeometry, x: number, count: number): number => {
  let best = 0;
  for (let border = 1; border <= count; border += 1) {
    if (Math.abs(borderX(cells, border, count) - x) < Math.abs(borderX(cells, best, count) - x)) best = border;
  }
  return best;
};

export { nearestBorder };
