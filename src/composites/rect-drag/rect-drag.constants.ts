/* @layer renderer-components @kind data */
import type { ResizeEdge, ResizeSides } from './rect-drag.type';

const RESIZE_EDGES: readonly ResizeEdge[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

const RESIZE_SIDES: Readonly<Record<ResizeEdge, ResizeSides>> = {
  n: { x: 0, y: -1 }, s: { x: 0, y: 1 }, e: { x: 1, y: 0 }, w: { x: -1, y: 0 },
  ne: { x: 1, y: -1 }, nw: { x: -1, y: -1 }, se: { x: 1, y: 1 }, sw: { x: -1, y: 1 },
};

export { RESIZE_EDGES, RESIZE_SIDES };
