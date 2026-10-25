/* @layer renderer-components @kind logic */
import type { LayoutNode } from '../DockLayout.type';
import { makeSplit } from './make-split';

const replaceNode = (node: LayoutNode, target: LayoutNode, replacement: LayoutNode): LayoutNode => {
  if (node === target) return replacement;
  if (node.kind !== 'split') return node;
  const children = node.children.map((child) => replaceNode(child, target, replacement));
  if (children.every((child, i) => child === node.children[i])) return node;
  return makeSplit(node.axis, children, node.sizes);
};

export { replaceNode };
