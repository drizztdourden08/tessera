/* @layer renderer-components @kind logic */
import { rowPlace } from './row-place';
import type { GridHeights, LayoutRow } from './grid-layout.type';

const firstRowFrom = (rows: readonly LayoutRow[], heights: GridHeights, edge: number, inclusive: boolean): number => {
  let low = 0;
  let high = rows.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    const row = rows[middle];
    if (!row) break;
    const place = rowPlace(row, heights, middle);
    const reached = inclusive ? place.top + place.height > edge : place.top >= edge;
    if (reached) high = middle;
    else low = middle + 1;
  }
  return low;
};

export { firstRowFrom };
