/* @layer renderer-components @kind logic */
import type { SplitNode } from '../DockLayout.type';
import type { CornerPart } from './corner.type';
import { makeSplit } from './make-split';

const joinPair = (node: SplitNode, [i, j]: readonly [number, number], joined: CornerPart) => {
  const children = node.children.filter((_, k) => k !== i && k !== j);
  const sizes = node.sizes.filter((_, k) => k !== i && k !== j);
  children.splice(Math.min(i, j), 0, joined.node);
  sizes.splice(Math.min(i, j), 0, joined.size);
  return makeSplit(node.axis, children, sizes);
};

export { joinPair };
