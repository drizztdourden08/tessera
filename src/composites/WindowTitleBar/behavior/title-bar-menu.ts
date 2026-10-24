/* @layer renderer-components @kind logic */
import { createElement } from 'react';
import type { MenuGroup, MenuItem } from '../../DropdownMenu';
import { TitleBarActionIcon } from '../sub-components/TitleBarActionIcon';
import { BAR_GROUP_ID, VIEW_ITEM_ID } from '../WindowTitleBar.constants';
import type { WindowTitleBarAction } from '../WindowTitleBar.type';
import { controlItem } from './control-item';
import { dropdownNodes } from './dropdown-nodes';
import { insertNodes } from './insert-nodes';
import { menuControls } from './menu-controls';
import type { PlacedNode } from './placed-node.type';
import type { TitleBarMenuInput } from './title-bar-menu.type';
import { tuckedNodes } from './tucked-nodes';
import { viewPlace } from './view-place';
import { volumeMenuItems } from './volume-menu-items';

const actionMenuItem = (action: WindowTitleBarAction, strings: TitleBarMenuInput['strings']): MenuItem[] => {
  if (action.bar === 'volume') return volumeMenuItems(action, strings);
  const { id, label, shortcut } = action;
  const icon = action.tone !== undefined || action.effect !== undefined ? createElement(TitleBarActionIcon, { action }) : action.icon;
  if (action.bar !== 'dropdown') return [{ id, icon, label, description: action.status, shortcut, disabled: action.disabled, onSelect: action.onSelect }];
  const children = dropdownNodes(action.groups);
  return children.length > 0 ? [{ id, icon, label, shortcut, children }] : [];
};

const placedNodes = (input: TitleBarMenuInput): PlacedNode[] => {
  if (input.view === false) return tuckedNodes(input);
  const children = menuControls(input, () => true).map((control) => controlItem(input, control));
  return children.length > 0 ? [{ node: { id: VIEW_ITEM_ID, icon: 'app-window', label: input.strings.view, children }, place: viewPlace(input.view) }] : [];
};

const titleBarMenu = (input: TitleBarMenuInput): MenuGroup[] => {
  const placed = placedNodes(input);
  const groupOf = ({ place }: PlacedNode): number => input.menu.findIndex((group) => group.id === place.group);
  const into = (index: number): PlacedNode[] => placed.filter((entry) => groupOf(entry) === index);
  const items = insertNodes(input.actions.flatMap((action) => actionMenuItem(action, input.strings)), into(-1));
  const menu = input.menu.map((group, index) => {
    const here = into(index);
    return here.length > 0 ? { ...group, items: insertNodes(group.items, here) } : group;
  });
  if (items.length === 0) return menu;
  const own: MenuGroup = { id: BAR_GROUP_ID, items };
  return menu.length < 2 ? [...menu, own] : [...menu.slice(0, -1), own, ...menu.slice(-1)];
};

export { titleBarMenu };
