/* @layer renderer-components @kind util */
import type { ToolbarItem } from '../Toolbar.type';

const own = (item: ToolbarItem | undefined): number | undefined => (item === undefined || item.kind === 'separator' ? undefined : (item.priority ?? 0));

const itemPriorities = (items: readonly ToolbarItem[]): number[] => {
  const first = items.map(own).find((priority) => priority !== undefined) ?? 0;
  let last = first;
  return items.map((item) => {
    last = own(item) ?? last;
    return last;
  });
};

export { itemPriorities };
