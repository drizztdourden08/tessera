/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

interface FieldPickerProps {
  schema: readonly FieldDescriptor[];
  onPick: (path: string) => void;
  excludePaths?: readonly string[];
  emptyMessage?: string;
}

export type { FieldPickerProps };
