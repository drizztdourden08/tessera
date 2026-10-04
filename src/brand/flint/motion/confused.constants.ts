/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_CONFUSED: MascotAnimation = {
  name: 'Confused',
  summary: 'Puzzled: a question mark wobbles over its head while it tips onto one corner and scratches the top of its head with its left hand, eyes squinting up and then across, mouth in a lopsided frown, and gives a little baffled shake.',
  duration: 3000,
  loop: true,
  still: ['question'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: -1.1, rotate: 6 },
        { at: 0.55, y: -1.1, rotate: 6 },
        { at: 0.62, y: -1.6, rotate: 9 },
        { at: 0.7, y: -1, rotate: 5 },
        { at: 0.78, y: -1.4, rotate: 8 },
        { at: 0.86, y: -1.1, rotate: 6 },
        { at: 1, y: -1.1, rotate: 6 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, x: 0.5, scaleX: 0.96 },
        { at: 1, x: 0.5, scaleX: 0.96 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, x: 4.8, y: -15, rotate: 40, ease: EASE.linear },
        { at: 0.08, x: 4.6, y: -14, rotate: 30, ease: EASE.linear },
        { at: 0.16, x: 4.8, y: -15, rotate: 40, ease: EASE.linear },
        { at: 0.24, x: 4.6, y: -14, rotate: 30, ease: EASE.linear },
        { at: 0.32, x: 4.8, y: -15, rotate: 40, ease: EASE.linear },
        { at: 0.4, x: 4.6, y: -14, rotate: 30, ease: EASE.linear },
        { at: 0.48, x: 4.8, y: -15, rotate: 40 },
        { at: 1, x: 4.8, y: -15, rotate: 40 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, y: 0.3, rotate: 8 },
        { at: 1, y: 0.3, rotate: 8 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: -1, y: -0.8, scaleY: 0.7 },
        { at: 0.5, x: -1, y: -0.8, scaleY: 0.7, ease: EASE.snap },
        { at: 0.56, x: 1, y: -0.8, scaleY: 0.7 },
        { at: 0.8, x: 1, y: -0.8, scaleY: 0.7, ease: EASE.snap },
        { at: 0.86, x: -1, y: -0.8, scaleY: 0.7 },
        { at: 1, x: -1, y: -0.8, scaleY: 0.7 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, x: 0.6, rotate: -8, scaleX: 0.7, scaleY: -0.7 },
        { at: 1, x: 0.6, rotate: -8, scaleX: 0.7, scaleY: -0.7 },
      ],
    },
    {
      part: 'question',
      frames: [
        { at: 0, rotate: -10 },
        { at: 0.25, y: -0.4, rotate: 10 },
        { at: 0.5, rotate: -10 },
        { at: 0.75, y: -0.4, rotate: 10 },
        { at: 1, rotate: -10 },
      ],
    },
  ],
};

export { FLINT_CONFUSED };
