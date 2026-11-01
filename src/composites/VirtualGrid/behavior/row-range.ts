/* @layer renderer-components @kind logic */
import { firstRowFrom } from './first-row-from';
import type { RowRange } from '../../virtual';
import type { RangeInput } from './row-range.type';

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
