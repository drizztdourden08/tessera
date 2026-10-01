/* @layer renderer-components @kind types */
import type { MenuItem, MenuNode } from '../DropdownMenu.type';

interface SubMenuProps {
  item: MenuItem;
  nodes: readonly MenuNode[];
}

interface PanelPosition {
  top: number;
  left: number;
}

export type { PanelPosition, SubMenuProps };
