/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_SCAN: MascotAnimation = {
  name: 'Look around',
  summary: 'Looks around the room: the eyes dart left, blink across to the right, then peek up, with the smile trailing them. The stone rocks on its base after the eyes and the hands sway behind it.',
  duration: 4200,
  loop: true,
  tracks: [
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.07, ease: EASE.snap },
        { at: 0.11, x: -2 },
        { at: 0.34, x: -2, ease: EASE.in },
        { at: 0.365, x: -0.5, scaleY: 0.12, ease: EASE.out },
        { at: 0.39, x: 2 },
        { at: 0.6, x: 2, ease: EASE.snap },
        { at: 0.63, x: 1, y: -1 },
        { at: 0.81, x: 1, y: -1, ease: EASE.snap },
        { at: 0.86 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.08, ease: EASE.snap },
        { at: 0.13, x: -1 },
        { at: 0.35, x: -1 },
        { at: 0.41, x: 1 },
        { at: 0.6, x: 1, ease: EASE.snap },
        { at: 0.65, x: 0.5, y: -0.4 },
        { at: 0.81, x: 0.5, y: -0.4, ease: EASE.snap },
        { at: 0.87 },
        { at: 1 },
      ],
    },
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.1, ease: EASE.out },
        { at: 0.18, y: -0.5, rotate: -2 },
        { at: 0.36, y: -0.5, rotate: -2, ease: EASE.out },
        { at: 0.46, y: -0.5, rotate: 2 },
        { at: 0.62, y: -0.5, rotate: 2, ease: EASE.out },
        { at: 0.7, scaleX: 0.99, scaleY: 1.02 },
        { at: 0.82, scaleX: 0.99, scaleY: 1.02 },
        { at: 0.89 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.09, ease: EASE.out },
        { at: 0.18, x: -0.4 },
        { at: 0.36, x: -0.4, ease: EASE.out },
        { at: 0.46, x: 0.4 },
        { at: 0.62, x: 0.4, ease: EASE.out },
        { at: 0.7, scaleX: 0.98 },
        { at: 0.82, scaleX: 0.98 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0 },
        { at: 0.12 },
        { at: 0.22, rotate: 10 },
        { at: 0.38, rotate: 6 },
        { at: 0.5, rotate: -8 },
        { at: 0.64, rotate: -5 },
        { at: 0.74, rotate: 4 },
        { at: 0.86, rotate: 2 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0 },
        { at: 0.13 },
        { at: 0.23, rotate: 9 },
        { at: 0.39, rotate: 5 },
        { at: 0.51, rotate: -9 },
        { at: 0.65, rotate: -6 },
        { at: 0.75, rotate: -4 },
        { at: 0.87, rotate: -2 },
        { at: 0.96 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_SCAN };
