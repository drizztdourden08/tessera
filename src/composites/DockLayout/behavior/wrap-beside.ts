/* @layer renderer-components @kind logic */
import type { DockEdge, LayoutNode, SplitNode } from '../DockLayout.type';
import { axisOfEdge } from './axis-of-edge';
import { isLeadingEdge } from './is-leading-edge';

const wrapBeside = (node: LayoutNode, edge: DockEdge, beside: LayoutNode, share: number): SplitNode => {
  const first = isLeadingEdge(edge);
  return {
    kind: 'split',
    axis: axisOfEdge(edge),
    children: first ? [beside, node] : [node, beside],
    sizes: first ? [share, 1 - share] : [1 - share, share],
  };
};

export { wrapBeside };
