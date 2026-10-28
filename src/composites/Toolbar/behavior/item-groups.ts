/* @layer renderer-components @kind util */
import type { ToolbarItem } from '../Toolbar.type';

const itemGroups = (items: readonly ToolbarItem[]): (number | undefined)[] => {
  let current: number | undefined;
  return items.map((item) => {
    if (item.kind === 'separator') current = item.priority;
    return current;
  });
};

export { itemGroups };
