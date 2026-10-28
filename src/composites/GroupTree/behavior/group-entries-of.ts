/* @layer renderer-components @kind logic */
import { countItems } from './count-items';
import { selectionKey } from './selection-key';
import type { GroupCollector, GroupEntries, GroupEntry, TreeNode } from '../GroupTree.type';

const levelOf = <T,>(node: TreeNode<T>, parentKey: string | null, getItemKey: (item: T) => string, collect: GroupCollector<T>): GroupEntry<T>[] => {
  const groups = node.children.map((child): GroupEntry<T> => ({
    kind: 'group', key: child.key, label: child.label, node: child, count: child.count ?? countItems(child),
    children: levelOf(child, child.key, getItemKey, collect),
  }));
  const items = node.items.map((item): GroupEntry<T> => {
    const itemKey = getItemKey(item);
    return { kind: 'item', key: `${parentKey ?? ''}::${itemKey}`, label: '', item, itemKey, children: undefined };
  });
  const entries = [...groups, ...items];
  entries.forEach((entry) => {
    const picked = selectionKey(entry);
    collect.byKey.set(entry.key, entry);
    collect.bySelection.set(picked, [...(collect.bySelection.get(picked) ?? []), entry.key]);
  });
  return entries;
};

const groupEntriesOf = <T,>(root: TreeNode<T>, getItemKey: (item: T) => string): GroupEntries<T> => {
  const collect: GroupCollector<T> = { byKey: new Map(), bySelection: new Map() };
  const top = levelOf(root, null, getItemKey, collect);
  return { top, ...collect };
};

export { groupEntriesOf };
