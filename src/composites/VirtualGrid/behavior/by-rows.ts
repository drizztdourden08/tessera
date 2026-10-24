/* @layer renderer-components @kind logic */
import { gridRows } from './grid-rows';
import type { GridShape } from '../VirtualGrid.type';

const byRows = (shape: GridShape, rows: number): number => {
  const { active, count, columns } = shape;
  const lastRow = gridRows(count, columns) - 1;
  const row = Math.min(Math.max(0, Math.floor(active / columns) + rows), lastRow);
  return Math.min(row * columns + (active % columns), count - 1);
};

export { byRows };
