/* @layer renderer-components @kind logic */
import type { Rect } from '../DockLayout.type';
import { CORNER_HEADER, CORNER_HIT } from './corner.constants';
import type { CornerHandle } from './corner.type';

const cornerHitOf = ({ rect: strip, along, takeCorner, giveCorner }: CornerHandle): Rect => {
  const corner = takeCorner ?? giveCorner ?? 'top-left';
  const top = strip.y + CORNER_HEADER;
  const bottom = strip.y + strip.height - CORNER_HIT;
  return {
    x: corner.endsWith('left') ? strip.x : strip.x + strip.width - CORNER_HIT,
    y: corner.startsWith('top') ? top : Math.max(along === 'row' ? top : bottom, bottom),
    width: CORNER_HIT,
    height: CORNER_HIT,
  };
};

export { cornerHitOf };
