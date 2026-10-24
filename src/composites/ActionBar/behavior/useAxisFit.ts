/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { FitParams } from '../ActionBar.type';
import { measureActions } from './measure-actions';

const useAxisFit = (params: FitParams): number => {
  const { barRef, measureRef, restCount, contentKey, axis } = params;
  const [fit, setFit] = useState(Number.POSITIVE_INFINITY);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const measure = measureRef.current;
    if (!bar || !measure) return undefined;
    const update = () => setFit(measureActions(bar, measure, restCount, axis));
    update();
    return observeResize([bar, measure], update);
  }, [barRef, measureRef, restCount, contentKey, axis]);

  return fit;
};

export { useAxisFit };
