/* @layer renderer-components @kind logic */
import type { Rect } from '../DockLayout.type';
import type { ResizeSide, ResizeSides } from './float-resize.type';
import type { SnapEdges } from './snap.type';

const sideEdges = (from: number, size: number, side: ResizeSide | null): number[] => {
  if (side === null) return [from, from + size];
  if (side === 0) return [];
  return [side === 1 ? from + size : from];
};

const snapEdgesOf = (rect: Rect, sides?: ResizeSides): SnapEdges => ({
  x: sideEdges(rect.x, rect.width, sides ? sides.x : null),
  y: sideEdges(rect.y, rect.height, sides ? sides.y : null),
});

export { snapEdgesOf };
