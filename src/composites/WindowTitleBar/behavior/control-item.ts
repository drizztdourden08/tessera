/* @layer renderer-components @kind logic */
import type { MenuItem } from '../../DropdownMenu';
import { MENU_CONTROL_ROWS } from '../WindowTitleBar.constants';
import type { WindowTitleBarTuckedItem } from '../WindowTitleBar.type';
import type { MenuControl } from './menu-control.type';
import type { TitleBarMenuInput } from './title-bar-menu.type';

const controlItem = (input: TitleBarMenuInput, control: MenuControl, idPrefix = '', names: WindowTitleBarTuckedItem = {}): MenuItem => {
  const on = control === 'pin' ? input.pinned : input.fullscreen;
  const { icon, label } = MENU_CONTROL_ROWS[control][on ? 1 : 0];
  const text = (on ? names.activeLabel : undefined) ?? names.label ?? input.strings[label];
  return { id: `${idPrefix}${control}`, icon, label: text, onSelect: () => input.onControl(control) };
};

export { controlItem };
