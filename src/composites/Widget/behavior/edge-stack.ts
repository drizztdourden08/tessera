/* @layer renderer-components @kind logic */
import { holdsMain } from '../../DockLayout';
import type { DockEdge, LayoutNode } from '../../DockLayout';
import { axisOfEdge } from '../../DockLayout/behavior/axis-of-edge';
import { isLeadingEdge } from '../../DockLayout/behavior/is-leading-edge';

const edgeStack = (node: LayoutNode, edge: DockEdge): LayoutNode | null => {
  if (node.kind !== 'split') return null;
  const end = isLeadingEdge(edge) ? node.children[0] : node.children.at(-1);
  if (node.axis === axisOfEdge(edge) && end && !holdsMain(end)) return end;
  const inner = node.children.find(holdsMain);
  return inner ? edgeStack(inner, edge) : null;
};

export { edgeStack };
