/* @layer renderer-components @kind logic */
import { MENU_CONTROLS } from '../WindowTitleBar.constants';
import type { MenuControl } from './menu-control.type';
import type { TitleBarMenuInput } from './title-bar-menu.type';

const menuControls = (input: TitleBarMenuInput, listed: (control: MenuControl) => boolean): MenuControl[] =>
  MENU_CONTROLS.filter((control) => (control === 'pin' ? input.pin : input.fullscreenButton) && listed(control));

export { menuControls };
