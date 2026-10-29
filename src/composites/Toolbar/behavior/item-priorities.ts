/* @layer renderer-components @kind util */
import type { ToolbarItem } from '../Toolbar.type';
import { itemGroups } from './item-groups';

const own = (item: ToolbarItem | undefined, group: number | undefined): number | undefined => {
  if (group !== undefined) return group;
  return item === undefined || item.kind === 'separator' ? undefined : (item.priority ?? 0);
};

const itemPriorities = (items: readonly ToolbarItem[]): number[] => {
  const groups = itemGroups(items);
  const first = items.map((item, index) => own(item, groups[index])).find((priority) => priority !== undefined) ?? 0;
  let last = first;
  return items.map((item, index) => {
    last = own(item, groups[index]) ?? last;
    return last;
  });
};

export { itemPriorities };
