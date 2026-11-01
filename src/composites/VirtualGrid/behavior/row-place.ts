/* @layer renderer-components @kind logic */
import type { GridHeights, LayoutRow } from './grid-layout.type';

const rowPlace = (row: LayoutRow, heights: GridHeights, at: number): { top: number; height: number } => {
  const { offsets, head, tile } = heights;
  const own = row.kind === 'header' ? head : tile;
  if (!offsets) return { top: row.heads * head + row.tiles * tile, height: own };
  const top = (offsets.above[at] ?? 0) + (offsets.heads[at] ?? 0) * head + (offsets.tiles[at] ?? 0) * tile;
  const size = offsets.sizes[at] ?? 0;
  return { top, height: size > 0 ? size : own };
};

export { rowPlace };
