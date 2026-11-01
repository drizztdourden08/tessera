/* @layer renderer-components @kind logic */
import { rowPlace } from './row-place';
import type { MarqueeItem } from '../../marquee';
import type { RectsInput } from './grid-rects.type';

const gridRects = (input: RectsInput): readonly MarqueeItem[] => {
  const { layout, heights, tileWidth, origin, keyOf } = input;
  return layout.rows.flatMap((row, at) => {
    if (row.kind !== 'tiles') return [];
    const place = rowPlace(row, heights, at);
    const y = origin.y + place.top;
    return Array.from({ length: row.size }, (_, offset) => ({
      key: keyOf(row.first + offset),
      rect: { x: origin.x + offset * tileWidth, y, width: tileWidth, height: place.height },
      cell: { row: row.tiles, column: offset },
    }));
  });
};

export { gridRects };
