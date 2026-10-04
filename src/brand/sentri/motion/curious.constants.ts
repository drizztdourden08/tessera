/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_CURIOUS: MascotAnimation = {
  name: 'Curious',
  summary: 'Wonders about something: tilts its head, a question mark hovers above and bobs, and the eyes look up one way, then the other.',
  duration: 3200,
  loop: true,
  still: ['question'],
  tracks: [
    stepTrack('rig', [{ at: 0, x: -1, rotate: -8 }, { at: 0.5, x: -1, y: -1, rotate: -8 }, { at: 1, x: -1, rotate: -8 }]),
    stepTrack('shadow', [{ at: 0, x: -1 }, { at: 1, x: -1 }]),
    stepTrack('podLeft', [{ at: 0, rotate: -6 }, { at: 1, rotate: -6 }]),
    stepTrack('podRight', [{ at: 0, rotate: -14 }, { at: 0.5, rotate: -20 }, { at: 1, rotate: -14 }]),
    stepTrack('eyes', [{ at: 0, x: 1, y: -1 }, { at: 0.45, x: 1, y: -1 }, { at: 0.5, x: -1, y: -1 }, { at: 0.95, x: -1, y: -1 }, { at: 1, x: 1, y: -1 }]),
    stepTrack('question', [{ at: 0 }, { at: 0.25, y: -1 }, { at: 0.5 }, { at: 0.75, y: -1 }, { at: 1 }]),
  ],
};

export { SENTRI_CURIOUS };
