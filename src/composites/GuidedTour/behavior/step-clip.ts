/* @layer renderer-components @kind logic */
import type { MascotClip } from '../../../brand/motion/mascot-clip.type';
import type { TourStep } from '../GuidedTour.type';

const stepClip = (step: TourStep | null, target: HTMLElement | null): MascotClip => {
  if (!step) return 'idle';
  return step.mascot ?? (target ? 'point' : 'wave');
};

export { stepClip };
