/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_IDLE: MascotAnimation = {
  name: 'Idle',
  summary: 'Sits and breathes: the stone swells a little taller, then settles back onto its flat base. The hands bob a beat behind, the eyes glance right, blink twice, then glance left, and the smile follows them.',
  duration: 6400,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, scaleX: 1.012, scaleY: 0.985 },
        { at: 0.25, scaleX: 0.99, scaleY: 1.022 },
        { at: 0.5, scaleX: 1.012, scaleY: 0.985 },
        { at: 0.75, scaleX: 0.99, scaleY: 1.022 },
        { at: 1, scaleX: 1.012, scaleY: 0.985 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.02 },
        { at: 0.25, scaleX: 0.98 },
        { at: 0.5, scaleX: 1.02 },
        { at: 0.75, scaleX: 0.98 },
        { at: 1, scaleX: 1.02 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, y: 0.3, rotate: 2 },
        { at: 0.3, y: -0.6, rotate: -3 },
        { at: 0.55, y: 0.3, rotate: 2 },
        { at: 0.8, y: -0.6, rotate: -3 },
        { at: 1, y: 0.3, rotate: 2 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, y: -0.2, rotate: 1 },
        { at: 0.08, y: 0.3, rotate: -2 },
        { at: 0.34, y: -0.6, rotate: 3 },
        { at: 0.59, y: 0.3, rotate: -2 },
        { at: 0.84, y: -0.6, rotate: 3 },
        { at: 1, y: -0.2, rotate: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.16, ease: EASE.snap },
        { at: 0.19, x: 2 },
        { at: 0.36, x: 2, ease: EASE.snap },
        { at: 0.39 },
        { at: 0.56, ease: EASE.in },
        { at: 0.575, scaleY: 0.1, ease: EASE.out },
        { at: 0.6, ease: EASE.in },
        { at: 0.615, scaleY: 0.1, ease: EASE.out },
        { at: 0.64 },
        { at: 0.78, ease: EASE.snap },
        { at: 0.81, x: -2 },
        { at: 0.94, x: -2, ease: EASE.snap },
        { at: 0.97 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.17, ease: EASE.snap },
        { at: 0.21, x: 1 },
        { at: 0.36, x: 1, ease: EASE.snap },
        { at: 0.41 },
        { at: 0.79, ease: EASE.snap },
        { at: 0.83, x: -1 },
        { at: 0.94, x: -1, ease: EASE.snap },
        { at: 0.98 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_IDLE };
