/* @layer renderer-components @kind logic */
import type { MarqueeItem } from '../../marquee';
import type { RowRectsInput } from './row-rects.type';

const rowRects = <T>(input: RowRectsInput<T>): readonly MarqueeItem[] => {
  const { items, rowHeight, origin, width, getRowId } = input;
  return items.flatMap((item, index) => {
    if (item.kind !== 'row') return [];
    return [{
      key: getRowId(item.row),
      rect: { x: origin.x, y: origin.y + index * rowHeight, width, height: rowHeight },
    }];
  });
};

export { rowRects };
