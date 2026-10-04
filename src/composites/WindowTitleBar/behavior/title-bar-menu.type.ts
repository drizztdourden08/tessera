/* @layer renderer-components @kind types */
import type { MenuGroup } from '../../DropdownMenu';
import type { WindowControl, WindowTitleBarAction } from '../WindowTitleBar.type';

interface TitleBarMenuInput {
  menu: readonly MenuGroup[];
  actions: readonly WindowTitleBarAction[];
  pin: boolean;
  fullscreenButton: boolean;
  pinned: boolean;
  fullscreen: boolean;
  onControl: (control: WindowControl) => void;
  strings: { view: string; pinOnTop: string; fullscreen: string };
}

export type { TitleBarMenuInput };
