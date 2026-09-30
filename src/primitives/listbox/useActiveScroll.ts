/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { scrollIntoList } from './scroll-into-list';

const useActiveScroll = (dropRef: RefObject<HTMLElement | null>, activeIndex: number): void => {
  useEffect(() => {
    const drop = dropRef.current;
    if (drop && activeIndex >= 0) scrollIntoList(drop, activeIndex);
  }, [dropRef, activeIndex]);
};

export { useActiveScroll };
