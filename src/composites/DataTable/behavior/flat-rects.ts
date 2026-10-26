/* @layer renderer-components @kind logic */
import type { Rect } from '../../rect-drag/rect-drag.type';
import type { RowRectsInput } from './row-rects.type';

const flatRects = <T>(input: Omit<RowRectsInput<T>, 'getRowId'>): readonly Rect[] => {
  const { items, rowHeight, origin, width } = input;
  return items.map((_, index) => ({ x: origin.x, y: origin.y + index * rowHeight, width, height: rowHeight }));
};

export { flatRects };
