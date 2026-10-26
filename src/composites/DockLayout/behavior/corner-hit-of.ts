/* @layer renderer-components @kind logic */
import type { Rect, SplitAxis } from '../DockLayout.type';
import { CORNER_HEADER, CORNER_HIT } from './corner.constants';
import type { CornerEnd } from './corner.type';

const cornerHitOf = (strip: Rect, along: SplitAxis, end: CornerEnd): Rect => {
  const top = strip.y + CORNER_HEADER;
  if (along === 'row') {
    const width = Math.max(strip.width, CORNER_HIT);
    return {
      x: end === 'start' ? strip.x : strip.x + strip.width - width,
      y: top,
      width,
      height: Math.max(strip.height - CORNER_HEADER, CORNER_HIT),
    };
  }
  const bottom = strip.y + strip.height - CORNER_HIT;
  return { x: strip.x, y: end === 'start' ? top : Math.max(top, bottom), width: strip.width, height: CORNER_HIT };
};

export { cornerHitOf };
