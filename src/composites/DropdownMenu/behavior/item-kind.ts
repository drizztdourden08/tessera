/* @layer renderer-components @kind util */
import type { MenuItem, MenuItemKind } from '../DropdownMenu.type';

const itemKind = (item: MenuItem): MenuItemKind => item.kind ?? (item.checked === undefined ? 'action' : 'check');

export { itemKind };
