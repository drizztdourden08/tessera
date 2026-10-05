/* @layer renderer-components @kind data */
import type { MenuItemKind } from '../DropdownMenu.type';

const ITEM_ROLES: Readonly<Record<MenuItemKind, 'menuitem' | 'menuitemcheckbox' | 'menuitemradio'>> = {
  action: 'menuitem',
  check: 'menuitemcheckbox',
  radio: 'menuitemradio',
  confirm: 'menuitem',
};

export { ITEM_ROLES };
