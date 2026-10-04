/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_HAPPY_GRIN: MascotAnimation = {
  name: 'Grin',
  summary: 'Grins with its eyes turned into little carets, bobbing a pixel up and down while the pods flap high on each bob.',
  duration: 1600,
  loop: true,
  still: ['grin'],
  tracks: [
    stepTrack('rig', [{ at: 0 }, { at: 0.25, y: -1 }, { at: 0.5 }, { at: 0.75, y: -1 }, { at: 1 }]),
    stepTrack('podLeft', [{ at: 0, rotate: 8 }, { at: 0.25, rotate: 26 }, { at: 0.5, rotate: 8 }, { at: 0.75, rotate: 26 }, { at: 1, rotate: 8 }]),
    stepTrack('podRight', [{ at: 0, rotate: -8 }, { at: 0.25, rotate: -26 }, { at: 0.5, rotate: -8 }, { at: 0.75, rotate: -26 }, { at: 1, rotate: -8 }]),
  ],
};

export { SENTRI_HAPPY_GRIN };
