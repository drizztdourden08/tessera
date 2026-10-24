/* @layer renderer-components @kind types */
import type { MenuGroup, MenuHover } from '../DropdownMenu.type';
import type { MenuFocusStart } from '../behavior/menu-context.type';

interface MenuRootProps {
  id?: string;
  groups: readonly MenuGroup[];
  label?: string;
  start: MenuFocusStart;
  closeOnSelect: boolean;
  look: string;
  filter: boolean;
  filterPlaceholder?: string;
  hover?: MenuHover;
  onClose: () => void;
  onQueryChange?: (query: string) => void;
}

export type { MenuRootProps };
