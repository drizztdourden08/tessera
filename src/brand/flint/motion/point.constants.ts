/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_POINT: MascotAnimation = {
  name: 'Point',
  summary: 'Shows the way: leans right, raises the right hand to eye height and jabs it twice towards something beside it, looking where it points, then lowers it.',
  duration: 2200,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.14, y: -0.8, rotate: 3, ease: EASE.out },
        { at: 0.8, y: -0.8, rotate: 3 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.14, x: 0.5, scaleX: 0.97 },
        { at: 0.8, x: 0.5, scaleX: 0.97 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0 },
        { at: 0.14, x: 2, y: -6, rotate: -10, ease: EASE.overshoot },
        { at: 0.3, x: 2, y: -6, rotate: -10, ease: EASE.snap },
        { at: 0.36, x: 4, y: -6, rotate: -10, ease: EASE.out },
        { at: 0.44, x: 2, y: -6, rotate: -10, ease: EASE.snap },
        { at: 0.5, x: 4, y: -6, rotate: -10, ease: EASE.out },
        { at: 0.58, x: 2, y: -6, rotate: -10 },
        { at: 0.8, x: 2, y: -6, rotate: -10, ease: EASE.in },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0 },
        { at: 0.14, rotate: -8 },
        { at: 0.8, rotate: -8 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.1, x: 2 },
        { at: 0.6, x: 2, ease: EASE.in },
        { at: 0.62, x: 2, scaleY: 0.15, ease: EASE.out },
        { at: 0.64, x: 2 },
        { at: 0.8, x: 2 },
        { at: 0.88 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.12, x: 1 },
        { at: 0.8, x: 1 },
        { at: 0.88 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_POINT };
