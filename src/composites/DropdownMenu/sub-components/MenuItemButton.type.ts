/* @layer renderer-components @kind types */
import type { MenuItem } from '../DropdownMenu.type';

interface MenuItemButtonProps {
  item: MenuItem;
  query?: string;
  path?: readonly string[];
}

export type { MenuItemButtonProps };
