/* @layer renderer-components @kind types */
import type { PickerNode } from './field-picker-nodes.type';

interface FieldMenuInput {
  nodes: readonly PickerNode[];
  onPick: (path: string) => void;
  emptyLabel?: string;
}

export type { FieldMenuInput };
