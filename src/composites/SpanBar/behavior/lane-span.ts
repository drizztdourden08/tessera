/* @layer renderer-components @kind logic */
import { cellAt } from '../../cell-geometry';
import type { CellGeometry, CellSpan } from '../../cell-geometry';

const laneSpan = (cells: CellGeometry, total: number, fromX: number, toX: number): CellSpan => {
  const first = cellAt(cells, fromX, total);
  const second = cellAt(cells, toX, total);
  return { start: Math.min(first, second), end: Math.max(first, second) };
};

export { laneSpan };
