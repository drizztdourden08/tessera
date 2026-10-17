/* @layer renderer-components @kind types */
import type { MenuGroup } from '../../DropdownMenu';
import type { WindowControl, WindowTitleBarAction, WindowTitleBarItemId, WindowTitleBarProps, WindowTitleBarTucked } from '../WindowTitleBar.type';

interface TitleBarMenuStrings {
  view: string;
  pinOnTop: string;
  unpin: string;
  fullscreen: string;
  exitFullscreen: string;
  mute: string;
  unmute: string;
}

interface TitleBarMenuInput {
  menu: readonly MenuGroup[];
  actions: readonly WindowTitleBarAction[];
  view?: WindowTitleBarProps['view'];
  tucked?: readonly WindowTitleBarItemId[];
  tuckedRows?: WindowTitleBarTucked;
  pin: boolean;
  fullscreenButton: boolean;
  pinned: boolean;
  fullscreen: boolean;
  onControl: (control: WindowControl) => void;
  strings: TitleBarMenuStrings;
}

export type { TitleBarMenuInput, TitleBarMenuStrings };
