/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_MOVE_WOBBLE: MascotAnimation = {
  name: 'Wobble',
  summary: 'Waddles in place: rocks left and right a pixel at a time with wobble lines on the side it leans from, glances the way it rocks and grins on the last two steps.',
  duration: 1200,
  loop: true,
  tracks: [
    stepTrack('rig', [{ at: 0, x: -1, rotate: -7 }, { at: 0.17, x: 1, rotate: 5 }, { at: 0.33 }, { at: 0.5, x: -1, y: -1, rotate: -5 }, { at: 0.67, x: 1, rotate: 4 }, { at: 0.83, y: -1 }, { at: 1, x: -1, rotate: -7 }]),
    stepTrack('shadow', [{ at: 0, x: -1 }, { at: 0.17, x: 1 }, { at: 0.33 }, { at: 0.5, x: -1, scale: 0.92 }, { at: 0.67, x: 1 }, { at: 0.83, scale: 0.92 }, { at: 1, x: -1 }]),
    stepTrack('podLeft', [{ at: 0, rotate: 18 }, { at: 0.17, rotate: -6 }, { at: 0.33, rotate: 6 }, { at: 0.5, rotate: 20 }, { at: 0.67, rotate: -8 }, { at: 0.83, rotate: 10 }, { at: 1, rotate: 18 }]),
    stepTrack('podRight', [{ at: 0, rotate: 6 }, { at: 0.17, rotate: -18 }, { at: 0.33, rotate: -6 }, { at: 0.5, rotate: 8 }, { at: 0.67, rotate: -20 }, { at: 0.83, rotate: -10 }, { at: 1, rotate: 6 }]),
    stepTrack('eyes', [{ at: 0, x: -1 }, { at: 0.17, x: 1 }, { at: 0.33 }, { at: 0.5, x: -1, y: 1 }, { at: 1, x: -1 }]),
    stepTrack('grin', [{ at: 0 }, { at: 0.67, opacity: 1 }, { at: 1 }]),
    stepTrack('whoosh', [{ at: 0, opacity: 1 }, { at: 0.17, x: 1, opacity: 1 }, { at: 0.33 }, { at: 0.5, opacity: 1 }, { at: 0.67 }, { at: 1, opacity: 1 }]),
  ],
};

export { SENTRI_MOVE_WOBBLE };
