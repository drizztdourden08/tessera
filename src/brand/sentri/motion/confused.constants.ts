/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_CONFUSED: MascotAnimation = {
  name: 'Confused',
  summary: 'Puzzled: tilts hard to the right with arched eyes, rocks its head back and forth a little, and a question mark shifts from side to side above it.',
  duration: 3200,
  loop: true,
  still: ['question', 'soft'],
  tracks: [
    stepTrack('rig', [{ at: 0, x: 1, rotate: 12 }, { at: 0.25, x: 1, rotate: 8 }, { at: 0.5, x: 1, rotate: 12 }, { at: 0.75, x: 1, rotate: 8 }, { at: 1, x: 1, rotate: 12 }]),
    stepTrack('shadow', [{ at: 0, x: 1 }, { at: 1, x: 1 }]),
    stepTrack('podLeft', [{ at: 0, rotate: 26 }, { at: 0.5, rotate: 34 }, { at: 1, rotate: 26 }]),
    stepTrack('podRight', [{ at: 0, rotate: 8 }, { at: 1, rotate: 8 }]),
    stepTrack('question', [{ at: 0 }, { at: 0.25, x: 1 }, { at: 0.5 }, { at: 0.75, x: -1 }, { at: 1 }]),
  ],
};

export { SENTRI_CONFUSED };
