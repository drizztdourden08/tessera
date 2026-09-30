/* @layer renderer-components @kind logic */
import { EDGES } from '../DockLayout.constants';
import type { DockEdge, Rect } from '../DockLayout.type';
import type { DragSubject, DropZone, Point } from './drag.type';
import { inRect } from './in-rect';
import { isOwnEmptyingPane } from './is-own-emptying-pane';
import type { LaidOut } from './layout-tree.type';

const nearestEdge = (point: Point, rect: Rect): DockEdge => {
  const dist: Record<DockEdge, number> = {
    left: point.x - rect.x, right: rect.x + rect.width - point.x, top: point.y - rect.y, bottom: rect.y + rect.height - point.y,
  };
  return EDGES.reduce<DockEdge>((best, e) => (dist[e] < dist[best] ? e : best), 'left');
};

const hitTarget = (point: Point, zones: readonly DropZone[], laid: LaidOut, subject: DragSubject): DropZone | null => {
  const direct = zones.find((z) => z.kind !== 'float' && inRect(point, z.hit));
  if (direct) return direct;
  const float = zones.find((z) => z.kind === 'float' && inRect(point, z.hit));
  if (float) return float;
  const leaf = laid.leaves.find((l) => inRect(point, l.rect));
  if (!leaf || isOwnEmptyingPane(leaf.node.key, subject)) return null;
  const edge = nearestEdge(point, leaf.rect);
  return zones.find((z) => z.target.at === 'leaf' && z.target.key === leaf.node.key && z.target.edge === edge) ?? null;
};

export { hitTarget };
