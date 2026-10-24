/* @layer renderer-components @kind logic */
import { rowPlace } from './row-place';
import type { RowRange } from '../../virtual';
import type { GridHeights, LayoutRow } from './grid-layout.type';
import type { RangeInput } from './row-range.type';

const firstRowFrom = (rows: readonly LayoutRow[], heights: GridHeights, edge: number, inclusive: boolean): number => {
  let low = 0;
  let high = rows.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    const row = rows[middle];
    if (!row) break;
    const place = rowPlace(row, heights);
    const reached = inclusive ? place.top + place.height > edge : place.top >= edge;
    if (reached) high = middle;
    else low = middle + 1;
  }
  return low;
};

const rowRange = (input: RangeInput): RowRange => {
  const { rows, heights, scrollTop, viewport, overscan } = input;
  if (rows.length === 0) return { start: 0, end: 0 };
  if (heights.tile <= 0) return { start: 0, end: rows.length };
  const top = Math.max(0, scrollTop);
  const start = Math.max(0, firstRowFrom(rows, heights, top, true) - overscan);
  const end = Math.min(rows.length, firstRowFrom(rows, heights, top + Math.max(0, viewport), false) + overscan);
  return { start: Math.min(start, rows.length), end: Math.max(start, end) };
};

export { rowRange };
