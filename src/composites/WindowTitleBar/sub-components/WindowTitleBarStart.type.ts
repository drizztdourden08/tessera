/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MenuGroup } from '../../DropdownMenu';
import type { WindowControl } from '../WindowTitleBar.type';

interface WindowTitleBarStartProps {
  menu?: readonly MenuGroup[];
  menuLabel?: string;
  onMenuOpenChange: (open: boolean) => void;
  pin: boolean;
  pinned?: boolean;
  onControl: (control: WindowControl) => void;
  left?: ReactNode;
}

export type { WindowTitleBarStartProps };
