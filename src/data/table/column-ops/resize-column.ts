/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';

const withWidth = (column: TableColumn, width: number): TableColumn => {
  const next: TableColumn = { ...column, width };
  delete next.grow;
  delete next.fit;
  return next;
};

const resizeColumn = (
  columns: readonly TableColumn[],
  path: string,
  width: number,
): readonly TableColumn[] =>
  columns.map((column) => (column.path === path ? withWidth(column, width) : column));

export { resizeColumn };
