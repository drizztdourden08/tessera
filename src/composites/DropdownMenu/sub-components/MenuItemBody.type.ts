/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MenuItem } from '../DropdownMenu.type';

interface MenuItemBodyProps {
  item: MenuItem;
  trail: ReactNode;
}

export type { MenuItemBodyProps };
