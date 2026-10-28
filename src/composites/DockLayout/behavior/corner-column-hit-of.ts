/* @layer renderer-components @kind logic */
import { GAP } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import { CORNER_HIT, CORNER_LIFT } from './corner.constants';
import type { CornerEnd, CornerName } from './corner.type';

const cornerColumnHitOf = (strip: Rect, end: CornerEnd, corner: CornerName): Rect => {
  const right = strip.x + strip.width;
  const x = corner.endsWith('left') ? strip.x : Math.max(strip.x, right - CORNER_HIT);
  const seam = end === 'start' ? strip.y - GAP : strip.y + strip.height;
  return { x, y: seam - CORNER_LIFT - CORNER_HIT, width: CORNER_HIT, height: CORNER_HIT };
};

export { cornerColumnHitOf };
