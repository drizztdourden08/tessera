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

interface GridHeights {
  tile: number;
  head: number;
}

export type { GridHeights, GridLayout, LayoutRow, SectionShape };
