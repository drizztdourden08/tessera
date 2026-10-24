/* @layer renderer-components @kind types */
interface VisibleRangeInput {
  scrollTop: number;
  viewport: number;
  rowHeight: number;
  count: number;
  overscan: number;
}

interface RowRange {
  start: number;
  end: number;
}

export type { RowRange, VisibleRangeInput };
