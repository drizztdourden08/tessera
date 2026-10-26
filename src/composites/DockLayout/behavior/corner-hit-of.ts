/* @layer renderer-components @kind logic */
import type { Rect } from '../DockLayout.type';
import { CORNER_HEADER, CORNER_HIT } from './corner.constants';
import type { CornerHandle, CornerName } from './corner.type';
import { cornerColumnHitOf } from './corner-column-hit-of';

const cornerRowHitOf = (strip: Rect, corner: CornerName): Rect => {
  const top = strip.y + CORNER_HEADER;
  return {
    x: corner.endsWith('left') ? strip.x : strip.x + strip.width - CORNER_HIT,
    y: corner.startsWith('top') ? top : Math.max(top, strip.y + strip.height - CORNER_HIT),
    width: CORNER_HIT,
    height: CORNER_HIT,
  };
};

const cornerHitOf = ({ rect, along, end, takeCorner, giveCorner }: CornerHandle): Rect => {
  const corner = takeCorner ?? giveCorner ?? 'top-left';
  return along === 'column' ? cornerColumnHitOf(rect, end, corner) : cornerRowHitOf(rect, corner);
};

export { cornerHitOf };
