/* @layer renderer-components @kind logic */
import type { LayoutNode, SplitAxis } from '../DockLayout.type';
import { boundsOf } from './bounds-of';
import { CORNER_AXES, CORNER_ENDS, NO_REACH } from './corner.constants';
import type { CornerHandle, CornerReach, CornerSites, CornerSpot } from './corner.type';
import { cornerNameOf } from './corner-name-of';
import { cornerSites } from './corner-sites';
import { cornerStripOf } from './corner-strip-of';
import { holdsMain } from './holds-main';
import type { LaidOut, LeafRect } from './layout-tree.type';

const thickness = (laid: LaidOut, node: LayoutNode | undefined, along: SplitAxis): number | null => {
  const box = node ? boundsOf(laid, node) : null;
  if (!box) return null;
  return along === 'row' ? box.width : box.height;
};

const takeOf = (laid: LaidOut, { take }: CornerSites, { end, along }: CornerSpot): CornerReach => {
  const taker = take?.inner.children[take.at];
  if (!take || !taker || holdsMain(taker)) return NO_REACH;
  const size = thickness(laid, take.outer.children[take.beside], along);
  return { size, corner: cornerNameOf(along, end, take.at === 0) };
};

const giveOf = (laid: LaidOut, { give }: CornerSites, { end, along }: CornerSpot): CornerReach => {
  const giver = give?.column.children[give.at];
  if (!give || !giver || holdsMain(giver)) return NO_REACH;
  const size = thickness(laid, give.other.children[give.beside], along);
  return { size, corner: cornerNameOf(along, end, give.at === 0) };
};

const handleOf = (laid: LaidOut, tree: LayoutNode, leaf: LeafRect, spot: CornerSpot): CornerHandle[] => {
  const { node, rect } = leaf;
  if (node.kind !== 'pane') return [];
  const sites = cornerSites(tree, node.key, spot);
  const take = takeOf(laid, sites, spot);
  const give = giveOf(laid, sites, spot);
  if (take.size === null && give.size === null) return [];
  return [{
    key: node.key,
    active: node.active,
    end: spot.end,
    along: spot.along,
    rect: cornerStripOf(rect, spot.along, spot.end),
    take: take.size,
    give: give.size,
    takeCorner: take.corner,
    giveCorner: give.corner,
  }];
};

const cornerEnds = (laid: LaidOut, tree: LayoutNode): CornerHandle[] =>
  laid.leaves.flatMap((leaf) => CORNER_AXES.flatMap((along) => CORNER_ENDS.flatMap((end) => handleOf(laid, tree, leaf, { end, along }))));

export { cornerEnds };
