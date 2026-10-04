/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { fitFallback } from './fit-fallback';

const useFitFallback = (find: () => Element | null, active = true): void => {
  useLayoutEffect(() => {
    if (!active) return undefined;
    const view = ownerWindowOf(find());
    const fit = (): void => fitFallback(find(), view);
    let frame = view.requestAnimationFrame(() => {
      frame = view.requestAnimationFrame(fit);
    });
    view.addEventListener('resize', fit);
    return () => {
      view.cancelAnimationFrame(frame);
      view.removeEventListener('resize', fit);
    };
  });
};

export { useFitFallback };
