/* @layer renderer-components @kind logic */
import type { Rect } from '../DockLayout.type';

const inRect = (p: { x: number; y: number }, r: Rect): boolean =>
  p.x >= r.x && p.x <= r.x + r.width && p.y >= r.y && p.y <= r.y + r.height;

export { inRect };
