/* @layer stories @kind logic */
import type { TreeMoveRequest } from '../../../src/composites';
import type { TreeEntry } from './tree-entries';

const without = (list: readonly TreeEntry[], keys: ReadonlySet<string>): TreeEntry[] =>
  list.filter((entry) => !keys.has(entry.id)).map((entry) => (entry.children ? { ...entry, children: without(entry.children, keys) } : entry));

const found = (list: readonly TreeEntry[], keys: ReadonlySet<string>): TreeEntry[] =>
  list.flatMap((entry) => [...(keys.has(entry.id) ? [entry] : []), ...(entry.children ? found(entry.children, keys) : [])]);

const put = (list: readonly TreeEntry[], parentKey: string | null, index: number, moved: readonly TreeEntry[]): TreeEntry[] => {
  if (parentKey === null) return [...list.slice(0, index), ...moved, ...list.slice(index)];
  return list.map((entry) => {
    if (entry.id === parentKey) {
      const kids = entry.children ?? [];
      return { ...entry, children: [...kids.slice(0, index), ...moved, ...kids.slice(index)] };
    }
    return entry.children ? { ...entry, children: put(entry.children, parentKey, index, moved) } : entry;
  });
};

const moveInTree = (list: readonly TreeEntry[], move: TreeMoveRequest): TreeEntry[] => {
  const keys = new Set(move.keys);
  return put(without(list, keys), move.parentKey, move.index, found(list, keys));
};

export { moveInTree };
