/* @layer renderer-components @kind logic */
import type { PickerNode } from './field-picker-nodes.type';
import type { MenuItem } from '../../DropdownMenu';
import type { FieldMenuInput } from './field-menu-items.type';

const toEntries = (
  nodes: readonly PickerNode[],
  onPick: (path: string) => void,
): MenuItem[] =>
  nodes.map((node) => (node.pickable
    ? { id: node.path, label: node.label, onSelect: () => onPick(node.path) }
    : { id: node.path, label: node.label, children: toEntries(node.children, onPick) }));

const buildFieldMenuItems = (input: FieldMenuInput): MenuItem[] => {
  const { nodes, onPick, strings } = input;
  if (nodes.length === 0) return [{ id: 'empty', label: strings.noFieldsLeft, disabled: true }];
  return toEntries(nodes, onPick);
};

export { buildFieldMenuItems };
