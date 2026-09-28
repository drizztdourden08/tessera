/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';

const indexOfColumn = (columns: readonly TableColumn[], path: string): number =>
  columns.findIndex((column) => column.path === path);

export { indexOfColumn };
