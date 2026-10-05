/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { measureActions } from './measure-actions';

const useActionFit = (barRef: RefObject<HTMLElement | null>, measureRef: RefObject<HTMLElement | null>, restCount: number, contentKey: string): number => {
  const [fit, setFit] = useState(Number.POSITIVE_INFINITY);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const measure = measureRef.current;
    if (!bar || !measure) return undefined;
    const update = () => setFit(measureActions(bar, measure, restCount));
    update();
    return observeResize([bar, measure], update);
  }, [barRef, measureRef, restCount, contentKey]);

  return fit;
};

export { useActionFit };
