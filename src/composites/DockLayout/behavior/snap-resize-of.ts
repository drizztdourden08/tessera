/* @layer renderer-components @kind logic */
import { RESIZE_SIDES } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import type { LiveResize, ResizeEdge, ResizeLimits } from './float-resize.type';
import { snapEdgesOf } from './snap-edges';
import { snapGuidesOf } from './snap-guides';
import { snapLinesOf } from './snap-lines';
import { snapResize } from './snap-resize';
import type { FloatSnap } from './snap.type';

const snapResizeOf = (snap: FloatSnap | null, edge: ResizeEdge, limits: ResizeLimits): ((rect: Rect) => LiveResize) => {
  if (!snap || snap.distance <= 0) return (rect) => ({ rect, guides: [] });
  const lines = snapLinesOf(snap.targets);
  const sides = RESIZE_SIDES[edge];
  return (rect) => {
    const snapped = snapResize(rect, lines, snap.distance, { sides, ...limits });
    return { rect: snapped, guides: snapGuidesOf(snapped, lines, snapEdgesOf(snapped, sides)) };
  };
};

export { snapResizeOf };
