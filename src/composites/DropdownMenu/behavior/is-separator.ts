/* @layer renderer-components @kind util */
import type { MenuNode, MenuSeparator } from '../DropdownMenu.type';

const isSeparator = (node: MenuNode): node is MenuSeparator => 'separator' in node;

export { isSeparator };
