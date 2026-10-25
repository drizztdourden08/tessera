/* @layer renderer-components @kind logic */
import type { LayoutNode } from '../DockLayout.type';
import type { TakeSite } from './corner.type';
import { holdsMain } from './holds-main';
import { pairSplit } from './pair-split';
import { restack } from './restack';
import { shareAt } from './share-at';
import { sizeAt } from './size-at';
import { splitWithout } from './split-without';

const takeCorner = (tree: LayoutNode, site: TakeSite | null): LayoutNode | null => {
  if (!site) return null;
  const { outer, inner, at, innerAt, beside } = site;
  const taker = inner.children[at];
  const neighbour = outer.children[beside];
  if (!taker || !neighbour || holdsMain(taker)) return null;
  const sBeside = sizeAt(outer, beside);
  const sInner = sizeAt(outer, innerAt);
  const row = pairSplit(outer.axis, { node: neighbour, size: sBeside }, { node: splitWithout(inner, at), size: sInner }, beside < innerAt);
  const share = shareAt(inner, at);
  const stacked = pairSplit(inner.axis, { node: taker, size: share }, { node: row, size: 1 - share }, at === 0);
  return restack(tree, outer, [beside, innerAt], { node: stacked, size: sBeside + sInner });
};

export { takeCorner };
