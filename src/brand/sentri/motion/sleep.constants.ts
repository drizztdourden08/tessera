/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_SLEEP: MascotAnimation = {
  name: 'Sleep',
  summary: 'Dozes: eyes closed, sinks a pixel with each slow breath, pods hanging low, while a small z, a middle z and a big Z rise one after another and drift away.',
  duration: 3600,
  loop: true,
  still: ['closed', 'zSmall', 'zMid', 'zBig'],
  tracks: [
    stepTrack('rig', [{ at: 0 }, { at: 0.5, y: 1 }, { at: 1 }]),
    stepTrack('podLeft', [{ at: 0, rotate: -10 }, { at: 0.5, rotate: -14 }, { at: 1, rotate: -10 }]),
    stepTrack('podRight', [{ at: 0, rotate: 10 }, { at: 0.5, rotate: 14 }, { at: 1, rotate: 10 }]),
    stepTrack('zSmall', [{ at: 0 }, { at: 0.75, y: -1 }, { at: 0.9, opacity: 0 }, { at: 1 }]),
    stepTrack('zMid', [{ at: 0, opacity: 0 }, { at: 0.25 }, { at: 0.75, y: -1 }, { at: 0.9, opacity: 0 }, { at: 1, opacity: 0 }]),
    stepTrack('zBig', [{ at: 0, opacity: 0 }, { at: 0.5 }, { at: 0.75, y: -1 }, { at: 0.9, opacity: 0 }, { at: 1, opacity: 0 }]),
  ],
};

export { SENTRI_SLEEP };
