/* @layer renderer-components @kind types */
import type { ScrollAlign } from '../../virtual';
import type { GridHeights, GridLayout } from './grid-layout.type';

interface OffsetInput {
  layout: GridLayout;
  heights: GridHeights;
  index: number;
  viewport: number;
  scrollTop: number;
  align: ScrollAlign;
}

export type { OffsetInput };
