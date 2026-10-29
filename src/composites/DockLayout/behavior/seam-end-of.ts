/* @layer renderer-components @kind logic */
import type { Rect, SplitAxis } from '../DockLayout.type';
import { CORNER_HIT } from './corner.constants';
import type { CornerEnd } from './corner.type';

const seamEndOf = (seam: Rect, along: SplitAxis, end: CornerEnd): Rect => {
  if (along === 'column') {
    const height = Math.min(CORNER_HIT, seam.height);
    return { ...seam, y: end === 'start' ? seam.y : seam.y + seam.height - height, height };
  }
  const width = Math.min(CORNER_HIT, seam.width);
  return { ...seam, x: end === 'start' ? seam.x : seam.x + seam.width - width, width };
};

export { seamEndOf };
