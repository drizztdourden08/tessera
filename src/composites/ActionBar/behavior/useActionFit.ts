/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { measureActions } from './measure-actions';

const useActionFit = (barRef: RefObject<HTMLElement | null>, measureRef: RefObject<HTMLElement | null>, restCount: number, contentKey: string): number => {
  const [fit, setFit] = useState(Number.POSITIVE_INFINITY);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const measure = measureRef.current;
    if (!bar || !measure) return undefined;
    const update = () => setFit(measureActions(bar, measure, restCount));
    update();
    const view = ownerWindowOf(bar) as Window & typeof globalThis;
    if (typeof view.ResizeObserver === 'undefined') return undefined;
    const observer = new view.ResizeObserver(update);
    observer.observe(bar);
    observer.observe(measure);
    return () => observer.disconnect();
  }, [barRef, measureRef, restCount, contentKey]);

  return fit;
};

export { useActionFit };
