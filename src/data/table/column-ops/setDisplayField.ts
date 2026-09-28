/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';

const setDisplayField = (
  columns: readonly TableColumn[],
  path: string,
  displayField: string | undefined,
): readonly TableColumn[] =>
  columns.map((column) => {
    if (column.path !== path) return column;
    const next: TableColumn = { ...column };
    if (displayField) next.displayField = displayField;
    else delete next.displayField;
    return next;
  });

export { setDisplayField };
