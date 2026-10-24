/* @layer renderer-components @kind logic */
import type { ScrollAlign, SpanInput } from './virtual.type';

const scrollTopForSpan = (input: SpanInput, align: ScrollAlign): number => {
  const { top, height, viewport, scrollTop } = input;
  const bottom = top + height;
  if (align === 'start') return Math.max(0, top);
  if (align === 'end') return Math.max(0, bottom - viewport);
  if (align === 'center') return Math.max(0, top - (viewport - height) / 2);
  if (top < scrollTop) return top;
  if (bottom > scrollTop + viewport) return Math.max(0, bottom - viewport);
  return scrollTop;
};

export { scrollTopForSpan };
