/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_IDLE_BOUNCE: MascotAnimation = {
  name: 'Bounce',
  summary: 'Bounces on the spot: squashes and tips as it pushes off, floats up with the pods flapping, drops back into a little squash and puffs two bounce lines as it lands.',
  duration: 1200,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, rotate: -3, scaleX: 1.05, scaleY: 0.95, ease: EASE.out },
        { at: 0.18, y: -2, rotate: -1, scaleX: 0.97, scaleY: 1.04, ease: EASE.rise },
        { at: 0.42, y: -3.5, scaleX: 0.99, scaleY: 1.02, ease: EASE.fall },
        { at: 0.72, y: -1.2, rotate: 1 },
        { at: 0.86, scaleX: 1.06, scaleY: 0.94, ease: EASE.out },
        { at: 1, rotate: -3, scaleX: 1.05, scaleY: 0.95 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.05 },
        { at: 0.42, scale: 0.82, opacity: 0.7 },
        { at: 0.86, scaleX: 1.06 },
        { at: 1, scaleX: 1.05 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: -9 },
        { at: 0.2, rotate: 14 },
        { at: 0.42, rotate: 22 },
        { at: 0.64, rotate: 9 },
        { at: 0.86, rotate: -7 },
        { at: 1, rotate: -9 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: 7 },
        { at: 0.22, rotate: -13 },
        { at: 0.44, rotate: -21 },
        { at: 0.66, rotate: -10 },
        { at: 0.88, rotate: 8 },
        { at: 1, rotate: 7 },
      ],
    },
    {
      part: 'dust',
      frames: [
        { at: 0, x: 1, opacity: 0.9 },
        { at: 0.16, x: 0, y: -1.5, opacity: 0 },
        { at: 0.84, x: 1, opacity: 0 },
        { at: 0.9, x: 1, opacity: 0.9 },
        { at: 1, x: 1, opacity: 0.9 },
      ],
    },
  ],
};

export { SENTRI_IDLE_BOUNCE };
