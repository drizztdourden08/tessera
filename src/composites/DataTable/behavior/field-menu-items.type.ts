/* @layer renderer-components @kind types */
import type { PickerNode } from './field-picker-nodes.type';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

interface FieldMenuInput {
  nodes: readonly PickerNode[];
  onPick: (path: string) => void;
  strings: TesseraStrings['table'];
}

export type { FieldMenuInput };
