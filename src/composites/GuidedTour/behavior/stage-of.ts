/* @layer renderer-components @kind logic */
import type { GuidedTourApi } from '../GuidedTour.type';
import { stepClip } from './step-clip';
import type { EnteredStep, TourStage } from './tour-internal.type';

const stageOf = (tour: GuidedTourApi, entered: EnteredStep | null): TourStage => {
  const target = entered?.target ?? null;
  const step = entered?.index === tour.index ? tour.current : null;
  const presented = entered ? tour.steps[entered.index] ?? null : null;
  return { target, step, click: step?.advance === 'click', clip: stepClip(presented, target) };
};

export { stageOf };
