/* @layer renderer-components @kind logic */
import type { SideNavProps } from '../../SideNav';
import type { NavDrawer } from './useNavDrawer.type';

const drawerNav = (drawer: NavDrawer): Partial<SideNavProps> =>
  (drawer.compact ? { variant: 'rail', collapsed: false, overlay: false, search: undefined, onSelect: drawer.select } : {});

export { drawerNav };
