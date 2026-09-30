/* @layer renderer-components @kind logic */
import { DRAG_THRESHOLD } from '../DockLayout.constants';
import type { Point } from './drag.type';

const movedEnough = (start: Point, now: Point): boolean =>
  Math.hypot(now.x - start.x, now.y - start.y) >= DRAG_THRESHOLD;

export { movedEnough };
