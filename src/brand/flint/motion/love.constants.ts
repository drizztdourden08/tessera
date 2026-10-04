/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_LOVE: MascotAnimation = {
  name: 'Love',
  summary: 'Smitten: a pink heart beats twice over its head, its cheeks blush and its chip glows bright and pulses with each beat. It sways dreamily from side to side with its hands clasped at its chest, gazing up with soft eyes and a big smile.',
  duration: 2400,
  loop: true,
  still: ['heart', 'blush', 'chipGlow'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: -0.6, rotate: -3 },
        { at: 0.5, y: -0.6, rotate: 3 },
        { at: 1, y: -0.6, rotate: -3 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, x: -0.4, scaleX: 0.97 },
        { at: 0.5, x: 0.4, scaleX: 0.97 },
        { at: 1, x: -0.4, scaleX: 0.97 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, x: 4.5, y: -3.2, rotate: -22 },
        { at: 0.5, x: 4.2, y: -3.6, rotate: -18 },
        { at: 1, x: 4.5, y: -3.2, rotate: -22 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, x: -4.2, y: -3.6, rotate: 18 },
        { at: 0.5, x: -4.5, y: -3.2, rotate: 22 },
        { at: 1, x: -4.2, y: -3.6, rotate: 18 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, y: -0.5, scaleY: 0.8 },
        { at: 0.6, y: -0.5, scaleY: 0.8, ease: EASE.in },
        { at: 0.63, y: -0.5, scaleY: 0.1, ease: EASE.out },
        { at: 0.66, y: -0.5, scaleY: 0.8 },
        { at: 1, y: -0.5, scaleY: 0.8 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, scaleX: 1.2, scaleY: 1.4 },
        { at: 1, scaleX: 1.2, scaleY: 1.4 },
      ],
    },
    {
      part: 'heart',
      frames: [
        { at: 0 },
        { at: 0.08, scale: 1.22, ease: EASE.out },
        { at: 0.16, scale: 0.98 },
        { at: 0.24, scale: 1.15 },
        { at: 0.34 },
        { at: 0.5, y: -0.8 },
        { at: 0.58, y: -0.8, scale: 1.22, ease: EASE.out },
        { at: 0.66, y: -0.8, scale: 0.98 },
        { at: 0.74, y: -0.8, scale: 1.15 },
        { at: 0.84, y: -0.8 },
        { at: 1 },
      ],
    },
    {
      part: 'chipGlow',
      frames: [
        { at: 0, opacity: 1 },
        { at: 0.08, scale: 1.15, opacity: 1, ease: EASE.out },
        { at: 0.34, opacity: 0.6 },
        { at: 0.5, opacity: 0.6 },
        { at: 0.58, scale: 1.15, opacity: 1, ease: EASE.out },
        { at: 0.84, opacity: 0.6 },
        { at: 1, opacity: 1 },
      ],
    },
  ],
};

export { FLINT_LOVE };
