/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';

const withGrow = (column: TableColumn): TableColumn => {
  const next: TableColumn = { ...column, grow: true };
  delete next.width;
  delete next.fit;
  return next;
};

const growColumn = (columns: readonly TableColumn[], path: string): readonly TableColumn[] =>
  columns.map((column) => (column.path === path ? withGrow(column) : column));

export { growColumn };
