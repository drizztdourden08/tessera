/* @layer renderer-components @kind types */
interface DragWidthInput {
  startWidth: number;
  startX: number;
  clientX: number;
}

interface ColumnWidth {
  path: string;
  width: number;
}

export type { ColumnWidth, DragWidthInput };
