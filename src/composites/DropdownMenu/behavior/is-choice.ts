/* @layer renderer-components @kind util */
import type { MenuItemKind } from '../DropdownMenu.type';

const isChoice = (kind: MenuItemKind): boolean => kind === 'check' || kind === 'radio';

export { isChoice };
