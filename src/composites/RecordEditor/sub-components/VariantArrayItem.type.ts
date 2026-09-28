/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { EditorBinding } from '../RecordEditor.type';

interface VariantArrayItemProps {
  element: FieldDescriptor;
  address: string;
  list: readonly unknown[];
  index: number;
  branches: readonly FieldDescriptor[];
  binding: EditorBinding;
  depth: number;
  onWrite: (next: readonly unknown[]) => void;
  onBranch: (index: number, branchKey: string) => void;
}

export type { VariantArrayItemProps };
