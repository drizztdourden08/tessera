/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_WORRIED: MascotAnimation = {
  name: 'Worried',
  summary: 'Nervous: sweat drops run down both sides of its head, it jitters a pixel left and right and its eyes dart about, pods held in tight.',
  duration: 1600,
  loop: true,
  still: ['sweatLeft', 'sweatRight'],
  tracks: [
    stepTrack('sweatLeft', [{ at: 0 }, { at: 0.25, y: 1 }, { at: 0.5, y: 2 }, { at: 0.75, opacity: 0 }, { at: 1 }]),
    stepTrack('sweatRight', [{ at: 0, y: 1 }, { at: 0.25, y: 2 }, { at: 0.5, opacity: 0 }, { at: 0.75 }, { at: 1, y: 1 }]),
    stepTrack('rig', [{ at: 0 }, { at: 0.1, x: 1 }, { at: 0.2 }, { at: 0.6, x: -1 }, { at: 0.7 }, { at: 1 }]),
    stepTrack('eyes', [{ at: 0, y: -1 }, { at: 0.3, x: -1, y: -1 }, { at: 0.55, x: 1, y: -1 }, { at: 0.8, y: -1 }, { at: 1, y: -1 }]),
    stepTrack('podLeft', [{ at: 0, rotate: -16 }, { at: 1, rotate: -16 }]),
    stepTrack('podRight', [{ at: 0, rotate: 16 }, { at: 1, rotate: 16 }]),
  ],
};

export { SENTRI_WORRIED };
