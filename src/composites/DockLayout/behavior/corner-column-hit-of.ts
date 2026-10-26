/* @layer renderer-components @kind logic */
import { GAP } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import { CORNER_HIT, CORNER_INSET } from './corner.constants';
import type { CornerEnd, CornerName } from './corner.type';

const cornerColumnHitOf = (strip: Rect, end: CornerEnd, corner: CornerName): Rect => {
  const right = strip.x + strip.width;
  const x = corner.endsWith('left') ? strip.x : Math.max(strip.x, right - CORNER_INSET - CORNER_HIT / 2);
  return { x, y: end === 'start' ? strip.y - GAP : strip.y + strip.height, width: CORNER_HIT, height: GAP };
};

export { cornerColumnHitOf };
