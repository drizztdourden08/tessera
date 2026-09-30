/* @layer renderer-components @kind util */
import type { ListboxBlock, ListboxEntry, ListboxRows, ListboxSetup } from './listbox-model.type';

const bucketsOf = <T, V>(items: readonly T[], setup: ListboxSetup<T, V>): Map<string | undefined, T[]> => {
  const order: (string | undefined)[] = [undefined, ...Object.keys(setup.categories)];
  const buckets = new Map<string | undefined, T[]>(order.map((category) => [category, []]));
  for (const item of items) {
    const category = setup.categoryOf(item);
    const bucket = buckets.get(category);
    if (bucket) bucket.push(item);
    else buckets.set(category, [item]);
  }
  return buckets;
};

const entryOf = <T, V>(item: T, category: string | undefined, index: number, setup: ListboxSetup<T, V>): ListboxEntry<T> => ({
  item,
  key: setup.keyOf(item),
  identity: setup.identityOfItem(item),
  index,
  category,
  label: setup.labelOf(item),
  itemDisabled: setup.disabledOf(item),
});

const blockOf = <T, V>(category: string | undefined, entries: ListboxEntry<T>[], setup: ListboxSetup<T, V>): ListboxBlock<T> => {
  const known = category === undefined ? undefined : setup.categories[category];
  return { key: category ?? '', category, label: known?.label ?? category, icon: known?.icon, entries };
};

const buildRows = <T, V>(items: readonly T[], setup: ListboxSetup<T, V>): ListboxRows<T> => {
  const entries: ListboxEntry<T>[] = [];
  const blocks: ListboxBlock<T>[] = [];
  for (const [category, bucket] of bucketsOf(items, setup)) {
    if (bucket.length === 0) continue;
    const blockEntries = bucket.map((item, offset) => entryOf(item, category, entries.length + offset, setup));
    entries.push(...blockEntries);
    blocks.push(blockOf(category, blockEntries, setup));
  }
  return { blocks, entries };
};

export { buildRows };
