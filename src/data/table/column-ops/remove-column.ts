/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';

const removeColumn = (columns: readonly TableColumn[], path: string): readonly TableColumn[] =>
  columns.filter((column) => column.path !== path);

export { removeColumn };
