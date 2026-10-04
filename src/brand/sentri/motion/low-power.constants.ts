/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const SENTRI_LOW_POWER: MascotAnimation = {
  name: 'Low power',
  summary: 'Running out of charge: a nearly empty battery hangs above with its last red bar pulsing, the eyes droop half shut, the pods hang down and Sentri sags slowly.',
  duration: 4000,
  loop: true,
  still: ['battery', 'batteryCell', 'tired'],
  tracks: [
    {
      part: 'batteryCell',
      frames: [
        { at: 0 },
        { at: 0.36 },
        { at: 0.48, opacity: 0.1 },
        { at: 0.6 },
        { at: 1 },
      ],
    },
    {
      part: 'rig',
      frames: [
        { at: 0, y: 1, scaleY: 0.98 },
        { at: 0.5, y: 2, rotate: 1.5, scaleX: 1.02, scaleY: 0.96 },
        { at: 1, y: 1, scaleY: 0.98 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.04 },
        { at: 0.5, scaleX: 1.07 },
        { at: 1, scaleX: 1.04 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: -22 },
        { at: 0.5, rotate: -29 },
        { at: 1, rotate: -22 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: 22 },
        { at: 0.52, rotate: 29 },
        { at: 1, rotate: 22 },
      ],
    },
  ],
};

export { SENTRI_LOW_POWER };
