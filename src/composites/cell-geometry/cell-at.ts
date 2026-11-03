/* @layer renderer-components @kind logic */
import type { CellGeometry } from './cell-geometry.type';

const cellAt = (cells: CellGeometry, x: number, count: number): number => {
  let found = 0;
  for (let index = 1; index < count; index += 1) {
    if ((cells.lefts[index] ?? Number.POSITIVE_INFINITY) <= x) found = index;
  }
  return found;
};

export { cellAt };
