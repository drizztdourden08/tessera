/* @layer renderer-components @kind logic */
import type { LayoutNode, PaneNode } from '../DockLayout.type';

const patchPane = (tree: LayoutNode, key: string, patch: Partial<Omit<PaneNode, 'kind' | 'key'>>): LayoutNode => {
  if (tree.kind === 'pane') return tree.key === key ? { ...tree, ...patch } : tree;
  if (tree.kind === 'split') return { ...tree, children: tree.children.map((child) => patchPane(child, key, patch)) };
  return tree;
};

export { patchPane };
