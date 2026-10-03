/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { MenuItem } from '../DropdownMenu.type';

interface MenuItemBodyProps {
  item: MenuItem;
  mark?: ReactNode;
  end?: ReactNode;
  query?: string;
  path?: readonly string[];
}

export type { MenuItemBodyProps };
