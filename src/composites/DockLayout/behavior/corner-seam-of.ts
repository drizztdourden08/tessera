/* @layer renderer-components @kind logic */
import { GAP } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import { CORNER_HIT } from './corner.constants';
import type { CornerHandle } from './corner.type';

const cornerSeamOf = ({ rect, along, end, takeCorner, giveCorner }: CornerHandle): Rect => {
  const corner = takeCorner ?? giveCorner ?? 'top-left';
  if (along === 'column') {
    const width = Math.min(CORNER_HIT, rect.width);
    const x = corner.endsWith('left') ? rect.x : rect.x + rect.width - width;
    return { x, y: end === 'start' ? rect.y - GAP : rect.y + rect.height, width, height: GAP };
  }
  const height = Math.min(CORNER_HIT, rect.height);
  const y = corner.startsWith('top') ? rect.y : rect.y + rect.height - height;
  return { x: end === 'start' ? rect.x - GAP : rect.x + rect.width, y, width: GAP, height };
};

export { cornerSeamOf };
