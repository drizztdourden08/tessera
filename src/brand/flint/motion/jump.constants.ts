/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_JUMP: MascotAnimation = {
  name: 'Jump',
  summary: 'A heavy hop: squats deep on its base, springs up stretched with its hands flung high, lands with a thud that flattens it, and wobbles back into shape.',
  duration: 1900,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.16, scaleX: 1.18, scaleY: 0.78, ease: EASE.out },
        { at: 0.24, y: -3, scaleX: 0.9, scaleY: 1.14, ease: EASE.rise },
        { at: 0.44, y: -10, scaleX: 0.98, scaleY: 1.03, ease: EASE.fall },
        { at: 0.6, scaleX: 0.92, scaleY: 1.1, ease: EASE.linear },
        { at: 0.63, scaleX: 1.24, scaleY: 0.74, ease: EASE.out },
        { at: 0.72, scaleX: 0.96, scaleY: 1.05 },
        { at: 0.8, scaleX: 1.03, scaleY: 0.97 },
        { at: 0.88 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.16, scaleX: 1.12, ease: EASE.out },
        { at: 0.24, scale: 0.92, opacity: 0.9, ease: EASE.rise },
        { at: 0.44, scale: 0.5, opacity: 0.35, ease: EASE.fall },
        { at: 0.6, scale: 0.96 },
        { at: 0.63, scaleX: 1.2, ease: EASE.out },
        { at: 0.74 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0 },
        { at: 0.16, y: 1.5, rotate: -20, ease: EASE.out },
        { at: 0.26, y: -1.5, rotate: 30 },
        { at: 0.44, y: -2, rotate: 45, ease: EASE.in },
        { at: 0.58, rotate: 20 },
        { at: 0.64, y: 1.5, rotate: -25, ease: EASE.out },
        { at: 0.74, rotate: 8 },
        { at: 0.84, rotate: -3 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0 },
        { at: 0.16, y: 1.5, rotate: 20, ease: EASE.out },
        { at: 0.26, y: -1.5, rotate: -30 },
        { at: 0.44, y: -2, rotate: -45, ease: EASE.in },
        { at: 0.58, rotate: -20 },
        { at: 0.64, y: 1.5, rotate: 25, ease: EASE.out },
        { at: 0.74, rotate: -8 },
        { at: 0.84, rotate: 3 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.12 },
        { at: 0.16, scaleY: 0.3, ease: EASE.out },
        { at: 0.26, y: -1 },
        { at: 0.46, y: -1 },
        { at: 0.6, ease: EASE.out },
        { at: 0.63, scaleY: 0.3 },
        { at: 0.72 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.16, scaleX: 0.8 },
        { at: 0.26, y: -0.3, scaleY: 1.5 },
        { at: 0.5, y: -0.3, scaleY: 1.5 },
        { at: 0.63, scaleX: 1.2, scaleY: 0.6 },
        { at: 0.74 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_JUMP };
