/* @layer renderer-components @kind types */
import type { MenuItemKind } from '../DropdownMenu.type';

interface MenuMarkProps {
  kind: MenuItemKind;
  checked: boolean;
}

export type { MenuMarkProps };
