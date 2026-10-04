/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_WORKING: MascotAnimation = {
  name: 'Working',
  summary: 'Busy at a laptop: sits behind it with its eyes on the screen, tapping the keys with quick pod strokes and bobbing a pixel as it types.',
  duration: 1200,
  loop: true,
  still: ['laptop'],
  tracks: [
    stepTrack('rig', [{ at: 0 }, { at: 0.25, y: 1 }, { at: 0.5 }, { at: 0.62, y: 1 }, { at: 0.75 }, { at: 1 }]),
    stepTrack('eyes', [{ at: 0, x: -2, y: 1 }, { at: 0.5, x: -1, y: 1 }, { at: 0.75, x: -2, y: 1 }, { at: 1, x: -2, y: 1 }]),
    stepTrack('podLeft', [{ at: 0, rotate: -8 }, { at: 0.12, rotate: 8 }, { at: 0.25, rotate: -8 }, { at: 0.5, rotate: 8 }, { at: 0.62, rotate: -8 }, { at: 1, rotate: -8 }]),
    stepTrack('podRight', [{ at: 0, rotate: 12 }, { at: 0.12 }, { at: 0.37, rotate: 12 }, { at: 0.5 }, { at: 0.75, rotate: 12 }, { at: 0.87 }, { at: 1, rotate: 12 }]),
  ],
};

export { SENTRI_WORKING };
