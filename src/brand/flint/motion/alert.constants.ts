/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_ALERT: MascotAnimation = {
  name: 'Alert',
  summary: 'Startled: flinches, jolts up off its base with both hands thrown up beside its face, eyes wide and its smile flipped into a frown, trembles, darts its eyes left and right, then thumps back down.',
  duration: 1700,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.06, scaleX: 1.08, scaleY: 0.9, ease: EASE.snap },
        { at: 0.14, y: -3.5, scaleX: 0.93, scaleY: 1.1, ease: EASE.out },
        { at: 0.24, y: -2.5, ease: EASE.linear },
        { at: 0.3, x: -0.35, y: -2.5, ease: EASE.linear },
        { at: 0.34, x: 0.35, y: -2.5, ease: EASE.linear },
        { at: 0.38, x: -0.35, y: -2.5, ease: EASE.linear },
        { at: 0.42, x: 0.35, y: -2.5 },
        { at: 0.46, y: -2.5 },
        { at: 0.76, y: -2.5, ease: EASE.fall },
        { at: 0.86, ease: EASE.out },
        { at: 0.9, scaleX: 1.06, scaleY: 0.93 },
        { at: 0.96 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.06, scaleX: 1.06, ease: EASE.snap },
        { at: 0.14, scale: 0.8, opacity: 0.7 },
        { at: 0.76, scale: 0.82, opacity: 0.72 },
        { at: 0.86 },
        { at: 0.9, scaleX: 1.05 },
        { at: 0.96 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0 },
        { at: 0.06, rotate: -10, ease: EASE.snap },
        { at: 0.14, x: 0.5, y: -7, rotate: 25 },
        { at: 0.2, x: 0.5, y: -7, rotate: 21, ease: EASE.linear },
        { at: 0.3, x: 0.5, y: -7, rotate: 23, ease: EASE.linear },
        { at: 0.34, x: 0.5, y: -7, rotate: 19, ease: EASE.linear },
        { at: 0.38, x: 0.5, y: -7, rotate: 23, ease: EASE.linear },
        { at: 0.42, x: 0.5, y: -7, rotate: 20 },
        { at: 0.46, x: 0.5, y: -7, rotate: 21 },
        { at: 0.76, x: 0.5, y: -7, rotate: 21, ease: EASE.overshoot },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0 },
        { at: 0.06, rotate: 10, ease: EASE.snap },
        { at: 0.14, x: -0.5, y: -7, rotate: -25 },
        { at: 0.2, x: -0.5, y: -7, rotate: -21, ease: EASE.linear },
        { at: 0.3, x: -0.5, y: -7, rotate: -23, ease: EASE.linear },
        { at: 0.34, x: -0.5, y: -7, rotate: -19, ease: EASE.linear },
        { at: 0.38, x: -0.5, y: -7, rotate: -23, ease: EASE.linear },
        { at: 0.42, x: -0.5, y: -7, rotate: -20 },
        { at: 0.46, x: -0.5, y: -7, rotate: -21 },
        { at: 0.76, x: -0.5, y: -7, rotate: -21, ease: EASE.overshoot },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.05, scaleY: 0.25, ease: EASE.snap },
        { at: 0.14, y: -1, scale: 1.35 },
        { at: 0.24, scale: 1.2 },
        { at: 0.48, scale: 1.2, ease: EASE.snap },
        { at: 0.51, x: -2, scale: 1.2 },
        { at: 0.6, x: -2, scale: 1.2, ease: EASE.snap },
        { at: 0.63, x: 2, scale: 1.2 },
        { at: 0.72, x: 2, scale: 1.2, ease: EASE.snap },
        { at: 0.75, scale: 1.2 },
        { at: 0.86 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.06, scaleX: 0.8, ease: EASE.snap },
        { at: 0.14, y: 0.4, scaleX: 0.7, scaleY: -1.3 },
        { at: 0.76, y: 0.4, scaleX: 0.7, scaleY: -1.3 },
        { at: 0.86 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_ALERT };
