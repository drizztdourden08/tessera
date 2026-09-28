/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';
import { indexOfColumn } from './index-of-column';

const insertColumnAt = (
  columns: readonly TableColumn[],
  path: string,
  at: number,
): readonly TableColumn[] => {
  if (indexOfColumn(columns, path) !== -1) return columns;
  const next = [...columns];
  next.splice(Math.min(Math.max(at, 0), columns.length), 0, { path, fit: true });
  return next;
};

export { insertColumnAt };
