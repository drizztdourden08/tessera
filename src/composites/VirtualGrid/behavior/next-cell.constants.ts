/* @layer renderer-components @kind constants */
import { byRows } from './by-rows';
import type { GridMove } from './next-cell.type';

const rowEnd = (stop: number, size: number): number => stop + size - 1;

const GRID_MOVES = new Map<string, GridMove>([
  ['ArrowLeft', (step) => Math.max(step.active - 1, 0)],
  ['ArrowRight', (step) => Math.min(step.active + 1, step.layout.stops - 1)],
  ['ArrowUp', (step) => byRows(step, -1)],
  ['ArrowDown', (step) => byRows(step, 1)],
  ['PageUp', (step) => byRows(step, -step.page)],
  ['PageDown', (step) => byRows(step, step.page)],
  ['Home', (step) => (step.ctrl ? 0 : step.active - step.column)],
  ['End', (step) => (step.ctrl ? step.layout.stops - 1 : rowEnd(step.active - step.column, step.layout.rows[step.row]?.size ?? 1))],
]);

export { GRID_MOVES };
