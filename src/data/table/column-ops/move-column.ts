/* @layer renderer-components @kind logic */
import type { ColumnMove, TableColumn } from '../types';
import { indexOfColumn } from './index-of-column';
import { relocate } from './relocate';

const targetIndex = (from: number, move: ColumnMove, length: number): number => {
  if (move === 'first') return 0;
  if (move === 'last') return length - 1;
  const to = move === 'left' ? from - 1 : from + 1;
  return Math.min(Math.max(to, 0), length - 1);
};

const moveColumn = (
  columns: readonly TableColumn[],
  path: string,
  move: ColumnMove,
): readonly TableColumn[] => {
  const from = indexOfColumn(columns, path);
  if (from === -1) return columns;
  const to = targetIndex(from, move, columns.length);
  if (to === from) return columns;
  return relocate(columns, from, to);
};

export { moveColumn };
