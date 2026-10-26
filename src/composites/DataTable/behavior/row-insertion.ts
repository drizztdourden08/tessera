/* @layer renderer-components @kind logic */
import type { MarqueeItem } from '../../marquee';

const rowInsertion = (rects: readonly MarqueeItem[], y: number): number => {
  const at = rects.findIndex(({ rect }) => y < rect.y + rect.height / 2);
  return at < 0 ? rects.length : at;
};

export { rowInsertion };
