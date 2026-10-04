/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_WORRIED: MascotAnimation = {
  name: 'Worried',
  summary: 'Anxious: hunched low with its brows pinched up and a wobbling frown, it trembles in two bursts and wrings its hands in front, the wide eyes darting left and right. Sweat drops roll down both sides of its head and its chip flickers between dim and lit.',
  duration: 2000,
  loop: true,
  still: ['sweatLeft', 'sweatRight', 'browsWorried', 'chipDim'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: 0.2, scaleX: 1.02, scaleY: 0.97, ease: EASE.linear },
        { at: 0.05, x: -0.3, y: 0.2, scaleX: 1.02, scaleY: 0.97, ease: EASE.linear },
        { at: 0.1, x: 0.3, y: 0.2, scaleX: 1.02, scaleY: 0.97, ease: EASE.linear },
        { at: 0.15, x: -0.3, y: 0.2, scaleX: 1.02, scaleY: 0.97, ease: EASE.linear },
        { at: 0.2, x: 0.3, y: 0.2, scaleX: 1.02, scaleY: 0.97, ease: EASE.linear },
        { at: 0.25, y: 0.2, scaleX: 1.02, scaleY: 0.97 },
        { at: 0.5, y: 0.1, scaleX: 1.015, scaleY: 0.98, ease: EASE.linear },
        { at: 0.55, x: 0.25, y: 0.1, scaleX: 1.015, scaleY: 0.98, ease: EASE.linear },
        { at: 0.6, x: -0.25, y: 0.1, scaleX: 1.015, scaleY: 0.98, ease: EASE.linear },
        { at: 0.65, x: 0.25, y: 0.1, scaleX: 1.015, scaleY: 0.98, ease: EASE.linear },
        { at: 0.7, x: -0.25, y: 0.1, scaleX: 1.015, scaleY: 0.98, ease: EASE.linear },
        { at: 0.75, y: 0.1, scaleX: 1.015, scaleY: 0.98 },
        { at: 1, y: 0.2, scaleX: 1.02, scaleY: 0.97 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, x: 4, y: -1.5, rotate: -16 },
        { at: 0.25, x: 4.6, y: -2, rotate: -22 },
        { at: 0.5, x: 4, y: -1.5, rotate: -16 },
        { at: 0.75, x: 4.6, y: -2, rotate: -22 },
        { at: 1, x: 4, y: -1.5, rotate: -16 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, x: -4.6, y: -2, rotate: 22 },
        { at: 0.25, x: -4, y: -1.5, rotate: 16 },
        { at: 0.5, x: -4.6, y: -2, rotate: 22 },
        { at: 0.75, x: -4, y: -1.5, rotate: 16 },
        { at: 1, x: -4.6, y: -2, rotate: 22 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, scale: 1.15 },
        { at: 0.3, scale: 1.15, ease: EASE.snap },
        { at: 0.33, x: -1.5, scale: 1.15 },
        { at: 0.5, x: -1.5, scale: 1.15, ease: EASE.snap },
        { at: 0.53, x: 1.5, scale: 1.15 },
        { at: 0.75, x: 1.5, scale: 1.15, ease: EASE.snap },
        { at: 0.78, scale: 1.15 },
        { at: 1, scale: 1.15 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, scaleX: 0.8, scaleY: -1 },
        { at: 0.5, scaleX: 0.7, scaleY: -1.2 },
        { at: 1, scaleX: 0.8, scaleY: -1 },
      ],
    },
    {
      part: 'sweatLeft',
      frames: [
        { at: 0, opacity: 1 },
        { at: 0.4, y: 1.6, opacity: 1 },
        { at: 0.55, y: 2.6, opacity: 0 },
        { at: 0.62, y: -0.6, scale: 0.5, opacity: 0 },
        { at: 0.78, opacity: 1 },
        { at: 1, opacity: 1 },
      ],
    },
    {
      part: 'sweatRight',
      frames: [
        { at: 0, y: 0.8, opacity: 1 },
        { at: 0.15, y: 2.4, opacity: 0 },
        { at: 0.3, y: -0.6, scale: 0.5, opacity: 0 },
        { at: 0.45, opacity: 1 },
        { at: 0.85, y: 0.6, opacity: 1 },
        { at: 1, y: 0.8, opacity: 1 },
      ],
    },
    {
      part: 'chipDim',
      frames: [
        { at: 0, opacity: 1 },
        { at: 0.1, opacity: 1, ease: EASE.linear },
        { at: 0.125, opacity: 0.05, ease: EASE.linear },
        { at: 0.15, opacity: 1 },
        { at: 0.4, opacity: 1, ease: EASE.linear },
        { at: 0.425, opacity: 0.05, ease: EASE.linear },
        { at: 0.45, opacity: 1, ease: EASE.linear },
        { at: 0.48, opacity: 1, ease: EASE.linear },
        { at: 0.505, opacity: 0.05, ease: EASE.linear },
        { at: 0.53, opacity: 1 },
        { at: 0.84, opacity: 1, ease: EASE.linear },
        { at: 0.865, opacity: 0.05, ease: EASE.linear },
        { at: 0.89, opacity: 1 },
        { at: 1, opacity: 1 },
      ],
    },
  ],
};

export { FLINT_WORRIED };
