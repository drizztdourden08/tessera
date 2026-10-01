/* @layer renderer-components @kind types */
import type { MenuGroup } from '../DropdownMenu.type';
import type { MenuFocusStart } from '../behavior/menu-context.type';

interface MenuRootProps {
  id?: string;
  groups: readonly MenuGroup[];
  label?: string;
  start: MenuFocusStart;
  closeOnSelect: boolean;
  onClose: () => void;
}

export type { MenuRootProps };
