/* @layer renderer-components @kind util */
import type { MenuGroup, MenuItem, MenuNode } from '../../DropdownMenu/DropdownMenu.type';
import { menuIcon } from './menu-icon';
import type { ToolbarButton, ToolbarChoices, ToolbarItem, ToolbarNumber, ToolbarToggle } from '../Toolbar.type';

const optionNodes = (groups: readonly MenuGroup[]): MenuNode[] =>
  groups.flatMap((group, index) => [...(index > 0 ? [{ separator: true } as const] : []), ...group.items]);

const withOptions = (item: ToolbarButton | ToolbarToggle, own: MenuItem): MenuItem => {
  if (item.options === undefined || item.options.length === 0) return own;
  return { id: item.id, label: item.label, icon: menuIcon(item.icon), disabled: item.disabled, children: [own, { separator: true }, ...optionNodes(item.options)] };
};

const buttonEntry = (item: ToolbarButton): MenuItem => withOptions(item, {
  id: `${item.id}-run`, label: item.label, icon: menuIcon(item.icon), description: item.description, shortcut: item.shortcut, disabled: item.disabled, onSelect: item.onSelect,
});

const toggleEntry = (item: ToolbarToggle): MenuItem => withOptions(item, {
  id: `${item.id}-toggle`, label: item.label, icon: menuIcon(item.icon), description: item.description, shortcut: item.shortcut, disabled: item.disabled,
  kind: 'check', checked: item.pressed, onSelect: () => item.onChange(!item.pressed),
});

const numberEntry = (item: ToolbarNumber): MenuItem => ({
  id: item.id, label: item.label, description: item.description, disabled: item.disabled, kind: 'slider',
  value: item.value, min: item.min, max: item.max, step: item.step, onChange: item.onChange,
});

const choiceGroup = (item: ToolbarChoices): MenuGroup => ({
  id: item.id,
  label: item.label,
  items: item.choices.map((choice) => ({
    id: `${item.id}:${choice.value}`,
    label: choice.label,
    icon: menuIcon(choice.icon),
    description: choice.description,
    shortcut: choice.shortcut,
    disabled: choice.disabled,
    kind: 'radio' as const,
    checked: item.value === choice.value,
    onSelect: () => item.onChange(choice.value),
  })),
});

const entryOf = (item: ToolbarButton | ToolbarToggle | ToolbarNumber): MenuItem => {
  if (item.kind === 'button') return buttonEntry(item);
  if (item.kind === 'toggle') return toggleEntry(item);
  return numberEntry(item);
};

const foldedGroups = (folded: readonly ToolbarItem[]): MenuGroup[] => {
  const groups: MenuGroup[] = [];
  let run: MenuNode[] = [];
  const flush = (): void => {
    if (run.length > 0) groups.push({ id: `folded-${groups.length}`, items: run });
    run = [];
  };
  folded.forEach((item: ToolbarItem) => {
    if (item.kind === 'separator') flush();
    else if (item.kind === 'group') {
      flush();
      groups.push(choiceGroup(item));
    } else run.push(entryOf(item));
  });
  flush();
  return groups;
};

export { foldedGroups };
