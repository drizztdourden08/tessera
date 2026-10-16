/* @layer renderer-components @kind types */
import type { MenuGroup } from '../../DropdownMenu';
import type { WindowControl, WindowTitleBarAction, WindowTitleBarItemId, WindowTitleBarProps } from '../WindowTitleBar.type';

interface TitleBarMenuInput {
  menu: readonly MenuGroup[];
  actions: readonly WindowTitleBarAction[];
  view?: WindowTitleBarProps['view'];
  tucked?: readonly WindowTitleBarItemId[];
  pin: boolean;
  fullscreenButton: boolean;
  pinned: boolean;
  fullscreen: boolean;
  onControl: (control: WindowControl) => void;
  strings: { view: string; pinOnTop: string; unpin: string; fullscreen: string; exitFullscreen: string };
}

export type { TitleBarMenuInput };
