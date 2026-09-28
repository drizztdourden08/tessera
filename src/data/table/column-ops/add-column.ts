/* @layer renderer-components @kind logic */
import type { TableColumn } from '../types';
import { indexOfColumn } from './index-of-column';

const addColumn = (columns: readonly TableColumn[], path: string): readonly TableColumn[] =>
  indexOfColumn(columns, path) === -1 ? [...columns, { path, fit: true }] : columns;

export { addColumn };
