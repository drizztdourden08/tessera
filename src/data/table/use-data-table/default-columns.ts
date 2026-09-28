/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../schema/field-descriptor';
import type { TableColumn } from '../types';

const defaultColumns = (schema: readonly FieldDescriptor[]): readonly TableColumn[] =>
  schema.filter((field) => !field.hidden).map((field) => ({ path: field.path, fit: true }));

export { defaultColumns };
