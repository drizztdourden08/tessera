/* @layer renderer-components @kind util */
import type { MenuGroup, MenuItem, MenuNode } from '../../DropdownMenu/DropdownMenu.type';
import { choiceGroup } from './choice-group';
import { menuIcon } from './menu-icon';
import { menuShortcut } from './menu-shortcut';
import type { ToolbarButton, ToolbarItem, ToolbarNumber, ToolbarPopover, ToolbarToggle } from '../Toolbar.type';

const optionNodes = (groups: readonly MenuGroup[]): MenuNode[] =>
  groups.flatMap((group, index) => [...(index > 0 ? [{ separator: true } as const] : []), ...group.items]);

const withOptions = (item: ToolbarButton | ToolbarToggle, own: MenuItem): MenuItem => {
  if (item.options === undefined || item.options.length === 0) return own;
  return { id: item.id, label: item.label, icon: menuIcon(item.icon), disabled: item.disabled, children: [own, { separator: true }, ...optionNodes(item.options)] };
};

const buttonEntry = (item: ToolbarButton): MenuItem => withOptions(item, {
  id: `${item.id}-run`, label: item.label, icon: menuIcon(item.icon), description: item.description, shortcut: menuShortcut(item.shortcut), disabled: item.disabled, onSelect: item.onSelect,
});

const toggleEntry = (item: ToolbarToggle): MenuItem => withOptions(item, {
  id: `${item.id}-toggle`, label: item.label, icon: menuIcon(item.icon), description: item.description, shortcut: menuShortcut(item.shortcut), disabled: item.disabled,
  kind: 'check', checked: item.pressed, onSelect: () => item.onChange(!item.pressed),
});

const numberEntry = (item: ToolbarNumber): MenuItem => ({
  id: item.id, label: item.label, description: item.description, disabled: item.disabled, kind: 'slider',
  value: item.value, min: item.min, max: item.max, step: item.step, onChange: item.onChange,
});

const popoverEntry = (item: ToolbarPopover): MenuItem => ({
  id: item.id, label: item.label, icon: menuIcon(item.icon), description: item.description, disabled: item.disabled === true || item.onFold === undefined, onSelect: item.onFold,
});

const entryOf = (item: ToolbarButton | ToolbarToggle | ToolbarNumber | ToolbarPopover): MenuItem => {
  if (item.kind === 'button') return buttonEntry(item);
  if (item.kind === 'toggle') return toggleEntry(item);
  if (item.kind === 'popover') return popoverEntry(item);
  return numberEntry(item);
};

const foldedGroups = (folded: readonly ToolbarItem[]): MenuGroup[] => {
  const groups: MenuGroup[] = [];
  let run: MenuNode[] = [];
  let heading: string | undefined;
  const flush = (): void => {
    if (run.length > 0) groups.push({ id: `folded-${groups.length}`, label: heading, items: run });
    run = [];
    heading = undefined;
  };
  folded.forEach((item: ToolbarItem) => {
    if (item.kind === 'separator') {
      flush();
      heading = item.label;
    } else if (item.kind === 'group') {
      flush();
      groups.push(choiceGroup(item));
    } else run.push(entryOf(item));
  });
  flush();
  return groups;
};

export { foldedGroups };
