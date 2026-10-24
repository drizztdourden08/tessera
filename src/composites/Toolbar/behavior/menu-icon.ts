/* @layer renderer-components @kind util */
import { Fragment, createElement, isValidElement } from 'react';
import { isIconName } from '../../../primitives/Icon/behavior/is-icon-name';
import type { MenuItemIcon } from '../../DropdownMenu/DropdownMenu.type';
import type { ToolbarIcon } from '../Toolbar.type';

const menuIcon = (icon: ToolbarIcon): MenuItemIcon => {
  if (typeof icon === 'string' && isIconName(icon)) return icon;
  if (isValidElement(icon)) return icon;
  return createElement(Fragment, null, icon);
};

export { menuIcon };
