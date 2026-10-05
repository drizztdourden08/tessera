/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { TARGET_TRIES } from '../GuidedTour.constants';
import type { TourSpotTarget } from '../sub-components/TourSpot.type';
import { findTarget } from './find-target';
import { nextFrame } from './next-frame';
import { seekTarget } from './seek-target';

const useSeekTarget = (root: HTMLElement | null, target: TourSpotTarget | null): HTMLElement | null => {
  const [found, setFound] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const view = ownerWindowOf(root);
    const control = new AbortController();
    const seek = { find: () => findTarget(view.document, target), frame: nextFrame(view), tries: TARGET_TRIES, signal: control.signal };
    void (root && target ? seekTarget(seek) : Promise.resolve(null)).then((node) => {
      if (!control.signal.aborted) setFound(node);
    });
    return () => control.abort();
  }, [root, target]);

  return found;
};

export { useSeekTarget };
