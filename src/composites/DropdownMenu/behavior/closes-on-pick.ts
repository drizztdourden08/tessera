/* @layer renderer-components @kind util */
import type { MenuItemKind } from '../DropdownMenu.type';

const closesOnPick = (kind: MenuItemKind, closeOnSelect: boolean): boolean => closeOnSelect && kind === 'action';

export { closesOnPick };
