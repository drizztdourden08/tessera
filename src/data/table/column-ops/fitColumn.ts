/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';
import { withFit } from './withFit';

const fitColumn = (columns: readonly TableColumn[], path: string): readonly TableColumn[] =>
  columns.map((column) => (column.path === path ? withFit(column) : column));

export { fitColumn };
