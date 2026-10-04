/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_HAPPY: MascotAnimation = {
  name: 'Happy',
  summary: 'A little celebration: two quick hops that tip one way then the other, both hands up and flapping, eyes squeezed over a wide open smile.',
  duration: 1600,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.1, scaleX: 1.12, scaleY: 0.87, ease: EASE.out },
        { at: 0.24, y: -4.5, rotate: -6, scaleX: 0.95, scaleY: 1.06, ease: EASE.fall },
        { at: 0.38, scaleX: 1.14, scaleY: 0.85, ease: EASE.out },
        { at: 0.52, y: -4.5, rotate: 6, scaleX: 0.95, scaleY: 1.06, ease: EASE.fall },
        { at: 0.66, scaleX: 1.14, scaleY: 0.85, ease: EASE.out },
        { at: 0.76, scaleX: 0.96, scaleY: 1.05 },
        { at: 0.86 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.1, scaleX: 1.1, ease: EASE.out },
        { at: 0.24, scale: 0.72, opacity: 0.6, ease: EASE.fall },
        { at: 0.38, scaleX: 1.12, ease: EASE.out },
        { at: 0.52, scale: 0.72, opacity: 0.6, ease: EASE.fall },
        { at: 0.66, scaleX: 1.12, ease: EASE.out },
        { at: 0.76 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0 },
        { at: 0.1, rotate: -12, ease: EASE.out },
        { at: 0.17, y: -1, rotate: 60 },
        { at: 0.24, y: -1, rotate: 40 },
        { at: 0.31, y: -1, rotate: 65 },
        { at: 0.38, rotate: 25, ease: EASE.out },
        { at: 0.45, y: -1, rotate: 65 },
        { at: 0.52, y: -1, rotate: 40 },
        { at: 0.59, y: -1, rotate: 65 },
        { at: 0.66, rotate: 20, ease: EASE.out },
        { at: 0.76, rotate: -12 },
        { at: 0.86, rotate: 5 },
        { at: 0.93 },
        { at: 1 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0 },
        { at: 0.1, rotate: 12, ease: EASE.out },
        { at: 0.17, y: -1, rotate: -60 },
        { at: 0.24, y: -1, rotate: -40 },
        { at: 0.31, y: -1, rotate: -65 },
        { at: 0.38, rotate: -25, ease: EASE.out },
        { at: 0.45, y: -1, rotate: -65 },
        { at: 0.52, y: -1, rotate: -40 },
        { at: 0.59, y: -1, rotate: -65 },
        { at: 0.66, rotate: -20, ease: EASE.out },
        { at: 0.76, rotate: 12 },
        { at: 0.86, rotate: -5 },
        { at: 0.93 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.07, scaleY: 0.35 },
        { at: 0.86, scaleY: 0.35 },
        { at: 0.93 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.07, scaleX: 1.3, scaleY: 1.6 },
        { at: 0.86, scaleX: 1.3, scaleY: 1.6 },
        { at: 0.93 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_HAPPY };
