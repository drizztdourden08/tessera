/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_ALERT: MascotAnimation = {
  name: 'Alert',
  summary: 'Startled: flinches, pops up with eyes wide and pods snapped high, trembles, darts its eyes left and right, then settles back down.',
  duration: 1600,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.06, scaleX: 1.06, scaleY: 0.92, ease: EASE.snap },
        { at: 0.14, y: -4, scaleX: 0.92, scaleY: 1.12, ease: EASE.out },
        { at: 0.24, y: -3, ease: EASE.linear },
        { at: 0.3, x: -0.4, y: -3, ease: EASE.linear },
        { at: 0.34, x: 0.4, y: -3, ease: EASE.linear },
        { at: 0.38, x: -0.4, y: -3, ease: EASE.linear },
        { at: 0.42, x: 0.4, y: -3 },
        { at: 0.46, y: -3 },
        { at: 0.76, y: -3 },
        { at: 0.88, ease: EASE.out },
        { at: 0.94, scaleX: 1.03, scaleY: 0.97 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.06, scaleX: 1.05, ease: EASE.snap },
        { at: 0.14, scale: 0.75, opacity: 0.65 },
        { at: 0.76, scale: 0.78, opacity: 0.7 },
        { at: 0.88 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0 },
        { at: 0.06, rotate: -8, ease: EASE.snap },
        { at: 0.14, rotate: 50 },
        { at: 0.2, rotate: 40, ease: EASE.linear },
        { at: 0.3, rotate: 44, ease: EASE.linear },
        { at: 0.34, rotate: 37, ease: EASE.linear },
        { at: 0.38, rotate: 44, ease: EASE.linear },
        { at: 0.42, rotate: 38 },
        { at: 0.46, rotate: 40 },
        { at: 0.76, rotate: 40, ease: EASE.overshoot },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0 },
        { at: 0.06, rotate: 8, ease: EASE.snap },
        { at: 0.14, rotate: -50 },
        { at: 0.2, rotate: -40, ease: EASE.linear },
        { at: 0.3, rotate: -44, ease: EASE.linear },
        { at: 0.34, rotate: -37, ease: EASE.linear },
        { at: 0.38, rotate: -44, ease: EASE.linear },
        { at: 0.42, rotate: -38 },
        { at: 0.46, rotate: -40 },
        { at: 0.76, rotate: -40, ease: EASE.overshoot },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.06, scaleY: 0.2, ease: EASE.snap },
        { at: 0.14, y: -1, scale: 1.3 },
        { at: 0.24, scale: 1.15 },
        { at: 0.48, scale: 1.15, ease: EASE.snap },
        { at: 0.51, x: -2, scale: 1.15 },
        { at: 0.6, x: -2, scale: 1.15, ease: EASE.snap },
        { at: 0.63, x: 2, scale: 1.15 },
        { at: 0.72, x: 2, scale: 1.15, ease: EASE.snap },
        { at: 0.75, scale: 1.15 },
        { at: 0.85 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_ALERT };
