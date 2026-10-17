/* @layer renderer-components @kind types */
import type { WindowTitleBarCommandAction, WindowTitleBarDropdownAction } from '../WindowTitleBar.type';

interface TitleBarActionIconProps {
  action: WindowTitleBarCommandAction | WindowTitleBarDropdownAction;
  size?: number;
}

export type { TitleBarActionIconProps };
