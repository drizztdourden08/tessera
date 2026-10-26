/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { NO_HOLES } from '../GuidedTour.constants';
import { measureHoles } from './measure-holes';
import { sameHoles } from './same-holes';
import { settleLoop } from './settle-loop';
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
    let last = measureHoles(target, kept, ringRef.current);
    setHoles((shown) => (sameHoles(shown, last) ? shown : last));
    const measure = (): boolean => {
      const next = measureHoles(target, kept, ringRef.current);
      if (sameHoles(last, next)) return true;
      last = next;
      setHoles(next);
      return false;
    };
    const loop = settleLoop(ownerWindowOf(first), measure);
    loop.kick();
    const stopWatch = watchSpot(ownerWindowOf(first), nodes, loop.kick);
    return () => {
      loop.stop();
      stopWatch();
    };
  }, [target, kept, ringRef, settled]);

  return holes;
};

export { useSpotHoles };
