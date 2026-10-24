/* @layer renderer-components @kind logic */
import type { ShowInput } from './virtual.type';

const scrollTopToShow = (input: ShowInput): number => {
  const { index, rowHeight, viewport, scrollTop } = input;
  const top = index * rowHeight;
  const bottom = top + rowHeight;
  if (top < scrollTop) return top;
  if (bottom > scrollTop + viewport) return Math.max(0, bottom - viewport);
  return scrollTop;
};

export { scrollTopToShow };
