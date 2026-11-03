/* @layer renderer-components @kind logic */
import { borderX } from './border-x';
import type { CellBox, CellGeometry, CellSpan } from './cell-geometry.type';

const spanBox = (cells: CellGeometry, span: CellSpan, count: number): CellBox => {
  const left = borderX(cells, span.start, count);
  return { left, width: borderX(cells, span.end + 1, count) - left };
};

export { spanBox };
