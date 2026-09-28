/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

interface ColumnDragGhostProps {
  label: string;
  path: string;
  field?: FieldDescriptor;
  rows: readonly unknown[];
  total: number;
}

export type { ColumnDragGhostProps };
