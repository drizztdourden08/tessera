/* @layer renderer-components @kind logic */
import type { MenuItem } from '../../DropdownMenu';
import { WINDOW_GROUP_ITEM_ID } from '../WindowTitleBar.constants';
import type { TitleBarMenuInput } from './title-bar-menu.type';

const windowGroupItem = (input: TitleBarMenuInput): MenuItem | null => {
  const { windowGroups, windowGroup = null, onWindowGroupChange, strings } = input;
  if (!windowGroups) return null;
  const choices = [{ id: null, label: strings.windowGroupNone }, ...windowGroups];
  const children: MenuItem[] = choices.map(({ id, label }) => ({
    id: `${WINDOW_GROUP_ITEM_ID}:${id ?? ''}`,
    kind: 'radio',
    label,
    checked: windowGroup === id,
    onSelect: () => onWindowGroupChange?.(id),
  }));
  return { id: WINDOW_GROUP_ITEM_ID, icon: 'group', label: strings.windowGroup, children };
};

export { windowGroupItem };
