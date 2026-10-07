/* @layer renderer-components @kind logic */
import type { ItemListGroup, ItemListGroupRows } from '../ItemList.type';

const groupItems = <T,>(
  items: readonly T[],
  groupBy: ((item: T) => string | undefined) | undefined,
  listed: readonly ItemListGroup[] = [],
  keepEmpty = true,
): ItemListGroupRows<T>[] => {
  const groups = new Map<string, { group: ItemListGroup; items: T[] }>();
  listed.forEach((group) => groups.set(group.name, { group, items: [] }));
  items.forEach((item) => {
    const name = groupBy?.(item) ?? '';
    const entry = groups.get(name);
    if (entry) entry.items.push(item);
    else groups.set(name, { group: { name }, items: [item] });
  });
  return [...groups.values()]
    .filter((entry) => entry.items.length > 0 || keepEmpty)
    .map((entry) => ({ ...entry.group, items: entry.items }));
};

export { groupItems };
