/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_ALERT_EXCLAIM: MascotAnimation = {
  name: 'Alert exclaim',
  summary: 'Spots something: an exclamation mark jumps up over its head and shakes, while the stone stiffens taller and leans back with its hands flared out straight, eyes wide over a small round mouth. It does a double take to the right, snaps back wider still, then relaxes.',
  duration: 1500,
  loop: false,
  still: ['exclaim'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.05, scaleX: 1.06, scaleY: 0.92, ease: EASE.snap },
        { at: 0.12, y: -0.4, rotate: -3, scaleX: 0.96, scaleY: 1.04, ease: EASE.out },
        { at: 0.5, y: -0.4, rotate: -3, scaleX: 0.96, scaleY: 1.035 },
        { at: 0.56, y: -0.3, rotate: 2, scaleX: 0.97, scaleY: 1.03 },
        { at: 0.7, y: -0.3, rotate: 2 },
        { at: 0.82, ease: EASE.out },
        { at: 0.88, scaleX: 1.04, scaleY: 0.96 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.05, scaleX: 1.05, ease: EASE.snap },
        { at: 0.12, scale: 0.9, opacity: 0.85 },
        { at: 0.7, scale: 0.9, opacity: 0.85 },
        { at: 0.82 },
        { at: 0.88, scaleX: 1.04 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0 },
        { at: 0.05, rotate: -6, ease: EASE.snap },
        { at: 0.12, x: -1.5, y: -2, rotate: 35, ease: EASE.overshoot },
        { at: 0.7, x: -1.5, y: -2, rotate: 32 },
        { at: 0.82 },
        { at: 0.9, rotate: 4 },
        { at: 1 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0 },
        { at: 0.05, rotate: 6, ease: EASE.snap },
        { at: 0.12, x: 1.5, y: -2, rotate: -35, ease: EASE.overshoot },
        { at: 0.7, x: 1.5, y: -2, rotate: -32 },
        { at: 0.82 },
        { at: 0.9, rotate: -4 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.04, scaleY: 0.2, ease: EASE.snap },
        { at: 0.12, y: -0.6, scale: 1.35 },
        { at: 0.3, y: -0.6, scale: 1.3, ease: EASE.snap },
        { at: 0.34, x: 2, y: -0.6, scale: 1.3 },
        { at: 0.5, x: 2, y: -0.6, scale: 1.3, ease: EASE.snap },
        { at: 0.54, y: -0.6, scale: 1.4 },
        { at: 0.74, y: -0.6, scale: 1.35 },
        { at: 0.84 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.06, scale: 0.6, ease: EASE.snap },
        { at: 0.12, y: 0.3, scaleX: 0.55, scaleY: 1.7 },
        { at: 0.74, y: 0.3, scaleX: 0.55, scaleY: 1.7 },
        { at: 0.84 },
        { at: 1 },
      ],
    },
    {
      part: 'exclaim',
      frames: [
        { at: 0 },
        { at: 0.06, y: 0.8, scaleY: 0.8, ease: EASE.snap },
        { at: 0.14, y: -0.5, scale: 1.15, ease: EASE.out },
        { at: 0.22, rotate: -8 },
        { at: 0.28, rotate: 8 },
        { at: 0.34, rotate: -4 },
        { at: 0.4 },
        { at: 0.5 },
        { at: 0.56, y: -0.3, scale: 1.1 },
        { at: 0.64 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_ALERT_EXCLAIM };
