/* @layer renderer-components @kind types */
import type { MenuItem } from '../DropdownMenu.type';

interface SubMenuProps {
  item: MenuItem;
}

interface PanelPosition {
  top: number;
  left: number;
}

export type { PanelPosition, SubMenuProps };
