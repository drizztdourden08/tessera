/* @layer renderer-components @kind types */
import type { WindowTitleBarAction } from '../WindowTitleBar.type';

interface TitleBarActionProps {
  action: WindowTitleBarAction;
  away: boolean;
}

export type { TitleBarActionProps };
