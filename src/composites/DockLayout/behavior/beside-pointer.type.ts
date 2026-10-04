/* @layer renderer-components @kind types */
import type { Rect } from '../DockLayout.type';
import type { Point } from './drag.type';

interface BesidePlace {
  left: number;
  top: number;
}

interface BesideFrame {
  area: Rect;
  origin: Point;
}

export type { BesideFrame, BesidePlace };
