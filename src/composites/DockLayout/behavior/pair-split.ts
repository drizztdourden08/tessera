/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitAxis } from '../DockLayout.type';
import type { CornerPart } from './corner.type';
import { makeSplit } from './make-split';

const pairSplit = (axis: SplitAxis, a: CornerPart, b: CornerPart, aFirst: boolean): LayoutNode => {
  const parts = aFirst ? [a, b] : [b, a];
  return makeSplit(axis, parts.map((part) => part.node), parts.map((part) => part.size));
};

export { pairSplit };
