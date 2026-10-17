/* @layer renderer-components @kind logic */
import { clampInto } from '../../rect-drag/clamp-into';
import type { Point, Rect } from '../../rect-drag/rect-drag.type';

const movedRect = (start: Rect, by: Point, bounds: Rect): Rect =>
  clampInto({ ...start, x: start.x + by.x, y: start.y + by.y }, bounds);

export { movedRect };
