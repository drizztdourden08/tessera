/* @layer renderer-components @kind types */
interface SectionShape {
  header: boolean;
  count: number;
  collapsed: boolean;
}

interface LayoutRow {
  kind: 'header' | 'tiles';
  section: number;
  heads: number;
  tiles: number;
  stop: number;
  first: number;
  size: number;
}

interface GridLayout {
  rows: readonly LayoutRow[];
  headers: number;
  tileRows: number;
  stops: number;
  items: number;
}

interface GridOffsets {
  above: readonly number[];
  heads: readonly number[];
  tiles: readonly number[];
  sizes: readonly number[];
  average: number;
}

interface GridHeights {
  tile: number;
  head: number;
  offsets?: GridOffsets;
}

export type { GridHeights, GridLayout, GridOffsets, LayoutRow, SectionShape };
