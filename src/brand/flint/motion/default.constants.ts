/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_DEFAULT: MascotAnimation = {
  name: 'Default',
  summary: 'The neutral face: sits calm and still on its base, breathing slowly with barely a swell, the hands resting at its sides, and blinks once.',
  duration: 4800,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, scaleX: 1.006, scaleY: 0.992 },
        { at: 0.5, scaleX: 0.996, scaleY: 1.008 },
        { at: 1, scaleX: 1.006, scaleY: 0.992 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, scaleX: 1.01 },
        { at: 0.5, scaleX: 0.99 },
        { at: 1, scaleX: 1.01 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, y: 0.2 },
        { at: 0.5, y: -0.3, rotate: -1.5 },
        { at: 1, y: 0.2 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, y: 0.1, rotate: 0.5 },
        { at: 0.52, y: -0.3, rotate: 1.5 },
        { at: 1, y: 0.1, rotate: 0.5 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.7, ease: EASE.in },
        { at: 0.72, scaleY: 0.1, ease: EASE.out },
        { at: 0.75 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_DEFAULT };
