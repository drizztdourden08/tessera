/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';

const useWideContainer = (ref: RefObject<HTMLElement | null>, minWidth: number): boolean => {
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const read = (): void => setWide(el.getBoundingClientRect().width >= minWidth);
    read();
    return observeResize([el], read);
  }, [ref, minWidth]);

  return wide;
};

export { useWideContainer };
