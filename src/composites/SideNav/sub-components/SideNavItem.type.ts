/* @layer renderer-components @kind types */
import type { SideNavItem as Item } from '../SideNav.type';

interface SideNavItemProps {
  item: Item;
  active: boolean;
  onSelect: (id: string) => void;
}

export type { SideNavItemProps };
