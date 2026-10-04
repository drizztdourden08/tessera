/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const SENTRI_RESTING: MascotAnimation = {
  name: 'Resting',
  summary: 'Lies flat: squashed low and wide with its eyes shut and pods spread on the floor, it breathes slowly while a z, a z and a Z drift up from its tip.',
  duration: 4000,
  loop: true,
  still: ['closed', 'zSmall', 'zMid', 'zBig'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, scaleX: 1.2, scaleY: 0.6 },
        { at: 0.5, scaleX: 1.18, scaleY: 0.65 },
        { at: 1, scaleX: 1.2, scaleY: 0.6 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.25 },
        { at: 0.5, scaleX: 1.22 },
        { at: 1, scaleX: 1.25 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, x: -3, y: 3, rotate: -24 },
        { at: 0.5, x: -3, y: 3, rotate: -21 },
        { at: 1, x: -3, y: 3, rotate: -24 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, x: 3, y: 3, rotate: 24 },
        { at: 0.5, x: 3, y: 3, rotate: 21 },
        { at: 1, x: 3, y: 3, rotate: 24 },
      ],
    },
    {
      part: 'zSmall',
      frames: [
        { at: 0, x: -3, y: 8, opacity: 0 },
        { at: 0.12, x: -3, y: 7 },
        { at: 0.6, x: -3, y: 5 },
        { at: 0.74, x: -3, y: 4, opacity: 0 },
        { at: 1, x: -3, y: 8, opacity: 0 },
      ],
    },
    {
      part: 'zMid',
      frames: [
        { at: 0, opacity: 0 },
        { at: 0.26, x: -3, y: 8, opacity: 0 },
        { at: 0.38, x: -3, y: 7 },
        { at: 0.8, x: -3, y: 5 },
        { at: 0.92, x: -3, y: 4, opacity: 0 },
        { at: 1, opacity: 0 },
      ],
    },
    {
      part: 'zBig',
      frames: [
        { at: 0, opacity: 0 },
        { at: 0.46, x: -3, y: 8, opacity: 0 },
        { at: 0.58, x: -3, y: 7 },
        { at: 0.88, x: -3, y: 5.5 },
        { at: 0.98, x: -3, y: 4.5, opacity: 0 },
        { at: 1, opacity: 0 },
      ],
    },
  ],
};

export { SENTRI_RESTING };
