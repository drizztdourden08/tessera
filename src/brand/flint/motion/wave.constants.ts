/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_WAVE: MascotAnimation = {
  name: 'Wave',
  summary: 'Says hello: tips onto one edge of its base, lifts the right hand over its head and waves it three times with a happy squint and a wide smile, then drops it with a swing.',
  duration: 2400,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.12, y: -1, rotate: -4, ease: EASE.out },
        { at: 0.32, y: -1.3, rotate: -5 },
        { at: 0.52, y: -1, rotate: -4 },
        { at: 0.72, y: -1.3, rotate: -5 },
        { at: 0.85, y: -1, rotate: -4 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.12, x: -0.6, scaleX: 0.96 },
        { at: 0.85, x: -0.6, scaleX: 0.96 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0 },
        { at: 0.14, x: 1, y: -11, rotate: -30, ease: EASE.overshoot },
        { at: 0.24, x: 1, y: -11, rotate: 12 },
        { at: 0.34, x: 1, y: -11, rotate: -30 },
        { at: 0.44, x: 1, y: -11, rotate: 12 },
        { at: 0.54, x: 1, y: -11, rotate: -30 },
        { at: 0.64, x: 1, y: -11, rotate: 12 },
        { at: 0.74, x: 1, y: -11, rotate: -20 },
        { at: 0.86, x: 0.5, y: 1, rotate: 15, ease: EASE.overshoot },
        { at: 0.96 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0 },
        { at: 0.13, y: 0.5, rotate: -7 },
        { at: 0.86, y: 0.5, rotate: -7 },
        { at: 0.96 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.1, x: 1.5 },
        { at: 0.16, x: 1.5, scaleY: 0.4 },
        { at: 0.82, x: 1.5, scaleY: 0.4 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.16, x: 0.7, scale: 1.25 },
        { at: 0.82, x: 0.7, scale: 1.25 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_WAVE };
