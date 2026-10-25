/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { TagLineFitParams } from '../ItemCard.type';
import { measureTagLine } from './measure-tag-line';

const useTagLineFit = (params: TagLineFitParams): number => {
  const { rowRef, measureRef, count } = params;
  const [fit, setFit] = useState(count);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const measure = measureRef.current;
    if (!row || !measure) return undefined;
    const update = () => setFit(measureTagLine(row, measure, count));
    update();
    return observeResize([row, measure], update);
  }, [rowRef, measureRef, count]);

  return Math.min(fit, count);
};

export { useTagLineFit };
