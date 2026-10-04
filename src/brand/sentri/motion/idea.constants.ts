/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_IDEA: MascotAnimation = {
  name: 'Idea',
  summary: 'Has an idea: a dark bulb appears above, then lights up yellow with flashing rays as Sentri pops up two pixels with its eyes raised and pods thrown up.',
  duration: 3000,
  loop: true,
  still: ['bulb', 'rays'],
  tracks: [
    stepTrack('bulbOff', [{ at: 0, opacity: 1 }, { at: 0.3 }, { at: 1 }]),
    stepTrack('bulb', [{ at: 0, opacity: 0 }, { at: 0.3 }, { at: 1, opacity: 0 }]),
    stepTrack('rays', [{ at: 0, opacity: 0 }, { at: 0.3 }, { at: 0.4, opacity: 0 }, { at: 0.48 }, { at: 0.56, opacity: 0 }, { at: 0.64 }, { at: 1, opacity: 0 }]),
    stepTrack('rig', [{ at: 0 }, { at: 0.3, y: -2 }, { at: 0.4, y: -1 }, { at: 0.5 }, { at: 1 }]),
    stepTrack('eyes', [{ at: 0, x: 1 }, { at: 0.15, x: -1 }, { at: 0.3, y: -1 }, { at: 0.9 }, { at: 1, x: 1 }]),
    stepTrack('podLeft', [{ at: 0 }, { at: 0.3, rotate: 36 }, { at: 0.4, rotate: 24 }, { at: 0.5, rotate: 10 }, { at: 0.9 }, { at: 1 }]),
    stepTrack('podRight', [{ at: 0 }, { at: 0.3, rotate: -36 }, { at: 0.4, rotate: -24 }, { at: 0.5, rotate: -10 }, { at: 0.9 }, { at: 1 }]),
  ],
};

export { SENTRI_IDEA };
