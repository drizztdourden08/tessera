/* @layer renderer-components @kind types */
import type { PointerEvent as ReactPointerEvent } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Size {
  width: number;
  height: number;
}

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

interface DragWiring<T> {
  handle: HTMLElement;
  pointerId: number;
  origin: Point;
  frame: (delta: Point) => T;
  onLive: (live: T) => void;
  onDone: (last: T | null) => void;
}

interface RectDrag<T> {
  live: T | null;
  begin: (event: ReactPointerEvent<HTMLElement>, frame: (delta: Point) => T, onDone: (last: T | null) => void) => void;
}

export type { AxisLimits, AxisSpan, DragWiring, Point, Rect, RectDrag, ResizeEdge, ResizeLimits, ResizeSide, ResizeSides, Size };
