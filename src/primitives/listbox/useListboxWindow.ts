/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { observeResize } from '../dom/observe-resize';
import { FIRST_WINDOW } from './listbox.constants';
import { readListWindow } from './read-list-window';
import { sameWindow } from './same-window';
import { scrollIntoList } from './scroll-into-list';
import type { ListboxWindow, UseListboxWindowParams } from './listbox-window.type';

const useListboxWindow = <T>(params: UseListboxWindowParams<T>): ListboxWindow => {
  const { enabled, scrollerRef, listRef, blocks, activeIndex, query } = params;
  const [slices, setSlices] = useState<ListboxWindow>(FIRST_WINDOW);
  const shape = blocks.map((block) => block.entries.length).join(' ');

  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    const list = listRef.current;
    if (!scroller || !list) return;
    setSlices((before) => {
      const next = readListWindow({ scroller, list, before });
      return sameWindow(before, next) ? before : next;
    });
  }, [scrollerRef, listRef]);

  useLayoutEffect(() => {
    if (enabled) measure();
  }, [enabled, measure, shape, query]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (enabled && list && activeIndex >= 0) scrollIntoList(list, activeIndex);
  }, [enabled, listRef, activeIndex, slices.rowSize]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!enabled || !scroller) return undefined;
    scroller.addEventListener('scroll', measure, { passive: true });
    const stop = observeResize([scroller], measure);
    return () => {
      scroller.removeEventListener('scroll', measure);
      stop();
    };
  }, [enabled, scrollerRef, measure]);

  return slices;
};

export { useListboxWindow };
