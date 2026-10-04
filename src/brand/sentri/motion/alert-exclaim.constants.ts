/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_ALERT_EXCLAIM: MascotAnimation = {
  name: 'Exclaim',
  summary: 'Startled with a mark: an exclamation mark pops up above the tip as Sentri flinches, jumps three pixels with its pods snapped up and eyes raised, then settles while the mark stays.',
  duration: 1600,
  loop: false,
  still: ['exclaim'],
  tracks: [
    stepTrack('rig', [{ at: 0 }, { at: 0.06, y: 1 }, { at: 0.12, y: -3 }, { at: 0.2, x: -1, y: -3 }, { at: 0.26, x: 1, y: -3 }, { at: 0.32, y: -3 }, { at: 0.7, y: -1 }, { at: 0.78 }, { at: 1 }]),
    stepTrack('shadow', [{ at: 0 }, { at: 0.12, scale: 0.8, opacity: 0.7 }, { at: 0.7, scale: 0.94 }, { at: 0.78 }, { at: 1 }]),
    stepTrack('podLeft', [{ at: 0 }, { at: 0.06, rotate: -10 }, { at: 0.12, rotate: 45 }, { at: 0.7, rotate: 20 }, { at: 0.78 }, { at: 1 }]),
    stepTrack('podRight', [{ at: 0 }, { at: 0.06, rotate: 10 }, { at: 0.12, rotate: -45 }, { at: 0.7, rotate: -20 }, { at: 0.78 }, { at: 1 }]),
    stepTrack('eyes', [{ at: 0 }, { at: 0.12, y: -1 }, { at: 0.4, x: -2, y: -1 }, { at: 0.52, x: 2, y: -1 }, { at: 0.64, y: -1 }, { at: 0.78 }, { at: 1 }]),
    stepTrack('exclaim', [{ at: 0 }, { at: 0.06, y: 2 }, { at: 0.12, y: -2 }, { at: 0.18 }, { at: 0.5, y: -1 }, { at: 0.56 }, { at: 1 }]),
  ],
};

export { SENTRI_ALERT_EXCLAIM };
