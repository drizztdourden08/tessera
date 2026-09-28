/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { EditorControlProps, FieldControl } from '../../field-kits/registry.type';
import type { EditorBinding } from '../RecordEditor.type';

interface NestedArrayGroupProps {
  address: string;
  index: number;
  row: readonly unknown[];
  inner: FieldDescriptor;
  Control: FieldControl<EditorControlProps>;
  binding: EditorBinding;
  addLabel: string;
  onRowChange: (next: readonly unknown[]) => void;
  onRemove: () => void;
}

export type { NestedArrayGroupProps };
