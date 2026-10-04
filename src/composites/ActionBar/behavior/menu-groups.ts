/* @layer renderer-components @kind util */
import type { MenuGroup, MenuItem } from '../../DropdownMenu/DropdownMenu.type';
import type { ActionBarMoreProps, ActionItem } from '../ActionBar.type';

const menuGroups = (source: Pick<ActionBarMoreProps, 'folded' | 'asks' | 'onPress'>, ellipsis: (label: string) => string): MenuGroup[] => {
  const { folded, asks, onPress } = source;
  const itemOf = (action: ActionItem): MenuItem => ({
    id: action.id,
    label: asks(action) ? ellipsis(action.label) : action.label,
    icon: action.icon,
    disabled: action.disabled,
    onSelect: () => onPress(action),
  });
  const items = (danger: boolean) => folded.filter((action) => (action.kind === 'danger') === danger).map(itemOf);
  return [{ id: 'actions', items: items(false) }, { id: 'danger', items: items(true) }].filter((group) => group.items.length > 0);
};

export { menuGroups };
