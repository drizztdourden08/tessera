/* @layer renderer-components @kind types */
import type { AnimatedMascotChoice } from '../../../brand/AnimatedMascot/AnimatedMascot.type';
import type { MascotCue, TourBox, TourSize } from '../behavior/tour-internal.type';

interface TourMascotProps {
  choice: AnimatedMascotChoice;
  bubble: TourBox | null;
  hole: TourBox | null;
  view: TourSize;
  cue: MascotCue;
}

export type { TourMascotProps };
