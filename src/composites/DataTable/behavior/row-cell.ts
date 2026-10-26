/* @layer renderer-components @kind logic */
import { cellContent } from './cell-content';
import type { ReactNode } from 'react';
import type { TableColumn } from '../../../data/table/types';
import type { RowRenderContext } from '../DataTable.type';

const rowCell = <T>(row: T, column: TableColumn, context: RowRenderContext<T>): ReactNode => {
  const { schema, renderCell, resolveIdRefDisplay, resolveIdRefDefault, resolveIdRefHref } = context;
  const custom = renderCell?.(row, column.path);
  if (custom !== undefined) return custom;
  return cellContent(row, column.path, schema.byPath(column.path), {
    displayField: column.displayField,
    resolve: resolveIdRefDisplay,
    resolveDefault: resolveIdRefDefault,
    resolveHref: resolveIdRefHref,
  });
};

export { rowCell };
