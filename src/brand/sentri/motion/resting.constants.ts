/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_RESTING: MascotAnimation = {
  name: 'Resting',
  summary: 'Lies flat: squashed low and wide with its eyes shut and pods spread on the floor, it breathes slowly while a z, a z and a Z rise from its tip.',
  duration: 4000,
  loop: true,
  still: ['closed', 'zSmall', 'zMid', 'zBig'],
  tracks: [
    stepTrack('rig', [{ at: 0, scaleX: 1.2, scaleY: 0.6 }, { at: 0.5, scaleX: 1.2, scaleY: 0.65 }, { at: 1, scaleX: 1.2, scaleY: 0.6 }]),
    stepTrack('shadow', [{ at: 0, scaleX: 1.25 }, { at: 1, scaleX: 1.25 }]),
    stepTrack('podLeft', [{ at: 0, x: -3, y: 3, rotate: -24 }, { at: 1, x: -3, y: 3, rotate: -24 }]),
    stepTrack('podRight', [{ at: 0, x: 3, y: 3, rotate: 24 }, { at: 1, x: 3, y: 3, rotate: 24 }]),
    stepTrack('zSmall', [{ at: 0, x: -3, y: 7 }, { at: 0.7, x: -3, y: 6 }, { at: 0.88, opacity: 0 }, { at: 1, x: -3, y: 7 }]),
    stepTrack('zMid', [{ at: 0, opacity: 0 }, { at: 0.3, x: -3, y: 7 }, { at: 0.7, x: -3, y: 6 }, { at: 0.88, opacity: 0 }, { at: 1, opacity: 0 }]),
    stepTrack('zBig', [{ at: 0, opacity: 0 }, { at: 0.55, x: -3, y: 7 }, { at: 0.7, x: -3, y: 6 }, { at: 0.88, opacity: 0 }, { at: 1, opacity: 0 }]),
  ],
};

export { SENTRI_RESTING };
