/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitNode } from '../../DockLayout';
import type { ResolvedSplit } from './widget-layout.type';

const leafKeys = (node: LayoutNode): string[] =>
  (node.kind === 'split' ? node.children.flatMap(leafKeys) : [node.key]);

const sameSet = (a: string[], b: string[]): boolean =>
  a.length === b.length && a.every((key) => b.includes(key));

const splitsOf = (node: LayoutNode): SplitNode[] =>
  (node.kind === 'split' ? [node, ...node.children.flatMap(splitsOf)] : []);

const matchSplit = (split: SplitNode, rendered: SplitNode, index: number): ResolvedSplit | null => {
  const visible = new Set(leafKeys(rendered));
  const wanted = rendered.children.map(leafKeys);
  const kept = split.children
    .map((child, i) => ({ i, keys: leafKeys(child).filter((key) => visible.has(key)) }))
    .filter((entry) => entry.keys.length > 0);
  if (split.axis !== rendered.axis || kept.length !== wanted.length) return null;
  if (!kept.every((entry, j) => sameSet(entry.keys, wanted[j] ?? []))) return null;
  const hit = kept[index];
  return hit ? { node: split, index: hit.i } : null;
};

const resolveSplit = (stored: LayoutNode, rendered: SplitNode, index: number): ResolvedSplit | null => {
  const splits = splitsOf(stored);
  if (splits.includes(rendered)) return { node: rendered, index };
  for (const split of splits) {
    const hit = matchSplit(split, rendered, index);
    if (hit) return hit;
  }
  return null;
};

export { resolveSplit };
