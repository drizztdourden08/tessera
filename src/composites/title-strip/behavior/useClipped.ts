/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { clippedOf } from './clipped-of';

const useClipped = (
  titleRef: RefObject<HTMLElement | null>,
  sublabelRef: RefObject<HTMLElement | null>,
  title: ReactNode,
  sublabel: ReactNode,
): boolean => {
  const [clipped, setClipped] = useState(false);
  useLayoutEffect(() => {
    const nodes = [titleRef.current, sublabelRef.current];
    const update = () => setClipped(clippedOf(nodes));
    update();
    return observeResize(nodes, update);
  }, [titleRef, sublabelRef, title, sublabel]);
  return clipped;
};

export { useClipped };
