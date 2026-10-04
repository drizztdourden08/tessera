/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_SUCCESS: MascotAnimation = {
  name: 'Success',
  summary: 'Celebrates a win: squints with joy, hops with both pods thrown high, and a burst of cyan, orange, red and yellow confetti spreads out and drifts down.',
  duration: 1800,
  loop: true,
  still: ['grin', 'confettiNear'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.08, scaleY: 0.92, ease: EASE.out },
        { at: 0.22, y: -5, rotate: -4, scaleX: 0.96, scaleY: 1.05, ease: EASE.fall },
        { at: 0.38, scaleX: 1.08, scaleY: 0.92, ease: EASE.out },
        { at: 0.54, y: -2.5, rotate: 4, ease: EASE.fall },
        { at: 0.66, scaleX: 1.04, scaleY: 0.96 },
        { at: 0.78 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.06 },
        { at: 0.22, scale: 0.7, opacity: 0.6 },
        { at: 0.38, scaleX: 1.06 },
        { at: 0.54, scale: 0.86 },
        { at: 0.66 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: 20 },
        { at: 0.12, rotate: 46 },
        { at: 0.3, rotate: 30 },
        { at: 0.42, rotate: 46 },
        { at: 0.66, rotate: 30 },
        { at: 1, rotate: 20 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: -20 },
        { at: 0.12, rotate: -46 },
        { at: 0.3, rotate: -30 },
        { at: 0.42, rotate: -46 },
        { at: 0.66, rotate: -30 },
        { at: 1, rotate: -20 },
      ],
    },
    {
      part: 'confettiNear',
      frames: [
        { at: 0 },
        { at: 0.2, y: 1, scale: 1.1, opacity: 0 },
        { at: 0.86, scale: 0.8, opacity: 0 },
        { at: 1 },
      ],
    },
    {
      part: 'confettiFar',
      frames: [
        { at: 0, scale: 0.9, opacity: 0 },
        { at: 0.14, scale: 0.9, opacity: 0 },
        { at: 0.26, opacity: 1 },
        { at: 0.7, y: 3, opacity: 1 },
        { at: 0.86, y: 4, opacity: 0 },
        { at: 1, opacity: 0 },
      ],
    },
  ],
};

export { SENTRI_SUCCESS };
