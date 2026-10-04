/* @layer renderer-components @kind logic */
import type { WindowTitleBarAction, WindowTitleBarActionBar } from '../WindowTitleBar.type';

const actionBar = (action: WindowTitleBarAction): WindowTitleBarActionBar | null => {
  const bar = action.bar ?? 'button';
  if (bar === 'menu') return null;
  return bar === 'status' && !action.status ? null : bar;
};

export { actionBar };
