/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitNode } from '../DockLayout.type';
import { makeSplit } from './make-split';

const splitWithout = (node: SplitNode, index: number): LayoutNode => {
  const kept = node.children.flatMap((child, i) => (i === index ? [] : [{ child, size: node.sizes[i] ?? 0 }]));
  return makeSplit(node.axis, kept.map((part) => part.child), kept.map((part) => part.size));
};

export { splitWithout };
