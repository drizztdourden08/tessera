/* @layer renderer-components @kind util */
import type { MenuGroup } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolbarChoices } from '../Toolbar.type';
import { menuIcon } from './menu-icon';
import { menuShortcut } from './menu-shortcut';

const choiceGroup = (item: ToolbarChoices): MenuGroup => ({
  id: item.id,
  label: item.label,
  items: item.choices.map((choice) => ({
    id: `${item.id}:${choice.value}`,
    label: choice.label,
    icon: menuIcon(choice.icon),
    description: choice.description,
    shortcut: menuShortcut(choice.shortcut),
    disabled: choice.disabled,
    kind: 'radio' as const,
    checked: item.value === choice.value,
    onSelect: () => item.onChange(choice.value),
  })),
});

export { choiceGroup };
