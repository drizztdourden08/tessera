/* @layer renderer-components @kind logic */
import { createElement } from 'react';
import type { MenuGroup, MenuItem, MenuNode } from '../../DropdownMenu';
import { TitleBarActionIcon } from '../sub-components/TitleBarActionIcon';
import { BAR_GROUP_ID, VIEW_ITEM_ID } from '../WindowTitleBar.constants';
import type { WindowTitleBarAction } from '../WindowTitleBar.type';
import { controlItems } from './control-items';
import { dropdownNodes } from './dropdown-nodes';
import { insertNode } from './insert-node';
import type { TitleBarMenuInput } from './title-bar-menu.type';
import { viewPlace } from './view-place';

const actionMenuItem = (action: WindowTitleBarAction): MenuItem[] => {
  const { id, label, shortcut } = action;
  const icon = action.tone !== undefined || action.effect !== undefined ? createElement(TitleBarActionIcon, { action }) : action.icon;
  if (action.bar !== 'dropdown') return [{ id, icon, label, description: action.status, shortcut, onSelect: action.onSelect }];
  const children = dropdownNodes(action.groups);
  return children.length > 0 ? [{ id, icon, label, shortcut, children }] : [];
};

const viewMenuItem = (input: TitleBarMenuInput): MenuItem | undefined => {
  const children = input.view === false ? [] : controlItems(input, () => true);
  return children.length > 0 ? { id: VIEW_ITEM_ID, icon: 'app-window', label: input.strings.view, children } : undefined;
};

const tuckedItems = (input: TitleBarMenuInput): MenuItem[] =>
  input.view === false ? controlItems(input, (item) => input.tucked?.includes(item) === true, `${BAR_GROUP_ID}-`) : [];

const titleBarMenu = (input: TitleBarMenuInput): MenuGroup[] => {
  const view = viewMenuItem(input);
  const place = viewPlace(input.view);
  const position = place.position ?? 'start';
  const target = view ? input.menu.findIndex((group) => group.id === place.group) : -1;
  const actions: MenuNode[] = [...tuckedItems(input), ...input.actions.flatMap(actionMenuItem)];
  const items = view && target < 0 ? insertNode(actions, view, position) : actions;
  const menu = input.menu.map((group, index) => (view && index === target ? { ...group, items: insertNode(group.items, view, position) } : group));
  if (items.length === 0) return menu;
  const own: MenuGroup = { id: BAR_GROUP_ID, items };
  return menu.length < 2 ? [...menu, own] : [...menu.slice(0, -1), own, ...menu.slice(-1)];
};

export { titleBarMenu };
