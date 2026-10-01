/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_HAPPY: MascotAnimation = {
  name: 'Happy',
  summary: 'A little celebration: two quick hops that tip one way then the other, pods flapping high, eyes squeezed into a smile.',
  duration: 1500,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.1, scaleY: 0.88, ease: EASE.out },
        { at: 0.22, y: -5, rotate: -6, scaleX: 0.96, scaleY: 1.05, ease: EASE.fall },
        { at: 0.36, scaleX: 1.12, scaleY: 0.86, ease: EASE.out },
        { at: 0.5, y: -5, rotate: 6, scaleX: 0.96, scaleY: 1.05, ease: EASE.fall },
        { at: 0.64, scaleX: 1.12, scaleY: 0.86, ease: EASE.out },
        { at: 0.74, scaleX: 0.97, scaleY: 1.04 },
        { at: 0.84 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.08, ease: EASE.out },
        { at: 0.22, scale: 0.7, opacity: 0.6, ease: EASE.fall },
        { at: 0.36, scaleX: 1.1, ease: EASE.out },
        { at: 0.5, scale: 0.7, opacity: 0.6, ease: EASE.fall },
        { at: 0.64, scaleX: 1.1, ease: EASE.out },
        { at: 0.74 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0 },
        { at: 0.08, rotate: -10, ease: EASE.out },
        { at: 0.15, rotate: 45 },
        { at: 0.22, rotate: 30 },
        { at: 0.29, rotate: 50 },
        { at: 0.36, rotate: 20, ease: EASE.out },
        { at: 0.43, rotate: 50 },
        { at: 0.5, rotate: 30 },
        { at: 0.57, rotate: 50 },
        { at: 0.64, rotate: 15, ease: EASE.out },
        { at: 0.74, rotate: -10 },
        { at: 0.84, rotate: 4 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0 },
        { at: 0.08, rotate: 10, ease: EASE.out },
        { at: 0.15, rotate: -45 },
        { at: 0.22, rotate: -30 },
        { at: 0.29, rotate: -50 },
        { at: 0.36, rotate: -20, ease: EASE.out },
        { at: 0.43, rotate: -50 },
        { at: 0.5, rotate: -30 },
        { at: 0.57, rotate: -50 },
        { at: 0.64, rotate: -15, ease: EASE.out },
        { at: 0.74, rotate: 10 },
        { at: 0.84, rotate: -4 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.06, scaleY: 0.4 },
        { at: 0.84, scaleY: 0.4 },
        { at: 0.92 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_HAPPY };
