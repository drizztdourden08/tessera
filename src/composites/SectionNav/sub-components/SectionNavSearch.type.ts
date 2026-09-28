/* @layer renderer-components @kind types */
import type { SectionNavSearch as Search } from '../SectionNav.type';

interface SectionNavSearchProps {
  search: Search;
  open: boolean;
  onOpen: () => void;
}

export type { SectionNavSearchProps };
