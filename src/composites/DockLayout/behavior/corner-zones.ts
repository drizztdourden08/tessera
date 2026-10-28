/* @layer renderer-components @kind logic */
import type { LayoutNode, Rect } from '../DockLayout.type';
import { SEAM_SLACK } from './corner.constants';
import type { CornerHandle, CornerPull, CornerSeed, CornerZone } from './corner.type';
import { cornerSeamOf } from './corner-seam-of';
import { cornerSites } from './corner-sites';
import type { LaidOut } from './layout-tree.type';
import { seamEndOf } from './seam-end-of';

const within = (inner: Rect, outer: Rect) =>
  inner.x >= outer.x - SEAM_SLACK && inner.y >= outer.y - SEAM_SLACK
  && inner.x + inner.width <= outer.x + outer.width + SEAM_SLACK && inner.y + inner.height <= outer.y + outer.height + SEAM_SLACK;

const edgeSeed = (laid: LaidOut, handle: CornerHandle): CornerSeed | null => {
  const rect = cornerSeamOf(handle);
  const divider = laid.dividers.findIndex((item) => item.node.axis === handle.along && within(rect, item.rect));
  if (divider < 0) return null;
  return { divider, rect, pull: { outward: handle.end === 'start' ? -1 : 1, take: handle.take, give: handle.give, handle } };
};

const giveSeed = (laid: LaidOut, tree: LayoutNode, handle: CornerHandle): CornerSeed | null => {
  const { give } = cornerSites(tree, handle.key, handle);
  if (!give || handle.give === null) return null;
  const index = Math.min(give.at, give.otherAt);
  const divider = laid.dividers.findIndex((item) => item.node === give.column && item.index === index);
  const seam = laid.dividers[divider];
  if (!seam) return null;
  const across = handle.along === 'row' ? handle.rect.height : handle.rect.width;
  const pull: CornerPull = { outward: give.at < give.otherAt ? 1 : -1, take: null, give: across, handle };
  return { divider, rect: seamEndOf(seam.rect, handle.along, handle.end), pull };
};

const cornerZones = (laid: LaidOut, tree: LayoutNode, handles: readonly CornerHandle[]): CornerZone[] => {
  const zones = new Map<string, CornerZone>();
  for (const handle of handles) {
    const seed = edgeSeed(laid, handle) ?? giveSeed(laid, tree, handle);
    const seam = seed ? laid.dividers[seed.divider] : undefined;
    if (!seed || !seam) continue;
    const key = `${seed.divider}:${Math.round(seed.rect.x)}:${Math.round(seed.rect.y)}`;
    const zone = zones.get(key);
    if (zone) zone.pulls.push(seed.pull);
    else zones.set(key, { key, divider: seed.divider, axis: seam.node.axis, rect: seed.rect, pulls: [seed.pull] });
  }
  return [...zones.values()];
};

export { cornerZones };
