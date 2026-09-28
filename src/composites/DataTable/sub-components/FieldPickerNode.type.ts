/* @layer renderer-components @kind types */
import type { PickerNode } from '../behavior/field-picker-nodes.type';

interface FieldPickerNodeProps {
  node: PickerNode;
  onPick: (path: string) => void;
}

interface PanelPosition {
  top: number;
  left: number;
}

export type { FieldPickerNodeProps, PanelPosition };
