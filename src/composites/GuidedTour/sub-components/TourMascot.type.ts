/* @layer renderer-components @kind types */
import type { AnimatedMascotChoice } from '../../../brand/AnimatedMascot/AnimatedMascot.type';
import type { MascotClip } from '../../../brand/motion/mascot-clip.type';
import type { TourBox, TourSize } from '../behavior/tour-internal.type';

interface TourMascotProps {
  choice: AnimatedMascotChoice;
  area: TourBox | null;
  view: TourSize;
  clip: MascotClip;
}

export type { TourMascotProps };
