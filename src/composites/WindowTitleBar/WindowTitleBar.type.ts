/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../../primitives/Icon';
import type { StatusTone } from '../../primitives/Status';
import type { MenuGroup, MenuItem } from '../DropdownMenu';

interface WindowTitleBarInstance {
  name: string;
  logo?: string;
  pulse?: boolean;
}

type BrandFit = 'full' | 'logo' | 'small' | 'none';

type WindowControl = 'fullscreen' | 'pin' | 'minimize' | 'maximize' | 'close';

type WindowControlsConfig = Partial<Record<Exclude<WindowControl, 'close'>, boolean>>;

type WindowTitleBarActionBar = 'button' | 'status' | 'menu' | 'dropdown';

interface WindowTitleBarActionBase {
  id: string;
  label: string;
  icon: IconName;
  shortcut?: MenuItem['shortcut'];
}

interface WindowTitleBarCommandAction extends WindowTitleBarActionBase {
  bar?: Exclude<WindowTitleBarActionBar, 'dropdown'>;
  onSelect: () => void;
  status?: string;
  tone?: StatusTone;
  pulse?: boolean;
}

interface WindowTitleBarDropdownAction extends WindowTitleBarActionBase {
  bar: 'dropdown';
  groups: readonly MenuGroup[];
}

type WindowTitleBarAction = WindowTitleBarCommandAction | WindowTitleBarDropdownAction;

interface WindowTitleBarProps {
  title: ReactNode;
  logo?: string;
  instance?: WindowTitleBarInstance | null;
  menu?: readonly MenuGroup[];
  menuLabel?: string;
  onMenuOpenChange?: (open: boolean) => void;
  actions?: readonly WindowTitleBarAction[];
  controls?: WindowControlsConfig;
  maximized?: boolean;
  fullscreen?: boolean;
  pinned?: boolean;
  onControl: (control: WindowControl) => void;
  concealed?: boolean;
  peek?: boolean;
  className?: string;
}

export type {
  BrandFit, WindowControl, WindowControlsConfig, WindowTitleBarAction, WindowTitleBarActionBar, WindowTitleBarCommandAction,
  WindowTitleBarDropdownAction, WindowTitleBarInstance, WindowTitleBarProps,
};
