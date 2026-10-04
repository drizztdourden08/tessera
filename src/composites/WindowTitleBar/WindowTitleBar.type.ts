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

type WindowTitleBarActionBar = 'button' | 'status' | 'menu';

interface WindowTitleBarGroup {
  id: string;
  label: string;
}

interface WindowTitleBarAction {
  id: string;
  label: string;
  icon: IconName;
  onSelect: () => void;
  bar?: WindowTitleBarActionBar;
  status?: string;
  tone?: StatusTone;
  shortcut?: MenuItem['shortcut'];
}

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
  windowGroup?: string | null;
  windowGroups?: readonly WindowTitleBarGroup[];
  onWindowGroupChange?: (id: string | null) => void;
  onControl: (control: WindowControl) => void;
  concealed?: boolean;
  peek?: boolean;
  className?: string;
}

export type {
  BrandFit, WindowControl, WindowControlsConfig, WindowTitleBarAction, WindowTitleBarActionBar, WindowTitleBarGroup, WindowTitleBarInstance,
  WindowTitleBarProps,
};
