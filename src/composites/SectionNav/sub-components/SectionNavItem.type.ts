/* @layer renderer-components @kind types */
import type { SectionNavItem as Item } from '../SectionNav.type';

interface SectionNavItemProps {
  item: Item;
  active: boolean;
  onSelect: (id: string) => void;
}

export type { SectionNavItemProps };
