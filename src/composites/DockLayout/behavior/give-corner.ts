/* @layer renderer-components @kind logic */
import type { LayoutNode } from '../DockLayout.type';
import type { GiveSite } from './corner.type';
import { holdsMain } from './holds-main';
import { pairSplit } from './pair-split';
import { restack } from './restack';
import { shareAt } from './share-at';
import { sizeAt } from './size-at';
import { splitWithout } from './split-without';

const giveCorner = (tree: LayoutNode, site: GiveSite | null): LayoutNode | null => {
  if (!site) return null;
  const { column, other, at, otherAt, beside } = site;
  const taker = column.children[at];
  const neighbour = other.children[beside];
  if (!taker || !neighbour || holdsMain(taker)) return null;
  const sTaker = sizeAt(column, at);
  const sOther = sizeAt(column, otherAt);
  const stacked = pairSplit(column.axis, { node: taker, size: sTaker }, { node: splitWithout(other, beside), size: sOther }, at === 0);
  const share = shareAt(other, beside);
  const row = pairSplit(other.axis, { node: neighbour, size: share }, { node: stacked, size: 1 - share }, beside === 0);
  return restack(tree, column, [at, otherAt], { node: row, size: sTaker + sOther });
};

export { giveCorner };
