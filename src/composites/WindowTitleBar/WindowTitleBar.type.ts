/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconEffect, IconName } from '../../primitives/Icon';
import type { StatusTone } from '../../primitives/Status';
import type { MenuGroup, MenuItem } from '../DropdownMenu';

interface WindowTitleBarInstance {
  name: string;
  logo?: string;
  pulse?: boolean;
}

type BrandFit = 'full' | 'logo' | 'small' | 'none';

type WindowControl = 'fullscreen' | 'pin' | 'minimize' | 'maximize' | 'close';

type WindowControlsConfig = Partial<Record<WindowControl, boolean>>;

type WindowTitleBarActionBar = 'button' | 'status' | 'menu' | 'dropdown';

interface WindowTitleBarActionBase {
  id: string;
  label: string;
  icon: IconName;
  shortcut?: MenuItem['shortcut'];
  tone?: StatusTone;
  effect?: IconEffect;
}

interface WindowTitleBarCommandAction extends WindowTitleBarActionBase {
  bar?: Exclude<WindowTitleBarActionBar, 'dropdown'>;
  onSelect: () => void;
  status?: string;
  pulse?: boolean;
}

interface WindowTitleBarDropdownAction extends WindowTitleBarActionBase {
  bar: 'dropdown';
  groups: readonly MenuGroup[];
}

type WindowTitleBarAction = WindowTitleBarCommandAction | WindowTitleBarDropdownAction;

type WindowTitleBarViewPosition = number | 'start' | 'end';

type WindowTitleBarItemId = `control:${'pin' | 'fullscreen'}` | `action:${string}`;

interface WindowTitleBarViewPlace {
  group?: string;
  position?: WindowTitleBarViewPosition;
}

interface WindowTitleBarProps {
  title: ReactNode;
  logo?: string;
  instance?: WindowTitleBarInstance | null;
  menu?: readonly MenuGroup[];
  menuLabel?: string;
  view?: WindowTitleBarViewPlace | false;
  onFitChange?: (tucked: readonly WindowTitleBarItemId[]) => void;
  onMenuOpenChange?: (open: boolean) => void;
  actions?: readonly WindowTitleBarAction[];
  controls?: WindowControlsConfig | false;
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
  WindowTitleBarDropdownAction, WindowTitleBarInstance, WindowTitleBarItemId, WindowTitleBarProps, WindowTitleBarViewPlace, WindowTitleBarViewPosition,
};
