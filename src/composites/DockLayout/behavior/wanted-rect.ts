/* @layer renderer-components @kind logic */
import type { Rect } from '../DockLayout.type';
import type { DragSource, Point } from './drag.type';

const wantedRect = (source: DragSource, pointer: Point): Rect =>
  ({ x: pointer.x - source.grab.x, y: pointer.y - source.grab.y, width: source.size.width, height: source.size.height });

export { wantedRect };
