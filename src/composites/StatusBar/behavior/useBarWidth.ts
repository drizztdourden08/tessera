/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';

const useBarWidth = (barRef: RefObject<HTMLElement | null>): number => {
  const [width, setWidth] = useState(Number.POSITIVE_INFINITY);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;
    const update = () => setWidth(bar.clientWidth || Number.POSITIVE_INFINITY);
    update();
    return observeResize([bar], update);
  }, [barRef]);

  return width;
};

export { useBarWidth };
