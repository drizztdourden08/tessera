/* @layer renderer-components @kind types */
import type { FieldKind } from '../../../data/schema/field-descriptor';

interface PickerNode {
  path: string;
  label: string;
  kind: FieldKind;
  pickable: boolean;
  children: readonly PickerNode[];
}

export type { PickerNode };
