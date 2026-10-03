/* @layer renderer-components @kind logic */
import { countItems } from './count-items';
import type { TreeNode, TreeRow } from '../GroupTree.type';
import type { FlattenInput } from './flatten-tree.type';

const flattenLevel = <T,>(node: TreeNode<T>, ancestors: readonly string[], input: FlattenInput<T>, out: TreeRow<T>[]): void => {
  const depth = ancestors.length + 1;
  const parentKey = ancestors.at(-1) ?? null;
  const setSize = node.children.length + node.items.length;
  node.children.forEach((child, index) => {
    const expanded = input.open.has(child.key);
    out.push({
      kind: 'group', key: child.key, depth, parentKey, position: index + 1, setSize,
      node: child, count: child.count ?? countItems(child), expanded, ancestors,
    });
    if (expanded) flattenLevel(child, [...ancestors, child.key], input, out);
  });
  node.items.forEach((item, index) => {
    const itemKey = input.getItemKey(item);
    out.push({
      kind: 'item', key: `${parentKey ?? ''}::${itemKey}`, itemKey, depth, parentKey,
      position: node.children.length + index + 1, setSize, item, ancestors,
    });
  });
};

const flattenTree = <T,>(root: TreeNode<T>, input: FlattenInput<T>): TreeRow<T>[] => {
  const out: TreeRow<T>[] = [];
  flattenLevel(root, [], input, out);
  return out;
};

export { flattenTree };
