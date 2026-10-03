/* @layer renderer-components @kind types */
import type { SideNavSearch as Search } from '../SideNav.type';

interface SideNavSearchProps {
  search: Search;
  open: boolean;
  onOpen: () => void;
}

export type { SideNavSearchProps };
