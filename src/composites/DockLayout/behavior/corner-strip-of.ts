/* @layer renderer-components @kind logic */
import { GAP } from '../DockLayout.constants';
import type { Rect, SplitAxis } from '../DockLayout.type';
import type { CornerEnd } from './corner.type';

const cornerStripOf = (rect: Rect, along: SplitAxis, end: CornerEnd): Rect => {
  if (along === 'row') {
    const width = Math.min(GAP, rect.width / 2);
    return { x: end === 'start' ? rect.x : rect.x + rect.width - width, y: rect.y, width, height: rect.height };
  }
  const height = Math.min(GAP, rect.height / 2);
  return { x: rect.x, y: end === 'start' ? rect.y : rect.y + rect.height - height, width: rect.width, height };
};

export { cornerStripOf };
