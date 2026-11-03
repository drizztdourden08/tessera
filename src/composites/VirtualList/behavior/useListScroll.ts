/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { bodyOrigin } from '../../virtual/body-origin';
import { scrollToSpan } from '../../virtual/scroll-to-span';
import { listRects } from './list-rects';
import type { ScrollAlign } from '../../virtual';
import type { ListScroll, UseListScrollInput } from './useListScroll.type';

const useListScroll = (input: UseListScrollInput): ListScroll => {
  const { rootRef, scrollerRef, bodyRef, layout, axis, keys, onScroll } = input;
  const across = axis === 'horizontal';

  const scrollToIndex = useCallback((index: number, align: ScrollAlign = 'nearest') => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const span = { top: layout.startOf(index), height: layout.sizeOf(index) };
    scrollToSpan({ scroller, body: bodyRef.current, shifted: scroller !== rootRef.current, across, span, align });
    onScroll();
  }, [rootRef, scrollerRef, bodyRef, layout, across, onScroll]);

  const getRects = useCallback(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return [];
    const cross = across ? body.clientHeight : body.clientWidth;
    return listRects({ layout, cross, axis, origin: bodyOrigin(root, body), keyOf: (at) => keys[at] ?? '' });
  }, [rootRef, bodyRef, layout, across, axis, keys]);

  return { scrollToIndex, getRects };
};

export { useListScroll };
