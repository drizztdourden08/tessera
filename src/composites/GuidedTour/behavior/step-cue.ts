/* @layer renderer-components @kind logic */
import type { TourStep } from '../GuidedTour.type';
import type { MascotCue } from './tour-internal.type';

const stepCue = (step: TourStep | null, target: HTMLElement | null): MascotCue => {
  if (!step) return { clip: 'idle' };
  const { mascot } = step;
  if (!mascot) return { clip: target ? 'point' : 'wave' };
  return typeof mascot === 'string' ? { clip: mascot } : { clip: mascot.arrive, walk: mascot.walk };
};

export { stepCue };
