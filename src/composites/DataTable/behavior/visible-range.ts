/* @layer renderer-components @kind logic */
import type { RowRange, VisibleRangeInput } from './visible-range.type';

const visibleRange = (input: VisibleRangeInput): RowRange => {
  const { scrollTop, viewport, rowHeight, count, overscan } = input;
  if (count <= 0) return { start: 0, end: 0 };
  if (rowHeight <= 0) return { start: 0, end: count };
  const top = Math.max(0, scrollTop);
  const first = Math.floor(top / rowHeight) - overscan;
  const last = Math.ceil((top + Math.max(0, viewport)) / rowHeight) + overscan;
  const start = Math.min(Math.max(0, first), count);
  const end = Math.min(Math.max(start, last), count);
  return { start, end };
};

export { visibleRange };
