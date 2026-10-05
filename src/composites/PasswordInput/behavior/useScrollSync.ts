/* @layer renderer-components @kind hook */
import { useLayoutEffect, type RefObject } from 'react';
import { SYNC_EVENTS } from './mask.constants';

const useScrollSync = (inputRef: RefObject<HTMLInputElement | null>, stripRef: RefObject<HTMLElement | null>, count: number): void => {
  useLayoutEffect(() => {
    const input = inputRef.current;
    const strip = stripRef.current;
    if (input === null || strip === null) return undefined;
    const sync = () => {
      strip.style.transform = `translateX(${-input.scrollLeft}px)`;
    };
    sync();
    for (const type of SYNC_EVENTS) input.addEventListener(type, sync);
    return () => {
      for (const type of SYNC_EVENTS) input.removeEventListener(type, sync);
    };
  }, [count]);
};

export { useScrollSync };
