/* @layer renderer-components @kind logic */
import type { Rect } from '../../rect-drag/rect-drag.type';

const rowInsertion = (rects: readonly { rect: Rect }[], y: number): number => {
  const at = rects.findIndex(({ rect }) => y < rect.y + rect.height / 2);
  return at < 0 ? rects.length : at;
};

export { rowInsertion };
