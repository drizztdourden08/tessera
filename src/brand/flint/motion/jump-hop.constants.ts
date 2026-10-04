/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_JUMP_HOP: MascotAnimation = {
  name: 'Jump hop',
  summary: 'Hops over and back: a quick crouch, a short hop to the right tipping forward, a squashed landing, then a hop back home tipping the other way. The hands fling up in the air and tuck on landing, and the eyes look where it is going over a delighted open smile.',
  duration: 1800,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.12, scaleY: 0.86, ease: EASE.out },
        { at: 0.22, x: 1.5, y: -6, rotate: 8, scaleX: 0.95, scaleY: 1.06, ease: EASE.fall },
        { at: 0.36, x: 3, scaleX: 0.97, scaleY: 1.03, ease: EASE.linear },
        { at: 0.42, x: 3, scaleX: 1.14, scaleY: 0.85, ease: EASE.out },
        { at: 0.56, x: 1.5, y: -5, rotate: -8, scaleX: 0.95, scaleY: 1.06, ease: EASE.fall },
        { at: 0.7, scaleX: 0.97, scaleY: 1.03, ease: EASE.linear },
        { at: 0.76, scaleX: 1.12, scaleY: 0.87, ease: EASE.out },
        { at: 0.84, scaleX: 0.97, scaleY: 1.03 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.1, ease: EASE.out },
        { at: 0.22, x: 1.5, scale: 0.7, opacity: 0.6, ease: EASE.fall },
        { at: 0.36, x: 3, ease: EASE.linear },
        { at: 0.42, x: 3, scaleX: 1.12, ease: EASE.out },
        { at: 0.56, x: 1.5, scale: 0.74, opacity: 0.62, ease: EASE.fall },
        { at: 0.7, ease: EASE.linear },
        { at: 0.76, scaleX: 1.1, ease: EASE.out },
        { at: 0.84 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0 },
        { at: 0.08, y: 1, rotate: -15 },
        { at: 0.22, y: -1, rotate: 30 },
        { at: 0.36, rotate: 10 },
        { at: 0.42, y: 1, rotate: -20 },
        { at: 0.56, y: -1, rotate: 32 },
        { at: 0.7, rotate: 10 },
        { at: 0.76, y: 1, rotate: -18 },
        { at: 0.86, rotate: 6 },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0 },
        { at: 0.08, y: 1, rotate: 14 },
        { at: 0.22, y: -1.2, rotate: -34 },
        { at: 0.36, rotate: -9 },
        { at: 0.42, y: 1, rotate: 21 },
        { at: 0.56, y: -1, rotate: -28 },
        { at: 0.7, rotate: -11 },
        { at: 0.76, y: 1, rotate: 17 },
        { at: 0.86, rotate: -5 },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.08, scaleY: 0.4 },
        { at: 0.2, x: 2 },
        { at: 0.4, x: 2 },
        { at: 0.44, x: 2, scaleY: 0.4 },
        { at: 0.5, x: -2 },
        { at: 0.7, x: -2 },
        { at: 0.76, scaleY: 0.4 },
        { at: 0.86 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 0.85 },
        { at: 0.2, x: 1, y: -0.2, scale: 1.3 },
        { at: 0.4, x: 1, scaleX: 1.1 },
        { at: 0.54, x: -1, y: -0.2, scale: 1.3 },
        { at: 0.72, x: -1 },
        { at: 0.8, scaleX: 1.2, scaleY: 0.8 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_JUMP_HOP };
