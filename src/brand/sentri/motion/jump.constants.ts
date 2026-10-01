/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_JUMP: MascotAnimation = {
  name: 'Jump',
  summary: 'A cute hop: squashes down to wind up, springs off stretched tall, floats at the top with its pods flung up, lands in a squash and wobbles back to rest.',
  duration: 1800,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.14, scaleX: 1.16, scaleY: 0.8, ease: EASE.out },
        { at: 0.2, y: -3, scaleX: 0.88, scaleY: 1.16, ease: EASE.rise },
        { at: 0.4, y: -11, ease: EASE.fall },
        { at: 0.57, y: -1, scaleX: 0.9, scaleY: 1.12, ease: EASE.linear },
        { at: 0.6, scaleX: 1.2, scaleY: 0.76, ease: EASE.out },
        { at: 0.7, scaleX: 0.95, scaleY: 1.07 },
        { at: 0.78, scaleX: 1.02, scaleY: 0.98 },
        { at: 0.85 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.14, scaleX: 1.1, ease: EASE.out },
        { at: 0.2, scale: 0.94, opacity: 0.9, ease: EASE.rise },
        { at: 0.4, scale: 0.5, opacity: 0.4, ease: EASE.fall },
        { at: 0.6, scaleX: 1.14, ease: EASE.out },
        { at: 0.7 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0 },
        { at: 0.14, rotate: -18, ease: EASE.out },
        { at: 0.2, rotate: 8, ease: EASE.out },
        { at: 0.3, rotate: 38 },
        { at: 0.42, rotate: 28, ease: EASE.in },
        { at: 0.6, rotate: 44, ease: EASE.out },
        { at: 0.67, rotate: -24 },
        { at: 0.77, rotate: 9 },
        { at: 0.86, rotate: -3 },
        { at: 0.93 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0 },
        { at: 0.14, rotate: 18, ease: EASE.out },
        { at: 0.2, rotate: -8, ease: EASE.out },
        { at: 0.3, rotate: -38 },
        { at: 0.42, rotate: -28, ease: EASE.in },
        { at: 0.6, rotate: -44, ease: EASE.out },
        { at: 0.67, rotate: 24 },
        { at: 0.77, rotate: -9 },
        { at: 0.86, rotate: 3 },
        { at: 0.93 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.1 },
        { at: 0.14, scaleY: 0.35, ease: EASE.out },
        { at: 0.22, y: -1 },
        { at: 0.45, y: -1 },
        { at: 0.57, ease: EASE.out },
        { at: 0.6, scaleY: 0.35 },
        { at: 0.7 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_JUMP };
