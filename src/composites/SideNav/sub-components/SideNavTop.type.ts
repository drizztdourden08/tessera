/* @layer renderer-components @kind types */
import type { SideNavItem as Item, SideNavSearch as Search } from '../SideNav.type';

interface SideNavTopProps {
  home?: Item;
  search?: Search;
  open: boolean;
  onOpen: () => void;
  activeId: string;
  onSelect: (id: string) => void;
}

export type { SideNavTopProps };
