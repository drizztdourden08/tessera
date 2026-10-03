/* @layer renderer-components @kind types */
import type { MenuItem } from '../DropdownMenu.type';

interface MenuMatch {
  item: MenuItem;
  path: readonly string[];
}

export type { MenuMatch };
