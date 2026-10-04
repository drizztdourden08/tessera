/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const FLINT_RESTING: MascotAnimation = {
  name: 'Resting',
  summary: 'Taking a long rest: settled low and wide on its base with its hands laid flat out on the ground, eyes closed in flat lines and the chip dim, it breathes slowly while two z drift lazily up.',
  duration: 5600,
  loop: true,
  still: ['eyesFlat', 'chipDim', 'zSmall', 'zMid'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, scaleX: 1.08, scaleY: 0.88 },
        { at: 0.5, scaleX: 1.06, scaleY: 0.9 },
        { at: 1, scaleX: 1.08, scaleY: 0.88 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.1 },
        { at: 0.5, scaleX: 1.08 },
        { at: 1, scaleX: 1.1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, x: -1.2, y: 1.6, rotate: -16 },
        { at: 0.5, x: -1.2, y: 1.4, rotate: -14 },
        { at: 1, x: -1.2, y: 1.6, rotate: -16 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, x: 1.2, y: 1.4, rotate: 14 },
        { at: 0.5, x: 1.2, y: 1.6, rotate: 16 },
        { at: 1, x: 1.2, y: 1.4, rotate: 14 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, scaleX: 0.85, scaleY: 0.8 },
        { at: 0.5, scaleX: 0.9, scaleY: 0.9 },
        { at: 1, scaleX: 0.85, scaleY: 0.8 },
      ],
    },
    {
      part: 'chipDim',
      frames: [
        { at: 0, opacity: 1 },
        { at: 0.5, opacity: 0.85 },
        { at: 1, opacity: 1 },
      ],
    },
    {
      part: 'zSmall',
      frames: [
        { at: 0, y: 1, scale: 0.6, opacity: 0 },
        { at: 0.2, opacity: 1 },
        { at: 0.6, x: 0.4, y: -0.8, opacity: 1 },
        { at: 0.8, x: 0.8, y: -1.6, opacity: 0 },
        { at: 1, y: 1, scale: 0.6, opacity: 0 },
      ],
    },
    {
      part: 'zMid',
      frames: [
        { at: 0, x: 0.3, y: -0.5, opacity: 1 },
        { at: 0.2, x: 0.7, y: -1.5, opacity: 0 },
        { at: 0.45, y: 1, scale: 0.6, opacity: 0 },
        { at: 0.65, opacity: 1 },
        { at: 1, x: 0.3, y: -0.5, opacity: 1 },
      ],
    },
  ],
};

export { FLINT_RESTING };
