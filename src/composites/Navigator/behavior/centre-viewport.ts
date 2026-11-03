/* @layer renderer-components @kind logic */
import type { Point } from '../../rect-drag/rect-drag.type';
import type { NavigatorSurface, NavigatorViewport } from '../Navigator.type';
import { moveViewport } from './move-viewport';

const centreViewport = (viewport: NavigatorViewport, surface: NavigatorSurface, point: Point, unclamped = false): NavigatorViewport =>
  moveViewport({ ...viewport, x: 0, y: 0 }, surface, { dx: point.x - viewport.width / 2, dy: point.y - viewport.height / 2 }, unclamped);

export { centreViewport };
