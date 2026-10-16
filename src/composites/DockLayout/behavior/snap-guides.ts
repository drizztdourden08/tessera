/* @layer renderer-components @kind logic */
import { SNAP_AXES, SNAP_EPSILON } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import type { SnapAxis, SnapEdges, SnapGuide, SnapLines } from './snap.type';

const spanAcross = (rect: Rect, axis: SnapAxis): [number, number] =>
  (axis === 'x' ? [rect.y, rect.y + rect.height] : [rect.x, rect.x + rect.width]);

const snapGuidesOf = (rect: Rect, lines: SnapLines, edges: SnapEdges): SnapGuide[] => {
  const guides: SnapGuide[] = [];
  for (const axis of SNAP_AXES) {
    const [start, end] = spanAcross(rect, axis);
    const touching = lines[axis].filter((line) => edges[axis].some((edge) => Math.abs(line.at - edge) < SNAP_EPSILON));
    for (const line of touching) {
      const from = Math.min(line.from, start);
      const to = Math.max(line.to, end);
      const seen = guides.find((g) => g.axis === axis && g.at === line.at);
      if (seen) Object.assign(seen, { from: Math.min(seen.from, from), to: Math.max(seen.to, to) });
      else guides.push({ axis, at: line.at, from, to });
    }
  }
  return guides;
};

export { snapGuidesOf };
