/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_HAPPY_GRIN: MascotAnimation = {
  name: 'Happy grin',
  summary: 'A giggle: perks up and wiggles side to side on its base, eyes curved into happy arcs over a wide open grin that bobs with each wiggle, rubbing its stone hands together in front of it.',
  duration: 1800,
  loop: false,
  still: ['eyesHappy'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.1, y: -1.2, scaleX: 0.97, scaleY: 1.04, ease: EASE.out },
        { at: 0.2, y: -1.2, rotate: -4 },
        { at: 0.3, y: -0.6, rotate: 4 },
        { at: 0.4, y: -1.2, rotate: -4 },
        { at: 0.5, y: -0.6, rotate: 4 },
        { at: 0.6, y: -1.2, rotate: -3 },
        { at: 0.7, y: -0.8, rotate: 2 },
        { at: 0.8, y: -0.4 },
        { at: 0.88, scaleX: 1.04, scaleY: 0.97 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.1, scale: 0.93, opacity: 0.88, ease: EASE.out },
        { at: 0.8, scale: 0.96, opacity: 0.92 },
        { at: 0.88, scaleX: 1.04 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0 },
        { at: 0.1, x: 4.5, y: -2.5, rotate: -18, ease: EASE.overshoot },
        { at: 0.2, x: 3.6, y: -2.2, rotate: -12 },
        { at: 0.3, x: 4.6, y: -2.8, rotate: -20 },
        { at: 0.4, x: 3.6, y: -2.2, rotate: -12 },
        { at: 0.5, x: 4.6, y: -2.8, rotate: -20 },
        { at: 0.6, x: 3.6, y: -2.2, rotate: -12 },
        { at: 0.7, x: 4.4, y: -2.6, rotate: -18 },
        { at: 0.84 },
        { at: 0.92, rotate: 4 },
        { at: 1 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0 },
        { at: 0.1, x: -4.5, y: -2.5, rotate: 18, ease: EASE.overshoot },
        { at: 0.2, x: -4.6, y: -2.8, rotate: 20 },
        { at: 0.3, x: -3.6, y: -2.2, rotate: 12 },
        { at: 0.4, x: -4.6, y: -2.8, rotate: 20 },
        { at: 0.5, x: -3.6, y: -2.2, rotate: 12 },
        { at: 0.6, x: -4.6, y: -2.8, rotate: 20 },
        { at: 0.7, x: -4.4, y: -2.6, rotate: 18 },
        { at: 0.84 },
        { at: 0.92, rotate: -4 },
        { at: 1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.55, scaleY: 2.2, ease: EASE.out },
        { at: 0.2, scaleX: 1.5, scaleY: 2 },
        { at: 0.3, scaleX: 1.55, scaleY: 2.25 },
        { at: 0.4, scaleX: 1.5, scaleY: 2 },
        { at: 0.5, scaleX: 1.55, scaleY: 2.25 },
        { at: 0.6, scaleX: 1.5, scaleY: 2 },
        { at: 0.8, scaleX: 1.5, scaleY: 2.1 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_HAPPY_GRIN };
