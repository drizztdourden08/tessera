/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_LOW_POWER: MascotAnimation = {
  name: 'Low power',
  summary: 'Running on empty: a red low battery blinks over its head and its chip is dim. It slumps on its base with heavy lids and its hands hanging, sags lower and tips, jerks half awake as the chip sputters, then sags again.',
  duration: 3600,
  loop: true,
  still: ['battery', 'chipDim', 'lids'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, scaleX: 1.04, scaleY: 0.94 },
        { at: 0.6, rotate: 2, scaleX: 1.05, scaleY: 0.92 },
        { at: 0.7, y: -0.6, scaleX: 1.02, scaleY: 0.97, ease: EASE.out },
        { at: 0.8, scaleX: 1.04, scaleY: 0.94 },
        { at: 1, scaleX: 1.04, scaleY: 0.94 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.04 },
        { at: 0.6, x: 0.3, scaleX: 1.05 },
        { at: 0.7, scaleX: 1.02 },
        { at: 1, scaleX: 1.04 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, y: 1.2, rotate: -14 },
        { at: 0.6, y: 1.6, rotate: -18 },
        { at: 0.7, y: 0.6, rotate: -6, ease: EASE.out },
        { at: 0.8, y: 1.2, rotate: -14 },
        { at: 1, y: 1.2, rotate: -14 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, y: 1.1, rotate: 13 },
        { at: 0.62, y: 1.7, rotate: 19 },
        { at: 0.71, y: 0.5, rotate: 5, ease: EASE.out },
        { at: 0.82, y: 1.1, rotate: 13 },
        { at: 1, y: 1.1, rotate: 13 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, y: 0.3 },
        { at: 0.6, y: 0.5, scaleY: 0.6 },
        { at: 0.7, ease: EASE.out },
        { at: 0.8, y: 0.3 },
        { at: 1, y: 0.3 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, scaleX: 0.7, scaleY: 0.4 },
        { at: 0.7, scaleX: 0.6, scaleY: -0.5 },
        { at: 0.85, scaleX: 0.7, scaleY: 0.4 },
        { at: 1, scaleX: 0.7, scaleY: 0.4 },
      ],
    },
    {
      part: 'battery',
      frames: [
        { at: 0, opacity: 1 },
        { at: 0.12, opacity: 1 },
        { at: 0.25, opacity: 0.35 },
        { at: 0.38, opacity: 1 },
        { at: 0.62, opacity: 1 },
        { at: 0.75, opacity: 0.35 },
        { at: 0.88, opacity: 1 },
        { at: 1, opacity: 1 },
      ],
    },
    {
      part: 'chipDim',
      frames: [
        { at: 0, opacity: 1 },
        { at: 0.68, opacity: 1, ease: EASE.linear },
        { at: 0.7, opacity: 0.4, ease: EASE.linear },
        { at: 0.72, opacity: 0.95, ease: EASE.linear },
        { at: 0.745, opacity: 0.5, ease: EASE.linear },
        { at: 0.77, opacity: 1 },
        { at: 1, opacity: 1 },
      ],
    },
  ],
};

export { FLINT_LOW_POWER };
