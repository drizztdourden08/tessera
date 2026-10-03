/* @layer renderer-components @kind types */
import type { MenuGroup } from '../DropdownMenu.type';
import type { MenuFocusStart } from '../behavior/menu-context.type';

interface MenuRootProps {
  id?: string;
  groups: readonly MenuGroup[];
  label?: string;
  start: MenuFocusStart;
  closeOnSelect: boolean;
  filter: boolean;
  filterPlaceholder?: string;
  onClose: () => void;
  onQueryChange?: (query: string) => void;
}

export type { MenuRootProps };
