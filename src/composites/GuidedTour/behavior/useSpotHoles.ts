/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { NO_HOLES } from '../GuidedTour.constants';
import { measureHoles } from './measure-holes';
import { sameHoles } from './same-holes';
import type { SpotHoles } from './tour-internal.type';
import { watchSpot } from './watch-spot';

const useSpotHoles = (
  target: HTMLElement | null,
  kept: readonly HTMLElement[],
  ringRef: RefObject<HTMLElement | null>,
  settled: string | null = null,
): SpotHoles => {
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
    soon();
    const stopWatch = watchSpot(view, nodes, soon);
    return () => {
      view.cancelAnimationFrame(frame);
      stopWatch();
    };
  }, [target, kept, ringRef, settled]);

  return holes;
};

export { useSpotHoles };
