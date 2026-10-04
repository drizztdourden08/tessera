/* @layer stories @kind util */
import type { SideNavItem } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import { NAV_ICONS } from './nav';
import type { NavIcon } from './nav';

const navItem = (id: string, label: string, icon: NavIcon): SideNavItem => ({
  id, label, icon: <Icon name={NAV_ICONS[icon]} size={18} />,
});

export { navItem };
