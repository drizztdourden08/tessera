/* @layer renderer-components @kind logic */
import { tidyGroups } from '../../DropdownMenu/behavior/tidy-groups';
import type { WindowTitleBarAction, WindowTitleBarActionBar } from '../WindowTitleBar.type';

const actionBar = (action: WindowTitleBarAction): WindowTitleBarActionBar | null => {
  if (action.bar === 'dropdown') return tidyGroups(action.groups).length > 0 ? 'dropdown' : null;
  const bar = action.bar ?? 'button';
  if (bar === 'menu') return null;
  return bar === 'status' && !action.status ? null : bar;
};

export { actionBar };
