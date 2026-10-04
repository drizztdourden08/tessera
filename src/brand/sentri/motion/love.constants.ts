/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_LOVE: MascotAnimation = {
  name: 'Love',
  summary: 'Smitten: a pink heart floats above the tip and beats a pixel up and down while Sentri bobs and flutters its pods.',
  duration: 1600,
  loop: true,
  still: ['heart'],
  tracks: [
    stepTrack('heart', [{ at: 0 }, { at: 0.12, y: -1 }, { at: 0.25 }, { at: 0.37, y: -1 }, { at: 0.5 }, { at: 1 }]),
    stepTrack('rig', [{ at: 0 }, { at: 0.5, y: -1 }, { at: 1 }]),
    stepTrack('podLeft', [{ at: 0, rotate: 4 }, { at: 0.25, rotate: 14 }, { at: 0.5, rotate: 4 }, { at: 0.75, rotate: 14 }, { at: 1, rotate: 4 }]),
    stepTrack('podRight', [{ at: 0, rotate: -14 }, { at: 0.25, rotate: -4 }, { at: 0.5, rotate: -14 }, { at: 0.75, rotate: -4 }, { at: 1, rotate: -14 }]),
  ],
};

export { SENTRI_LOVE };
