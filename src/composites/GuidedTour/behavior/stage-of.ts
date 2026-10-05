/* @layer renderer-components @kind logic */
import type { GuidedTourApi } from '../GuidedTour.type';
import { stepCue } from './step-cue';
import type { EnteredStep, TourStage } from './tour-internal.type';

const stageOf = (tour: GuidedTourApi, held: EnteredStep | null): TourStage => {
  const target = held?.target ?? null;
  const step = tour.shown ? tour.current : null;
  const presented = held ? tour.steps[held.index] ?? null : null;
  const advance = step?.advance ?? 'next';
  return { target, step, click: advance === 'click', waits: advance !== 'next', cue: stepCue(presented, target) };
};

export { stageOf };
