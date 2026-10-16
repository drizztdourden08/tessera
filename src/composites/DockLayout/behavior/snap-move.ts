/* @layer renderer-components @kind logic */
import type { Rect } from '../DockLayout.type';
import { snapEdgesOf } from './snap-edges';
import { snapShifts } from './snap-shifts';
import type { SnapLines } from './snap.type';

const snapMove = (rect: Rect, lines: SnapLines, distance: number): Rect => {
  if (distance <= 0) return rect;
  const edges = snapEdgesOf(rect);
  const dx = snapShifts(edges.x, lines.x, distance)[0] ?? 0;
  const dy = snapShifts(edges.y, lines.y, distance)[0] ?? 0;
  return { ...rect, x: rect.x + dx, y: rect.y + dy };
};

export { snapMove };
