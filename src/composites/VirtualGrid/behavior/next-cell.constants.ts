/* @layer renderer-components @kind constants */
import { byRows } from './by-rows';
import { rowStart } from './row-start';
import type { GridMove } from './next-cell.type';

const GRID_MOVES = new Map<string, GridMove>([
  ['ArrowLeft', (shape) => Math.max(shape.active - 1, 0)],
  ['ArrowRight', (shape) => Math.min(shape.active + 1, shape.count - 1)],
  ['ArrowUp', (shape) => byRows(shape, -1)],
  ['ArrowDown', (shape) => byRows(shape, 1)],
  ['PageUp', (shape) => byRows(shape, -shape.page)],
  ['PageDown', (shape) => byRows(shape, shape.page)],
  ['Home', (shape, ctrl) => (ctrl ? 0 : rowStart(shape))],
  ['End', (shape, ctrl) => (ctrl ? shape.count - 1 : Math.min(rowStart(shape) + shape.columns - 1, shape.count - 1))],
]);

export { GRID_MOVES };
