/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { NO_HOLES } from '../GuidedTour.constants';
import { measureHoles } from './measure-holes';
import { sameHoles } from './same-holes';
import type { SpotHoles } from './tour-internal.type';

const useSpotHoles = (target: HTMLElement | null, kept: readonly HTMLElement[], ringRef: RefObject<HTMLElement | null>): SpotHoles => {
  const [holes, setHoles] = useState<SpotHoles>(NO_HOLES);

  useLayoutEffect(() => {
    const nodes = target ? [target, ...kept] : kept;
    const first = nodes[0];
    if (!first) {
      setHoles(NO_HOLES);
      return undefined;
    }
    const view = ownerWindowOf(first);
    let frame = 0;
    const measure = (): void => {
      frame = 0;
      const next = measureHoles(target, kept, ringRef.current);
      setHoles((last) => (sameHoles(last, next) ? last : next));
    };
    const soon = (): void => {
      if (frame === 0) frame = view.requestAnimationFrame(measure);
    };
    measure();
    const stopResize = observeResize([...nodes, view.document.body], soon);
    view.addEventListener('resize', soon);
    view.document.addEventListener('scroll', soon, true);
    return () => {
      view.cancelAnimationFrame(frame);
      stopResize();
      view.removeEventListener('resize', soon);
      view.document.removeEventListener('scroll', soon, true);
    };
  }, [target, kept, ringRef]);

  return holes;
};

export { useSpotHoles };
