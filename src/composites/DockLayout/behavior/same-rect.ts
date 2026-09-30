/* @layer renderer-components @kind logic */
import type { Rect } from '../DockLayout.type';

const sameRect = (a: Rect | null, b: Rect | null): boolean => {
  if (a === b) return true;
  if (a === null || b === null) return false;
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
};

export { sameRect };
