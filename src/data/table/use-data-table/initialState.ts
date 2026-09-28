/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../schema/field-descriptor';
import type { TableColumn, TableState } from '../types';
import { defaultColumns } from './defaultColumns';

const initialState = (
  schema: readonly FieldDescriptor[],
  initial?: readonly TableColumn[],
  initialGroupBy?: readonly string[],
): TableState => ({
  columns: initial ?? defaultColumns(schema),
  sort: [],
  groupBy: initialGroupBy ? [...initialGroupBy] : [],
});

export { initialState };
