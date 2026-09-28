/* @layer renderer-components @kind logic */
import { DEFAULT_EMPTY_LABEL } from './field-menu-items.constants';
import type { PickerNode } from './field-picker-nodes.type';
import type { MenuItem } from '../../DropdownMenu';
import type { FieldMenuInput } from './field-menu-items.type';

const toEntries = (
  nodes: readonly PickerNode[],
  onPick: (path: string) => void,
): MenuItem[] =>
  nodes.map((node) => (node.pickable
    ? { key: node.path, label: node.label, onClick: () => onPick(node.path) }
    : { key: node.path, label: node.label, children: toEntries(node.children, onPick) }));

const buildFieldMenuItems = (input: FieldMenuInput): MenuItem[] => {
  const { nodes, onPick, emptyLabel = DEFAULT_EMPTY_LABEL } = input;
  if (nodes.length === 0) return [{ key: 'empty', label: emptyLabel, disabled: true }];
  return toEntries(nodes, onPick);
};

export { buildFieldMenuItems };
