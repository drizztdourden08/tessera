/* @layer renderer-components @kind logic */
import { rowPlace } from './row-place';
import type { MarqueeItem } from '../../marquee';
import type { RectsInput } from './grid-rects.type';

const gridRects = (input: RectsInput): readonly MarqueeItem[] => {
  const { layout, heights, tileWidth, origin, keyOf } = input;
  return layout.rows.flatMap((row) => {
    if (row.kind !== 'tiles') return [];
    const y = origin.y + rowPlace(row, heights).top;
    return Array.from({ length: row.size }, (_, offset) => ({
      key: keyOf(row.first + offset),
      rect: { x: origin.x + offset * tileWidth, y, width: tileWidth, height: heights.tile },
    }));
  });
};

export { gridRects };
