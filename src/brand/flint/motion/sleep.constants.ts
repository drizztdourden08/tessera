/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const FLINT_SLEEP: MascotAnimation = {
  name: 'Sleep',
  summary: 'Fast asleep: eyes shut, mouth a small round o, hands drooping, its chip gone dim. It breathes slow and deep, swelling as it breathes in and slumping as it breathes out, the chip warming a little with each breath, while three z float up one after another.',
  duration: 4400,
  loop: true,
  still: ['eyesShut', 'chipDim', 'zSmall', 'zMid', 'zBig'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, rotate: 1, scaleX: 1.03, scaleY: 0.955 },
        { at: 0.45, scaleX: 0.995, scaleY: 1 },
        { at: 1, rotate: 1, scaleX: 1.03, scaleY: 0.955 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.03 },
        { at: 0.45, scaleX: 0.99 },
        { at: 1, scaleX: 1.03 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, y: 0.8, rotate: -9 },
        { at: 0.45, y: 0.4, rotate: -6 },
        { at: 1, y: 0.8, rotate: -9 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, y: 0.8, rotate: 9 },
        { at: 0.47, y: 0.4, rotate: 6 },
        { at: 1, y: 0.8, rotate: 9 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, scaleX: 0.55, scaleY: 0.8 },
        { at: 0.45, scaleX: 0.6, scaleY: 1.1 },
        { at: 1, scaleX: 0.55, scaleY: 0.8 },
      ],
    },
    {
      part: 'chipDim',
      frames: [
        { at: 0, opacity: 1 },
        { at: 0.45, opacity: 0.7 },
        { at: 1, opacity: 1 },
      ],
    },
    {
      part: 'zSmall',
      frames: [
        { at: 0, y: 1.2, scale: 0.6, opacity: 0 },
        { at: 0.12, opacity: 1 },
        { at: 0.5, x: 0.3, y: -0.6, opacity: 1 },
        { at: 0.68, x: 0.6, y: -1.4, opacity: 0 },
        { at: 1, y: 1.2, scale: 0.6, opacity: 0 },
      ],
    },
    {
      part: 'zMid',
      frames: [
        { at: 0, opacity: 0 },
        { at: 0.18, y: 1.2, scale: 0.6, opacity: 0 },
        { at: 0.32, opacity: 1 },
        { at: 0.72, x: 0.3, y: -0.6, opacity: 1 },
        { at: 0.9, x: 0.6, y: -1.4, opacity: 0 },
        { at: 1, opacity: 0 },
      ],
    },
    {
      part: 'zBig',
      frames: [
        { at: 0, x: 0.2, y: -0.4, opacity: 1 },
        { at: 0.14, x: 0.6, y: -1.4, opacity: 0 },
        { at: 0.36, y: 1.2, scale: 0.6, opacity: 0 },
        { at: 0.5, opacity: 1 },
        { at: 1, x: 0.2, y: -0.4, opacity: 1 },
      ],
    },
  ],
};

export { FLINT_SLEEP };
