/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { scrollOffset } from './scroll-offset';
import type { ScrollAlign } from '../../virtual';
import type { GridScrollInput } from './useGridScroll.type';

const useGridScroll = (input: GridScrollInput): ((index: number, align?: ScrollAlign) => void) => {
  const { rootRef, layout, heights, onScroll } = input;
  return useCallback((index: number, align: ScrollAlign = 'nearest') => {
    const root = rootRef.current;
    if (!root) return;
    root.scrollTop = scrollOffset({ layout, heights, index, viewport: root.clientHeight, scrollTop: root.scrollTop, align });
    onScroll();
  }, [rootRef, layout, heights, onScroll]);
};

export { useGridScroll };
