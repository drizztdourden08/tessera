/* @layer renderer-components @kind types */
import type { SectionNavItem as Item, SectionNavSearch as Search } from '../SectionNav.type';

interface SectionNavTopProps {
  home?: Item;
  search?: Search;
  open: boolean;
  onOpen: () => void;
  activeId: string;
  onSelect: (id: string) => void;
}

export type { SectionNavTopProps };
