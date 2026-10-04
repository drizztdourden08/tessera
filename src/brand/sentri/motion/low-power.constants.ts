/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { stepTrack } from '../step-track';

const SENTRI_LOW_POWER: MascotAnimation = {
  name: 'Low power',
  summary: 'Running out of charge: a nearly empty battery hangs above with its last red bar blinking, the eyes droop half shut, the pods hang down and Sentri sags slowly.',
  duration: 4000,
  loop: true,
  still: ['battery', 'batteryCell', 'tired'],
  tracks: [
    stepTrack('batteryCell', [{ at: 0 }, { at: 0.5, opacity: 0 }, { at: 0.62 }, { at: 1 }]),
    stepTrack('rig', [{ at: 0, y: 1 }, { at: 0.5, y: 2 }, { at: 1, y: 1 }]),
    stepTrack('shadow', [{ at: 0, scaleX: 1.04 }, { at: 1, scaleX: 1.04 }]),
    stepTrack('podLeft', [{ at: 0, rotate: -22 }, { at: 0.5, rotate: -28 }, { at: 1, rotate: -22 }]),
    stepTrack('podRight', [{ at: 0, rotate: 22 }, { at: 0.5, rotate: 28 }, { at: 1, rotate: 22 }]),
  ],
};

export { SENTRI_LOW_POWER };
