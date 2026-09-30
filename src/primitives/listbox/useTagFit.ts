/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../dom/owner-window';
import { measureTags } from './measure-tags';

const useTagFit = (rowRef: RefObject<HTMLElement | null>, measureRef: RefObject<HTMLElement | null>, contentKey: string): number => {
  const [fit, setFit] = useState(Number.POSITIVE_INFINITY);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const measure = measureRef.current;
    if (!row || !measure) return undefined;
    const update = () => setFit(measureTags(row, measure));
    update();
    const view = ownerWindowOf(row) as Window & typeof globalThis;
    const observer = new view.ResizeObserver(update);
    observer.observe(row);
    return () => observer.disconnect();
  }, [rowRef, measureRef, contentKey]);

  return fit;
};

export { useTagFit };
