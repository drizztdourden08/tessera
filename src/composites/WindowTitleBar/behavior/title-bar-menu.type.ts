/* @layer renderer-components @kind types */
import type { MenuGroup } from '../../DropdownMenu';
import type { WindowControl, WindowTitleBarAction, WindowTitleBarGroup } from '../WindowTitleBar.type';

interface TitleBarMenuInput {
  menu: readonly MenuGroup[];
  actions: readonly WindowTitleBarAction[];
  pin: boolean;
  fullscreenButton: boolean;
  pinned: boolean;
  fullscreen: boolean;
  onControl: (control: WindowControl) => void;
  windowGroup?: string | null;
  windowGroups?: readonly WindowTitleBarGroup[];
  onWindowGroupChange?: (id: string | null) => void;
  strings: { view: string; pinOnTop: string; fullscreen: string; windowGroup: string; windowGroupNone: string };
}

export type { TitleBarMenuInput };
