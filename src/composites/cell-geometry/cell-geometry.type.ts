/* @layer renderer-components @kind types */
interface CellGeometry {
  lefts: readonly number[];
  widths: readonly number[];
}

interface CellSpan {
  start: number;
  end: number;
}

interface CellBox {
  left: number;
  width: number;
}

export type { CellBox, CellGeometry, CellSpan };
