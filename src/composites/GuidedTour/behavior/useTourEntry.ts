/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { useTesseraOverride } from '../../../primitives/TesseraProvider/behavior/useTesseraOverride';
import { TARGET_TRIES } from '../GuidedTour.constants';
import type { GuidedTourOptions } from '../GuidedTour.type';
import { enterStep } from './enter-step';
import { findTarget } from './find-target';
import { nextFrame } from './next-frame';
import type { EnteredStep, TourPosition } from './tour-internal.type';

const useTourEntry = (at: TourPosition, id: string | undefined, latest: RefObject<{ options: GuidedTourOptions }>): EnteredStep | null => {
  const provided = useTesseraOverride('portalDocument');
  const [entered, setEntered] = useState<EnteredStep | null>(null);
  const { open, index } = at;

  useEffect(() => {
    const step = latest.current.options.steps[index];
    if (!open || !step) return undefined;
    const doc = provided ?? ownerDocumentOf(null);
    const control = new AbortController();
    const find = () => findTarget(doc, step.target);
    void enterStep({ step, find, frame: nextFrame(doc.defaultView ?? window), tries: TARGET_TRIES, signal: control.signal }).then((target) => {
      if (!control.signal.aborted) setEntered({ index, id: step.id, target });
    });
    return () => {
      control.abort();
      setEntered(null);
      latest.current.options.onStepLeave?.(step, index);
    };
  }, [open, index, id, provided, latest]);

  useEffect(() => {
    const step = entered ? latest.current.options.steps[entered.index] : undefined;
    if (entered && step) latest.current.options.onStepShown?.(step, entered.index, entered.target);
  }, [entered, latest]);

  return entered;
};

export { useTourEntry };
