/* @layer renderer-components @kind logic */
import { ID_KEY, ID_LABEL, REFERENCE_KIND } from './column-display-items.constants';
import { menuIcon } from './menu-icon';
import type { MenuEntry, MenuItem } from '../../DropdownMenu';
import type { ColumnDisplayInput } from './column-display-items.type';

const buildColumnDisplayItems = (input: ColumnDisplayInput): MenuEntry[] => {
  const { path, field, displayField, resolveTargetFields, actions, act } = input;
  if (field?.kind !== REFERENCE_KIND || !field.targetKind) return [];

  const targets = resolveTargetFields?.(field.targetKind) ?? [];
  if (targets.length === 0) return [];

  const children: MenuItem[] = [
    {
      key: ID_KEY,
      label: ID_LABEL,
      checked: displayField === undefined,
      onClick: act(() => actions.onSetDisplayField(path, undefined)),
    },
    ...targets.map((target) => ({
      key: `display-${target.path}`,
      label: target.label,
      description: target.path,
      checked: displayField === target.path,
      onClick: act(() => actions.onSetDisplayField(path, target.path)),
    })),
  ];

  return [{ key: 'display-as', icon: menuIcon('arrow-left-right'), label: 'Display as...', children }];
};

export { buildColumnDisplayItems };
