/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_SCAN: MascotAnimation = {
  name: 'Look around',
  summary: 'Scans the room: the eyes dart left, blink across to the right, then peek up. The body turns a moment after the eyes and the pods swing behind it.',
  duration: 4000,
  loop: true,
  tracks: [
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.08, ease: EASE.snap },
        { at: 0.12, x: -2 },
        { at: 0.35, x: -2, ease: EASE.in },
        { at: 0.37, scaleY: 0.15, ease: EASE.out },
        { at: 0.4, x: 2 },
        { at: 0.6, x: 2, ease: EASE.snap },
        { at: 0.64, x: 1, y: -1 },
        { at: 0.8, x: 1, y: -1, ease: EASE.snap },
        { at: 0.85 },
        { at: 1 },
      ],
    },
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.1, ease: EASE.out },
        { at: 0.18, x: -0.5, rotate: -3 },
        { at: 0.36, x: -0.5, rotate: -3, ease: EASE.out },
        { at: 0.46, x: 0.5, rotate: 3 },
        { at: 0.62, x: 0.5, rotate: 3, ease: EASE.out },
        { at: 0.7, x: 0.3, y: -0.5, rotate: 1, scaleY: 1.02 },
        { at: 0.82, x: 0.3, y: -0.5, rotate: 1, scaleY: 1.02 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.1, ease: EASE.out },
        { at: 0.18, x: -0.5 },
        { at: 0.36, x: -0.5, ease: EASE.out },
        { at: 0.46, x: 0.5 },
        { at: 0.62, x: 0.5, ease: EASE.out },
        { at: 0.7, x: 0.3, scale: 0.95 },
        { at: 0.82, x: 0.3, scale: 0.95 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0 },
        { at: 0.12 },
        { at: 0.22, rotate: 7 },
        { at: 0.38, rotate: 5 },
        { at: 0.5, rotate: -7 },
        { at: 0.64, rotate: -5 },
        { at: 0.74, rotate: 4 },
        { at: 0.84, rotate: 3 },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0 },
        { at: 0.13 },
        { at: 0.23, rotate: 8 },
        { at: 0.39, rotate: 5 },
        { at: 0.51, rotate: -8 },
        { at: 0.65, rotate: -5 },
        { at: 0.75, rotate: -3 },
        { at: 0.85, rotate: -4 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_SCAN };
