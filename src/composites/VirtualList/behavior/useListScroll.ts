/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { bodyOrigin } from '../../virtual/body-origin';
import { scrollTopForSpan } from '../../virtual/scroll-top-for-span';
import { listRects } from './list-rects';
import type { ScrollAlign } from '../../virtual';
import type { ListScroll, UseListScrollInput } from './useListScroll.type';

const useListScroll = (input: UseListScrollInput): ListScroll => {
  const { rootRef, bodyRef, layout, axis, keys, onScroll } = input;
  const across = axis === 'horizontal';

  const scrollToIndex = useCallback((index: number, align: ScrollAlign = 'nearest') => {
    const root = rootRef.current;
    if (!root) return;
    const span = { top: layout.startOf(index), height: layout.sizeOf(index) };
    const place = { ...span, viewport: across ? root.clientWidth : root.clientHeight, scrollTop: across ? root.scrollLeft : root.scrollTop };
    if (across) root.scrollLeft = scrollTopForSpan(place, align);
    else root.scrollTop = scrollTopForSpan(place, align);
    onScroll();
  }, [rootRef, layout, across, onScroll]);

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
