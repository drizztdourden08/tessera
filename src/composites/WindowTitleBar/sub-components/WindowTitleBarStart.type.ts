/* @layer renderer-components @kind types */
import type { MenuGroup } from '../../DropdownMenu';
import type { WindowControl, WindowTitleBarAction } from '../WindowTitleBar.type';

interface WindowTitleBarStartProps {
  menu: readonly MenuGroup[];
  menuLabel?: string;
  onMenuOpenChange: (open: boolean) => void;
  onActionMenuChange: (id: string, open: boolean) => void;
  pin: boolean;
  pinned?: boolean;
  onControl: (control: WindowControl) => void;
  actions: readonly WindowTitleBarAction[];
  hidden: ReadonlySet<string>;
}

export type { WindowTitleBarStartProps };
