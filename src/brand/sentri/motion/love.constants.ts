/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_LOVE: MascotAnimation = {
  name: 'Love',
  summary: 'Smitten: a pink heart floats above the tip and beats twice, swelling and settling, while Sentri bobs and flutters its pods.',
  duration: 1600,
  loop: true,
  still: ['heart'],
  tracks: [
    {
      part: 'heart',
      frames: [
        { at: 0 },
        { at: 0.1, y: -0.5, scale: 1.2, ease: EASE.out },
        { at: 0.2 },
        { at: 0.3, y: -0.5, scale: 1.15, ease: EASE.out },
        { at: 0.45 },
        { at: 1 },
      ],
    },
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.5, y: -1.2, scaleY: 1.02 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.5, scale: 0.9, opacity: 0.85 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: 4 },
        { at: 0.25, rotate: 15 },
        { at: 0.5, rotate: 4 },
        { at: 0.75, rotate: 15 },
        { at: 1, rotate: 4 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: -15 },
        { at: 0.25, rotate: -4 },
        { at: 0.5, rotate: -15 },
        { at: 0.75, rotate: -4 },
        { at: 1, rotate: -15 },
      ],
    },
  ],
};

export { SENTRI_LOVE };
