/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_SUCCESS: MascotAnimation = {
  name: 'Success',
  summary: 'Cheers a win: both stone hands up high and pumping, it springs up in a big hop and confetti bursts out over its head and drifts down, its chip flaring bright, eyes in happy arcs over a wide open smile, then it rocks happily on its base.',
  duration: 2400,
  loop: true,
  still: ['confetti', 'eyesHappy', 'chipGlow'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.12, scaleY: 0.86, ease: EASE.out },
        { at: 0.22, y: -5, scaleX: 0.95, scaleY: 1.06, ease: EASE.fall },
        { at: 0.36, scaleX: 1.12, scaleY: 0.86, ease: EASE.out },
        { at: 0.46, scaleX: 0.97, scaleY: 1.03 },
        { at: 0.56 },
        { at: 0.66, y: -0.6, rotate: -2 },
        { at: 0.78, y: -0.6, rotate: 2 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.1, ease: EASE.out },
        { at: 0.22, scale: 0.7, opacity: 0.6, ease: EASE.fall },
        { at: 0.36, scaleX: 1.1, ease: EASE.out },
        { at: 0.46 },
        { at: 1 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, x: 0.5, y: -8, rotate: 40 },
        { at: 0.08, x: 0.5, y: -6, rotate: 25 },
        { at: 0.22, x: 0.5, y: -10, rotate: 55 },
        { at: 0.36, x: 0.5, y: -7, rotate: 30 },
        { at: 0.5, x: 0.5, y: -9, rotate: 48 },
        { at: 0.64, x: 0.5, y: -8, rotate: 36 },
        { at: 0.76, x: 0.5, y: -9, rotate: 48 },
        { at: 0.88, x: 0.5, y: -8, rotate: 38 },
        { at: 1, x: 0.5, y: -8, rotate: 40 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, x: -0.5, y: -8, rotate: -40 },
        { at: 0.08, x: -0.5, y: -6.2, rotate: -26 },
        { at: 0.22, x: -0.5, y: -10, rotate: -54 },
        { at: 0.36, x: -0.5, y: -7.2, rotate: -31 },
        { at: 0.52, x: -0.5, y: -9, rotate: -47 },
        { at: 0.66, x: -0.5, y: -8, rotate: -35 },
        { at: 0.78, x: -0.5, y: -9, rotate: -46 },
        { at: 0.9, x: -0.5, y: -8, rotate: -37 },
        { at: 1, x: -0.5, y: -8, rotate: -40 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, scaleX: 1.4, scaleY: 1.9 },
        { at: 0.22, scaleX: 1.5, scaleY: 2.2 },
        { at: 0.46, scaleX: 1.4, scaleY: 1.9 },
        { at: 1, scaleX: 1.4, scaleY: 1.9 },
      ],
    },
    {
      part: 'confetti',
      frames: [
        { at: 0, scale: 0.35, opacity: 0 },
        { at: 0.18, scale: 0.35, opacity: 0, ease: EASE.out },
        { at: 0.26, scale: 1.05, opacity: 1 },
        { at: 0.5, y: 1.5, rotate: 3, opacity: 1 },
        { at: 0.8, y: 3.5, rotate: -2, opacity: 0.6 },
        { at: 0.92, y: 4.5, opacity: 0 },
        { at: 1, scale: 0.35, opacity: 0 },
      ],
    },
    {
      part: 'chipGlow',
      frames: [
        { at: 0, opacity: 0.6 },
        { at: 0.22, scale: 1.3, opacity: 1, ease: EASE.out },
        { at: 0.4, opacity: 0.8 },
        { at: 1, opacity: 0.6 },
      ],
    },
  ],
};

export { FLINT_SUCCESS };
