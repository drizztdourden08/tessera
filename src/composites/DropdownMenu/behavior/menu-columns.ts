/* @layer renderer-components @kind util */
import { isSeparator } from './is-separator';
import { itemKind } from './item-kind';
import type { MenuItem, MenuNode } from '../DropdownMenu.type';
import type { MenuColumns } from './menu-columns.type';

const menuColumns = (nodes: readonly MenuNode[]): MenuColumns => {
  const items = nodes.filter((node): node is MenuItem => !isSeparator(node));
  return {
    icons: items.some((item) => item.icon !== undefined),
    marks: items.some((item) => itemKind(item) !== 'action'),
  };
};

export { menuColumns };
