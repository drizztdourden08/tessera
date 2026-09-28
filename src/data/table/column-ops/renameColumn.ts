/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';

const renameColumn = (
  columns: readonly TableColumn[],
  path: string,
  label: string,
): readonly TableColumn[] =>
  columns.map((column) => {
    if (column.path !== path) return column;
    const next: TableColumn = { ...column };
    if (label) next.label = label;
    else delete next.label;
    return next;
  });

export { renameColumn };
