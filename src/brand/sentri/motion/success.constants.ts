/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_SUCCESS: MascotAnimation = {
  name: 'Success',
  summary: 'Celebrates a win: squints with joy, hops with both pods thrown high, and a burst of cyan, orange, red and yellow confetti spreads out and falls a pixel at a time.',
  duration: 1800,
  loop: true,
  still: ['grin', 'confettiNear'],
  tracks: [
    stepTrack('rig', [{ at: 0 }, { at: 0.1, y: -3 }, { at: 0.2, y: -5, rotate: -4 }, { at: 0.3, y: -3 }, { at: 0.4 }, { at: 0.55, y: -2, rotate: 4 }, { at: 0.65 }, { at: 1 }]),
    stepTrack('shadow', [{ at: 0 }, { at: 0.1, scale: 0.82 }, { at: 0.2, scale: 0.7, opacity: 0.6 }, { at: 0.3, scale: 0.82 }, { at: 0.4 }, { at: 0.55, scale: 0.88 }, { at: 0.65 }, { at: 1 }]),
    stepTrack('podLeft', [{ at: 0, rotate: 20 }, { at: 0.1, rotate: 44 }, { at: 0.3, rotate: 30 }, { at: 0.4, rotate: 44 }, { at: 0.65, rotate: 30 }, { at: 1, rotate: 20 }]),
    stepTrack('podRight', [{ at: 0, rotate: -20 }, { at: 0.1, rotate: -44 }, { at: 0.3, rotate: -30 }, { at: 0.4, rotate: -44 }, { at: 0.65, rotate: -30 }, { at: 1, rotate: -20 }]),
    stepTrack('confettiNear', [{ at: 0 }, { at: 0.25, opacity: 0 }, { at: 0.85 }, { at: 1 }]),
    stepTrack('confettiFar', [{ at: 0 }, { at: 0.25, opacity: 1 }, { at: 0.45, y: 1, opacity: 1 }, { at: 0.65, y: 2, opacity: 1 }, { at: 0.85 }, { at: 1 }]),
  ],
};

export { SENTRI_SUCCESS };
