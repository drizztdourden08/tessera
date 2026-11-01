/* @layer renderer-components @kind logic */
import type { GridHeights, GridLayout } from './grid-layout.type';

const gridTotal = (layout: GridLayout, heights: GridHeights): number => {
  const { offsets, head, tile } = heights;
  if (!offsets) return layout.headers * head + layout.tileRows * tile;
  const last = layout.rows.length;
  return (offsets.above[last] ?? 0) + (offsets.heads[last] ?? 0) * head + (offsets.tiles[last] ?? 0) * tile;
};

export { gridTotal };
