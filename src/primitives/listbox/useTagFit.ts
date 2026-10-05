/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../dom/observe-resize';
import { measureTags } from './measure-tags';

const useTagFit = (rowRef: RefObject<HTMLElement | null>, measureRef: RefObject<HTMLElement | null>, contentKey: string): number => {
  const [fit, setFit] = useState(Number.POSITIVE_INFINITY);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const measure = measureRef.current;
    if (!row || !measure) return undefined;
    const update = () => setFit(measureTags(row, measure));
    update();
    return observeResize([row], update);
  }, [rowRef, measureRef, contentKey]);

  return fit;
};

export { useTagFit };
