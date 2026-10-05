/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { GuidedTourApi } from '../GuidedTour.type';
import { TARGET_TRIES } from '../GuidedTour.constants';
import { enterStep } from './enter-step';
import { findTarget } from './find-target';
import type { EnteredStep } from './tour-internal.type';

const useStepEntry = (tour: GuidedTourApi, root: HTMLElement | null): EnteredStep | null => {
  const [entered, setEntered] = useState<EnteredStep | null>(null);
  const latest = useRef(tour);
  latest.current = tour;
  const { index, current } = tour;
  const id = current?.id;

  useEffect(() => {
    const step = latest.current.current;
    if (!root || !step) return undefined;
    let live = true;
    const doc = ownerDocumentOf(root);
    const view = ownerWindowOf(root);
    void enterStep({
      step,
      find: () => findTarget(doc, step.target),
      frame: () => new Promise((resolve) => { view.requestAnimationFrame(() => resolve()); }),
      tries: TARGET_TRIES,
    }).then((target) => {
      if (live) setEntered({ index, target });
    });
    return () => { live = false; };
  }, [root, index, id]);

  return entered;
};

export { useStepEntry };
