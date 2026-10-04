/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_FOCUSED: MascotAnimation = {
  name: 'Focused',
  summary: 'Concentrates: narrows its eyes, leans in a pixel and keeps a small mark of effort by its tip that flickers as it thinks.',
  duration: 2400,
  loop: true,
  still: ['narrow', 'focus'],
  tracks: [
    stepTrack('rig', [{ at: 0, y: 1, rotate: 3 }, { at: 1, y: 1, rotate: 3 }]),
    stepTrack('podLeft', [{ at: 0, rotate: -12 }, { at: 0.5, rotate: -8 }, { at: 1, rotate: -12 }]),
    stepTrack('podRight', [{ at: 0, rotate: 12 }, { at: 0.5, rotate: 8 }, { at: 1, rotate: 12 }]),
    stepTrack('focus', [{ at: 0 }, { at: 0.5, y: -1 }, { at: 0.75, opacity: 0 }, { at: 0.83 }, { at: 1 }]),
  ],
};

export { SENTRI_FOCUSED };
