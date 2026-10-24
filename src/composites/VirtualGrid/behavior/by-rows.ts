/* @layer renderer-components @kind logic */
import type { GridStep } from './next-cell.type';

const byRows = (step: GridStep, rows: number): number => {
  const { layout, row, column } = step;
  const at = Math.min(Math.max(0, row + rows), layout.rows.length - 1);
  const target = layout.rows[at];
  if (!target) return step.active;
  return target.stop + Math.min(column, target.size - 1);
};

export { byRows };
