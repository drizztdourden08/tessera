/* @layer renderer-components @kind types */
import type { MenuItem, MenuNode } from '../DropdownMenu.type';

interface SubMenuProps {
  item: MenuItem;
  nodes: readonly MenuNode[];
}

export type { SubMenuProps };
