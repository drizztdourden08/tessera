/* @layer renderer-components @kind logic */
import type { Rect } from '../rect-drag/rect-drag.type';

const rectsIntersect = (a: Rect, b: Rect): boolean =>
  a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

export { rectsIntersect };
