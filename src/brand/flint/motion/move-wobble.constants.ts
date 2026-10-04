/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_MOVE_WOBBLE: MascotAnimation = {
  name: 'Move wobble',
  summary: 'Waddles along: rocks onto one corner of its base and then the other, with a little hitch up between steps. The hand on the lifted side rises for balance, the eyes look ahead and blink on every other step.',
  duration: 1300,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, x: -0.5, y: -1.1, rotate: -6, scaleX: 1.02, scaleY: 0.98 },
        { at: 0.25, y: -0.9, scaleX: 0.98, scaleY: 1.03 },
        { at: 0.5, x: 0.5, y: -1.1, rotate: 6, scaleX: 1.02, scaleY: 0.98 },
        { at: 0.75, y: -0.9, scaleX: 0.98, scaleY: 1.03 },
        { at: 1, x: -0.5, y: -1.1, rotate: -6, scaleX: 1.02, scaleY: 0.98 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, x: -0.8, scaleX: 0.95 },
        { at: 0.25, scale: 0.92, opacity: 0.85 },
        { at: 0.5, x: 0.8, scaleX: 0.95 },
        { at: 0.75, scale: 0.92, opacity: 0.85 },
        { at: 1, x: -0.8, scaleX: 0.95 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, y: 0.6, rotate: -10 },
        { at: 0.5, y: -1, rotate: 22 },
        { at: 1, y: 0.6, rotate: -10 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, y: -1, rotate: -22 },
        { at: 0.5, y: 0.6, rotate: 10 },
        { at: 1, y: -1, rotate: -22 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: 1.5 },
        { at: 0.4, x: 1.5, ease: EASE.in },
        { at: 0.43, x: 1.5, scaleY: 0.1, ease: EASE.out },
        { at: 0.46, x: 1.5 },
        { at: 1, x: 1.5 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, x: 0.7, scaleX: 0.9 },
        { at: 0.5, x: 0.7, scaleX: 1.1 },
        { at: 1, x: 0.7, scaleX: 0.9 },
      ],
    },
  ],
};

export { FLINT_MOVE_WOBBLE };
