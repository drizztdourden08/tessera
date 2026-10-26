/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { marqueeItemRects } from '../../marquee/marquee-item-rects';
import { bodyOrigin } from '../../virtual/body-origin';
import { ROW_RECT_SELECTOR } from './row-rects.constants';
import { rowRects } from './row-rects';
import type { MarqueeItem } from '../../marquee';
import type { UseRowRectsInput } from './useRowRects.type';

const useRowRects = <T,>(input: UseRowRectsInput<T>): (() => readonly MarqueeItem[]) => {
  const { rootRef, virtual, getRowId } = input;
  return useCallback(() => {
    const root = rootRef.current;
    if (!root) return [];
    if (!virtual) return marqueeItemRects(root, ROW_RECT_SELECTOR);
    const body = virtual.bodyRef.current;
    if (!body) return [];
    const origin = bodyOrigin(root, body);
    return rowRects({
      items: virtual.items,
      rowHeight: virtual.metrics.rowHeight,
      origin,
      width: Math.max(0, root.scrollWidth - origin.x),
      getRowId,
    });
  }, [rootRef, virtual, getRowId]);
};

export { useRowRects };
