/* @layer renderer-components @kind types */
import type { GridHeights, LayoutRow } from './grid-layout.type';

interface AnchorInput {
  rows: readonly LayoutRow[];
  before: GridHeights;
  after: GridHeights;
  scrollTop: number;
}

export type { AnchorInput };
