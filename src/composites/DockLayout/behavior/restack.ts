/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitNode } from '../DockLayout.type';
import type { CornerPart } from './corner.type';
import { joinPair } from './join-pair';
import { replaceNode } from './replace-node';

const restack = (tree: LayoutNode, container: SplitNode, at: readonly [number, number], joined: CornerPart): LayoutNode =>
  replaceNode(tree, container, joinPair(container, at, joined));

export { restack };
