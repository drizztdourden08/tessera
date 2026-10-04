/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_JUMP_HOP: MascotAnimation = {
  name: 'Hop',
  summary: 'A pixel hop: crouches a pixel, springs nine pixels up with lift lines under it, tips forward on the way down and lands with sparkles twinkling at its sides.',
  duration: 1500,
  loop: false,
  tracks: [
    stepTrack('rig', [{ at: 0 }, { at: 0.1, y: 1 }, { at: 0.2, y: -5 }, { at: 0.32, y: -9 }, { at: 0.46, y: -5, rotate: 8 }, { at: 0.58 }, { at: 1 }]),
    stepTrack('shadow', [{ at: 0 }, { at: 0.1, scaleX: 1.1 }, { at: 0.2, scale: 0.7, opacity: 0.7 }, { at: 0.32, scale: 0.5, opacity: 0.4 }, { at: 0.46, scale: 0.7, opacity: 0.7 }, { at: 0.58 }, { at: 1 }]),
    stepTrack('podLeft', [{ at: 0 }, { at: 0.1, rotate: -16 }, { at: 0.2, rotate: 30 }, { at: 0.32, rotate: 40 }, { at: 0.46, rotate: 24 }, { at: 0.58, rotate: -12 }, { at: 0.7 }, { at: 1 }]),
    stepTrack('podRight', [{ at: 0 }, { at: 0.1, rotate: 16 }, { at: 0.2, rotate: -30 }, { at: 0.32, rotate: -40 }, { at: 0.46, rotate: -24 }, { at: 0.58, rotate: 12 }, { at: 0.7 }, { at: 1 }]),
    stepTrack('eyes', [{ at: 0 }, { at: 0.2, y: -1 }, { at: 0.46, x: 1, y: 1 }, { at: 0.58 }, { at: 1 }]),
    stepTrack('lift', [{ at: 0 }, { at: 0.32, opacity: 1 }, { at: 0.46 }, { at: 1 }]),
    stepTrack('landing', [{ at: 0 }, { at: 0.58, opacity: 1 }, { at: 0.7, y: -1, opacity: 1 }, { at: 0.82, y: -2, opacity: 1 }, { at: 0.9 }, { at: 1 }]),
  ],
};

export { SENTRI_JUMP_HOP };
