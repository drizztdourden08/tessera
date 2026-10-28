/* @layer renderer-components @kind logic */
import type { TreeFlatRow } from '../Tree.type';
import type { FlattenItemsInput } from './flatten-items.type';

const walk = <T,>(items: readonly T[], ancestors: readonly string[], input: FlattenItemsInput<T>, out: TreeFlatRow<T>[]): void => {
  const { getKey, getChildren, isBranch, open, loading, kept } = input;
  const parentKey = ancestors.at(-1) ?? null;
  const shown = kept ? items.filter((item) => kept.has(getKey(item))) : items;
  shown.forEach((item, at) => {
    const key = getKey(item);
    const children = getChildren(item);
    const branch = isBranch(item);
    const expanded = branch && open.has(key);
    out.push({
      key, item, depth: ancestors.length + 1, parentKey, position: at + 1, setSize: shown.length, branch,
      loaded: children !== undefined, expanded, loading: loading.has(key), ancestors,
    });
    if (expanded && children) walk(children, [...ancestors, key], input, out);
  });
};

const flattenItems = <T,>(items: readonly T[], input: FlattenItemsInput<T>): TreeFlatRow<T>[] => {
  const out: TreeFlatRow<T>[] = [];
  walk(items, [], input, out);
  return out;
};

export { flattenItems };
