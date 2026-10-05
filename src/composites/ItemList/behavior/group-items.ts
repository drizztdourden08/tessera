/* @layer renderer-components @kind logic */
import type { ItemListGroup } from '../ItemList.type';

const groupItems = <T,>(items: readonly T[], groupBy: ((item: T) => string | undefined) | undefined): ItemListGroup<T>[] => {
  if (!groupBy) return items.length ? [{ name: '', items }] : [];
  const groups = new Map<string, T[]>();
  items.forEach((item) => {
    const name = groupBy(item) ?? '';
    const group = groups.get(name);
    if (group) group.push(item);
    else groups.set(name, [item]);
  });
  return [...groups].map(([name, members]) => ({ name, items: members }));
};

export { groupItems };
