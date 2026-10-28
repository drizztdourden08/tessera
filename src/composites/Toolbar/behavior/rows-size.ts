/* @layer renderer-components @kind util */
import type { FitCell } from './fit-columns.type';

const rowsSize = (cells: readonly FitCell[], columns: number, gap: number): number => {
  let total = 0;
  let rows = 0;
  let filled = 0;
  let tall = 0;
  const flush = (): void => {
    if (filled === 0) return;
    total += tall;
    rows += 1;
    filled = 0;
    tall = 0;
  };
  for (const cell of cells) {
    if (cell.span) {
      flush();
      total += cell.size;
      rows += 1;
    } else {
      tall = Math.max(tall, cell.size);
      filled += 1;
      if (filled === columns) flush();
    }
  }
  flush();
  return total + gap * Math.max(rows - 1, 0);
};

export { rowsSize };
