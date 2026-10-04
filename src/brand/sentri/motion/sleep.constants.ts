/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const SENTRI_SLEEP: MascotAnimation = {
  name: 'Sleep',
  summary: 'Dozes: eyes closed, it sinks with each slow breath, pods hanging low, while a small z, a middle z and a big Z fade in one after another, drift up and fade away.',
  duration: 3600,
  loop: true,
  still: ['closed', 'zSmall', 'zMid', 'zBig'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.5, y: 1, scaleX: 1.02, scaleY: 0.97 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.5, scaleX: 1.05 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: -10 },
        { at: 0.5, rotate: -15 },
        { at: 1, rotate: -10 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: 10 },
        { at: 0.5, rotate: 15 },
        { at: 1, rotate: 10 },
      ],
    },
    {
      part: 'zSmall',
      frames: [
        { at: 0, y: 1, opacity: 0 },
        { at: 0.1 },
        { at: 0.6, y: -2 },
        { at: 0.74, y: -3, opacity: 0 },
        { at: 1, y: 1, opacity: 0 },
      ],
    },
    {
      part: 'zMid',
      frames: [
        { at: 0, opacity: 0 },
        { at: 0.22, y: 1, opacity: 0 },
        { at: 0.32 },
        { at: 0.78, y: -2 },
        { at: 0.9, y: -3, opacity: 0 },
        { at: 1, opacity: 0 },
      ],
    },
    {
      part: 'zBig',
      frames: [
        { at: 0, opacity: 0 },
        { at: 0.42, y: 1, opacity: 0 },
        { at: 0.52 },
        { at: 0.86, y: -1.5 },
        { at: 0.98, y: -2.5, opacity: 0 },
        { at: 1, opacity: 0 },
      ],
    },
  ],
};

export { SENTRI_SLEEP };
