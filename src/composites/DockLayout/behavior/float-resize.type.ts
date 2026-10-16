/* @layer renderer-components @kind types */
import type { LayoutEdit, Rect, Size, WidgetId } from '../DockLayout.type';
import type { Point } from './drag.type';
import type { FloatSnap, SnapGuide } from './snap.type';

type ResizeEdge = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

type ResizeSide = -1 | 0 | 1;

interface ResizeSides {
  x: ResizeSide;
  y: ResizeSide;
}

interface AxisSpan {
  from: number;
  size: number;
}

interface AxisLimits {
  lo: number;
  hi: number;
  min: number;
}

interface ResizeLimits {
  bounds: Rect;
  min: Size;
}

interface SnapResize {
  sides: ResizeSides;
  bounds: Rect;
  min: Size;
}

interface FloatResizeParams {
  id: WidgetId;
  rect: Rect;
  bounds: Rect;
  min: Size;
  snap: FloatSnap | null;
  onEdit: (edit: LayoutEdit) => void;
}

interface LiveResize {
  rect: Rect;
  guides: SnapGuide[];
}

interface ResizeWiring {
  handle: HTMLElement;
  pointerId: number;
  origin: Point;
  edge: ResizeEdge;
  start: Rect;
  bounds: Rect;
  min: Size;
  snap: FloatSnap | null;
  onLive: (live: LiveResize) => void;
  onDone: (rect: Rect | null) => void;
}

export type {
  AxisLimits, AxisSpan, FloatResizeParams, LiveResize, ResizeEdge, ResizeLimits, ResizeSide, ResizeSides, ResizeWiring, SnapResize,
};
