/* @layer renderer-components @kind logic */
import type { SideNavProps } from '../../SideNav';
import { drawerNav } from './drawer-nav';
import type { NavDrawer } from './useNavDrawer.type';

const layoutNav = (nav: SideNavProps, narrow: boolean, drawer: NavDrawer, shown: Pick<SideNavProps, 'search' | 'activeId'>): SideNavProps => ({
  ...nav,
  defaultOpen: nav.defaultOpen ?? !narrow,
  overlay: narrow,
  ...shown,
  ...drawerNav(drawer),
});

export { layoutNav };
