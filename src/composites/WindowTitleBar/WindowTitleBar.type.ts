/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MenuGroup } from '../DropdownMenu';

interface WindowTitleBarInstance {
  name: string;
  logo?: string;
  pulse?: boolean;
}

type WindowControl = 'fullscreen' | 'pin' | 'minimize' | 'maximize' | 'close';

type WindowControlsConfig = Partial<Record<Exclude<WindowControl, 'close'>, boolean>>;

interface WindowTitleBarProps {
  title: ReactNode;
  logo?: string;
  instance?: WindowTitleBarInstance | null;
  menu?: readonly MenuGroup[];
  menuLabel?: string;
  onMenuOpenChange?: (open: boolean) => void;
  controls?: WindowControlsConfig;
  maximized?: boolean;
  fullscreen?: boolean;
  pinned?: boolean;
  onControl: (control: WindowControl) => void;
  left?: ReactNode;
  concealed?: boolean;
  peek?: boolean;
  className?: string;
}

export type { WindowControl, WindowControlsConfig, WindowTitleBarInstance, WindowTitleBarProps };
