/* @layer renderer-components @kind logic */
import { ID_KEY, REFERENCE_KIND } from './column-display-items.constants';
import { menuIcon } from './menu-icon';
import type { MenuItem, MenuNode } from '../../DropdownMenu';
import type { ColumnDisplayInput } from './column-display-items.type';

const buildColumnDisplayItems = (input: ColumnDisplayInput): MenuNode[] => {
  const { path, field, displayField, resolveTargetFields, actions, act, strings } = input;
  if (field?.kind !== REFERENCE_KIND || !field.targetKind) return [];

  const targets = resolveTargetFields?.(field.targetKind) ?? [];
  if (targets.length === 0) return [];

  const children: MenuItem[] = [
    {
      id: ID_KEY,
      label: strings.referenceId,
      checked: displayField === undefined,
      onSelect: act(() => actions.onSetDisplayField(path, undefined)),
    },
    ...targets.map((target) => ({
      id: `display-${target.path}`,
      label: target.label,
      description: target.path,
      checked: displayField === target.path,
      onSelect: act(() => actions.onSetDisplayField(path, target.path)),
    })),
  ];

  return [{ id: 'display-as', icon: menuIcon('arrow-left-right'), label: strings.displayAs, children }];
};

export { buildColumnDisplayItems };
