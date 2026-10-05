/* @layer renderer-components @kind types */
import type { MenuItem } from '../DropdownMenu.type';

interface MenuLabelProps {
  item: MenuItem;
  query?: string;
  ask?: string;
  asking?: boolean;
}

export type { MenuLabelProps };
