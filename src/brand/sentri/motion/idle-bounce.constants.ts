/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_IDLE_BOUNCE: MascotAnimation = {
  name: 'Bounce',
  summary: 'Bounces on the spot in whole pixel steps: tips as it pushes off, floats up three pixels with the pods flapping, and drops back with two little bounce lines.',
  duration: 1200,
  loop: true,
  tracks: [
    stepTrack('rig', [{ at: 0, rotate: -4 }, { at: 0.17, y: -2 }, { at: 0.33, y: -3 }, { at: 0.5, y: -3 }, { at: 0.67, y: -1 }, { at: 0.83 }, { at: 1, rotate: -4 }]),
    stepTrack('shadow', [{ at: 0 }, { at: 0.17, scale: 0.9 }, { at: 0.33, scale: 0.84 }, { at: 0.67, scale: 0.94 }, { at: 0.83 }, { at: 1 }]),
    stepTrack('podLeft', [{ at: 0, rotate: -10 }, { at: 0.17, rotate: 12 }, { at: 0.33, rotate: 22 }, { at: 0.5, rotate: 12 }, { at: 0.67 }, { at: 0.83, rotate: -6 }, { at: 1, rotate: -10 }]),
    stepTrack('podRight', [{ at: 0, rotate: 6 }, { at: 0.17, rotate: -12 }, { at: 0.33, rotate: -22 }, { at: 0.5, rotate: -12 }, { at: 0.67 }, { at: 0.83, rotate: 10 }, { at: 1, rotate: 6 }]),
    stepTrack('dust', [{ at: 0, opacity: 1 }, { at: 0.17 }, { at: 0.67, x: 3, y: 1, opacity: 1 }, { at: 0.83 }, { at: 1, opacity: 1 }]),
  ],
};

export { SENTRI_IDLE_BOUNCE };
