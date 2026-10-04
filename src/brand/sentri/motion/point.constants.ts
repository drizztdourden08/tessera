/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_POINT: MascotAnimation = {
  name: 'Point',
  summary: 'Shows the way: tilts right, pushes the right pod out and jabs it twice towards something beside it, the eyes looking where it points, then pulls it back in.',
  duration: 2200,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.14, x: 0.5, y: -1, rotate: 4, ease: EASE.out },
        { at: 0.8, x: 0.5, y: -1, rotate: 4 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.14, x: 0.5, scaleX: 0.95, opacity: 0.9 },
        { at: 0.8, x: 0.5, scaleX: 0.95, opacity: 0.9 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, ease: EASE.overshoot },
        { at: 0.14, x: 2, y: -1, rotate: -18 },
        { at: 0.3, x: 2, y: -1, rotate: -18, ease: EASE.snap },
        { at: 0.36, x: 4, y: -1, rotate: -18, ease: EASE.out },
        { at: 0.44, x: 2, y: -1, rotate: -18, ease: EASE.snap },
        { at: 0.5, x: 4, y: -1, rotate: -18, ease: EASE.out },
        { at: 0.58, x: 2, y: -1, rotate: -18 },
        { at: 0.8, x: 2, y: -1, rotate: -18, ease: EASE.in },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0 },
        { at: 0.14, rotate: -6 },
        { at: 0.8, rotate: -6 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.08, ease: EASE.snap },
        { at: 0.12, x: 2 },
        { at: 0.6, x: 2, ease: EASE.in },
        { at: 0.62, x: 2, scaleY: 0.1, ease: EASE.out },
        { at: 0.64, x: 2 },
        { at: 0.8, x: 2, ease: EASE.snap },
        { at: 0.86 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_POINT };
