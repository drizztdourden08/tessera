/* @layer renderer-components @kind types */
import type { WindowTitleBarAction, WindowTitleBarCommandAction, WindowTitleBarDropdownAction } from '../WindowTitleBar.type';

interface TitleBarActionProps {
  action: WindowTitleBarAction;
  away: boolean;
  onMenuOpenChange: (id: string, open: boolean) => void;
}

interface TitleBarCommandProps {
  action: WindowTitleBarCommandAction;
  away: boolean;
}

interface TitleBarDropdownProps {
  action: WindowTitleBarDropdownAction;
  away: boolean;
  onOpenChange: (id: string, open: boolean) => void;
}

export type { TitleBarActionProps, TitleBarCommandProps, TitleBarDropdownProps };
