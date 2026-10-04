/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_JUMP_HOP: MascotAnimation = {
  name: 'Hop',
  summary: 'A springy hop: crouches, shoots up with lift lines streaking under it, tips forward on the way down and lands in a squash while sparkles twinkle up at its sides.',
  duration: 1500,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.1, y: 1, scaleX: 1.12, scaleY: 0.86, ease: EASE.out },
        { at: 0.18, y: -4, scaleX: 0.9, scaleY: 1.12, ease: EASE.rise },
        { at: 0.34, y: -9.5, scaleX: 0.98, scaleY: 1.02, ease: EASE.fall },
        { at: 0.5, y: -3, rotate: 7, ease: EASE.linear },
        { at: 0.56, rotate: 2, scaleX: 1.16, scaleY: 0.84, ease: EASE.out },
        { at: 0.68, scaleX: 0.96, scaleY: 1.05 },
        { at: 0.8, scaleX: 1.02, scaleY: 0.98 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.1, scaleX: 1.1, ease: EASE.out },
        { at: 0.18, scale: 0.9, opacity: 0.85, ease: EASE.rise },
        { at: 0.34, scale: 0.5, opacity: 0.4, ease: EASE.fall },
        { at: 0.56, scaleX: 1.12, ease: EASE.out },
        { at: 0.68 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0 },
        { at: 0.1, rotate: -16, ease: EASE.out },
        { at: 0.2, rotate: 30 },
        { at: 0.34, rotate: 40 },
        { at: 0.5, rotate: 22, ease: EASE.in },
        { at: 0.58, rotate: -14, ease: EASE.out },
        { at: 0.7, rotate: 6 },
        { at: 0.82 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0 },
        { at: 0.1, rotate: 16, ease: EASE.out },
        { at: 0.21, rotate: -31 },
        { at: 0.35, rotate: -41 },
        { at: 0.5, rotate: -21, ease: EASE.in },
        { at: 0.58, rotate: 13, ease: EASE.out },
        { at: 0.71, rotate: -5 },
        { at: 0.83 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.18, y: -1 },
        { at: 0.42, y: -1, ease: EASE.snap },
        { at: 0.47, x: 1, y: 1 },
        { at: 0.6, ease: EASE.out },
        { at: 1 },
      ],
    },
    {
      part: 'lift',
      frames: [
        { at: 0 },
        { at: 0.24, y: -2, opacity: 0 },
        { at: 0.3, opacity: 1 },
        { at: 0.4, y: 1, opacity: 1 },
        { at: 0.47, y: 2, opacity: 0 },
        { at: 1 },
      ],
    },
    {
      part: 'landing',
      frames: [
        { at: 0 },
        { at: 0.55, y: 1, scale: 0.7, opacity: 0 },
        { at: 0.6, opacity: 1 },
        { at: 0.76, y: -1, opacity: 1 },
        { at: 0.88, y: -2, opacity: 0 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_JUMP_HOP };
