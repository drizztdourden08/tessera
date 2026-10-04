/* @layer renderer-components @kind logic */
import { createElement } from 'react';
import type { MenuGroup, MenuItem, MenuNode } from '../../DropdownMenu';
import { TitleBarActionIcon } from '../sub-components/TitleBarActionIcon';
import { BAR_GROUP_ID, VIEW_ITEM_ID } from '../WindowTitleBar.constants';
import type { WindowTitleBarAction } from '../WindowTitleBar.type';
import { dropdownNodes } from './dropdown-nodes';
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

const actionMenuItem = (action: WindowTitleBarAction): MenuItem[] => {
  const { id, icon, label, shortcut } = action;
  if (action.bar !== 'dropdown') {
    const look = action.tone !== undefined || action.effect !== undefined ? createElement(TitleBarActionIcon, { action }) : icon;
    return [{ id, icon: look, label, description: action.status, shortcut, onSelect: action.onSelect }];
  }
  const children = dropdownNodes(action.groups);
  return children.length > 0 ? [{ id, icon, label, shortcut, children }] : [];
};

const titleBarMenu = (input: TitleBarMenuInput): MenuGroup[] => {
  const view = viewItems(input);
  const items: MenuNode[] = [
    ...(view.length > 0 ? [{ id: VIEW_ITEM_ID, icon: 'app-window', label: input.strings.view, children: view } satisfies MenuItem] : []),
    ...input.actions.flatMap(actionMenuItem),
  ];
  const { menu } = input;
  if (items.length === 0) return [...menu];
  const own: MenuGroup = { id: BAR_GROUP_ID, items };
  return menu.length < 2 ? [...menu, own] : [...menu.slice(0, -1), own, ...menu.slice(-1)];
};

export { titleBarMenu };
