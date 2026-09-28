/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';
import { indexOfColumn } from './index-of-column';
import { relocate } from './relocate';

const reorderColumn = (
  columns: readonly TableColumn[],
  path: string,
  to: number,
): readonly TableColumn[] => {
  const from = indexOfColumn(columns, path);
  if (from === -1 || to < 0 || to >= columns.length || to === from) return columns;
  return relocate(columns, from, to);
};

export { reorderColumn };
