/* @layer renderer-components @kind logic */
import type { WindowTitleBarProps, WindowTitleBarViewPlace } from '../WindowTitleBar.type';

const viewPlace = (view: WindowTitleBarProps['view']): WindowTitleBarViewPlace => (view === false ? {} : view ?? {});

export { viewPlace };
