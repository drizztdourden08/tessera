/* @layer renderer-components @kind logic */
import type { MenuGroup, MenuItem, MenuNode } from '../../DropdownMenu';
import { BAR_GROUP_ID, VIEW_ITEM_ID } from '../WindowTitleBar.constants';
import type { WindowTitleBarAction } from '../WindowTitleBar.type';
import type { TitleBarMenuInput } from './title-bar-menu.type';

const viewItems = (input: TitleBarMenuInput): MenuItem[] => {
  const { pin, fullscreenButton, pinned, fullscreen, onControl, strings } = input;
  const items: MenuItem[] = [];
  if (pin) items.push({ id: 'pin', icon: 'pin', label: strings.pinOnTop, checked: pinned, onSelect: () => onControl('pin') });
  if (fullscreenButton) {
    items.push({ id: 'fullscreen', icon: 'maximize-2', label: strings.fullscreen, checked: fullscreen, onSelect: () => onControl('fullscreen') });
  }
  return items;
};

const actionMenuItem = (action: WindowTitleBarAction): MenuItem => ({
  id: action.id, icon: action.icon, label: action.label, description: action.status, shortcut: action.shortcut, onSelect: action.onSelect,
});

const titleBarMenu = (input: TitleBarMenuInput): MenuGroup[] => {
  const view = viewItems(input);
  const items: MenuNode[] = [
    ...(view.length > 0 ? [{ id: VIEW_ITEM_ID, icon: 'app-window', label: input.strings.view, children: view } satisfies MenuItem] : []),
    ...input.actions.map(actionMenuItem),
  ];
  const { menu } = input;
  if (items.length === 0) return [...menu];
  const own: MenuGroup = { id: BAR_GROUP_ID, items };
  return menu.length < 2 ? [...menu, own] : [...menu.slice(0, -1), own, ...menu.slice(-1)];
};

export { titleBarMenu };
