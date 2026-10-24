/* @layer renderer-components @kind logic */
import type { GridHeights, LayoutRow } from './grid-layout.type';

const rowPlace = (row: LayoutRow, heights: GridHeights): { top: number; height: number } => ({
  top: row.heads * heights.head + row.tiles * heights.tile,
  height: row.kind === 'header' ? heights.head : heights.tile,
});

export { rowPlace };
