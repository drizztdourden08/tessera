/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../primitives/dom/observe-resize';
import { railOverflows } from './rail-overflows';

const useRailOverflow = (box: RefObject<HTMLElement | null>, list: RefObject<HTMLElement | null>): boolean => {
  const [overflows, setOverflows] = useState(false);
  useLayoutEffect(() => {
    const outer = box.current;
    const inner = list.current;
    if (!outer || !inner) return undefined;
    const update = () => setOverflows(railOverflows(outer, inner));
    update();
    return observeResize([outer, inner], update);
  }, [box, list]);
  return overflows;
};

export { useRailOverflow };
