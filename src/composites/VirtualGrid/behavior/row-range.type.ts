/* @layer renderer-components @kind types */
import type { GridHeights, LayoutRow } from './grid-layout.type';

interface RangeInput {
  rows: readonly LayoutRow[];
  heights: GridHeights;
  scrollTop: number;
  viewport: number;
  overscan: number;
}

export type { RangeInput };
