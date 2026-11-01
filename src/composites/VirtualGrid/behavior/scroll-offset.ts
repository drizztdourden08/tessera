/* @layer renderer-components @kind logic */
import { scrollTopForSpan } from '../../virtual/scroll-top-for-span';
import { rowOfItem } from './row-of-item';
import { rowPlace } from './row-place';
import type { OffsetInput } from './scroll-offset.type';

const scrollOffset = (input: OffsetInput): number => {
  const { layout, heights, index, viewport, scrollTop, align } = input;
  const at = rowOfItem(layout, index);
  const row = layout.rows[at];
  if (!row) return scrollTop;
  return scrollTopForSpan({ ...rowPlace(row, heights, at), viewport, scrollTop }, align);
};

export { scrollOffset };
