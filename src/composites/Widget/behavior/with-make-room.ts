/* @layer renderer-components @kind logic */
import type { LayoutNode } from '../../DockLayout';
import { makesRoom } from '../../DockLayout/behavior/makes-room';

const withMakeRoom = (node: LayoutNode): LayoutNode => {
  if (node.kind === 'pane') return node.makeRoom === makesRoom(node) ? node : { ...node, makeRoom: makesRoom(node) };
  if (node.kind === 'split') return { ...node, children: node.children.map(withMakeRoom) };
  return node;
};

export { withMakeRoom };
