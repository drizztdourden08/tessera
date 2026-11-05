/* @layer renderer-components @kind logic */
import type { MenuNode } from '../../DropdownMenu';
import type { ViewOption } from '../GroupControl.type';

const choiceMenuItems = (
  options: readonly ViewOption[],
  value: string | null,
  noneLabel: string,
  onPick: (next: string | null) => void,
): MenuNode[] => [
  { id: 'none', label: noneLabel, kind: 'radio', checked: value === null, onSelect: () => onPick(null) },
  ...options.map((option): MenuNode => ({
    id: option.id,
    label: option.label,
    kind: 'radio',
    checked: option.id === value,
    onSelect: () => onPick(option.id),
  })),
];

export { choiceMenuItems };
