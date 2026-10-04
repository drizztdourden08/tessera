/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_ALERT_EXCLAIM: MascotAnimation = {
  name: 'Exclaim',
  summary: 'Startled with a mark: an exclamation mark springs up above the tip as Sentri flinches, pops up with its pods snapped high, trembles, glances both ways, then settles while the mark stays.',
  duration: 1600,
  loop: false,
  still: ['exclaim'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.05, y: 0.5, scaleX: 1.07, scaleY: 0.92, ease: EASE.snap },
        { at: 0.13, y: -3.5, scaleX: 0.93, scaleY: 1.1, ease: EASE.out },
        { at: 0.22, y: -2.8 },
        { at: 0.28, x: -0.5, y: -2.8, ease: EASE.linear },
        { at: 0.32, x: 0.5, y: -2.8, ease: EASE.linear },
        { at: 0.36, x: -0.5, y: -2.8, ease: EASE.linear },
        { at: 0.4, y: -2.8 },
        { at: 0.72, y: -2.6, ease: EASE.out },
        { at: 0.86, scaleX: 1.04, scaleY: 0.96 },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.05, scaleX: 1.06 },
        { at: 0.13, scale: 0.78, opacity: 0.7 },
        { at: 0.72, scale: 0.8, opacity: 0.72 },
        { at: 0.86 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0 },
        { at: 0.05, rotate: -9, ease: EASE.snap },
        { at: 0.13, rotate: 46 },
        { at: 0.2, rotate: 38 },
        { at: 0.4, rotate: 41 },
        { at: 0.72, rotate: 36, ease: EASE.overshoot },
        { at: 0.88 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0 },
        { at: 0.05, rotate: 9, ease: EASE.snap },
        { at: 0.13, rotate: -46 },
        { at: 0.2, rotate: -38 },
        { at: 0.4, rotate: -41 },
        { at: 0.72, rotate: -36, ease: EASE.overshoot },
        { at: 0.88 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.05, scaleY: 0.25, ease: EASE.snap },
        { at: 0.13, y: -1, scale: 1.2 },
        { at: 0.44, y: -1, scale: 1.1, ease: EASE.snap },
        { at: 0.48, x: -2, y: -1, scale: 1.1 },
        { at: 0.56, x: -2, y: -1, scale: 1.1, ease: EASE.snap },
        { at: 0.6, x: 2, y: -1, scale: 1.1 },
        { at: 0.68, x: 2, y: -1, scale: 1.1, ease: EASE.snap },
        { at: 0.72, y: -1, scale: 1.1 },
        { at: 0.84 },
        { at: 1 },
      ],
    },
    {
      part: 'exclaim',
      frames: [
        { at: 0 },
        { at: 0.05, y: 3, scale: 0.6, opacity: 0.4, ease: EASE.overshoot },
        { at: 0.15, y: -1.5, scale: 1.15 },
        { at: 0.24, ease: EASE.out },
        { at: 0.5, y: -1 },
        { at: 0.6 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_ALERT_EXCLAIM };
