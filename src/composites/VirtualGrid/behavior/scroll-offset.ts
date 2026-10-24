/* @layer renderer-components @kind logic */
import { scrollTopForSpan } from '../../virtual/scroll-top-for-span';
import { rowOfItem } from './row-of-item';
import { rowPlace } from './row-place';
import type { OffsetInput } from './scroll-offset.type';

const scrollOffset = (input: OffsetInput): number => {
  const { layout, heights, index, viewport, scrollTop, align } = input;
  const row = layout.rows[rowOfItem(layout, index)];
  if (!row) return scrollTop;
  return scrollTopForSpan({ ...rowPlace(row, heights), viewport, scrollTop }, align);
};

export { scrollOffset };
