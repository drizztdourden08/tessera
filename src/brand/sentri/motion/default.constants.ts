/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_DEFAULT: MascotAnimation = {
  name: 'Default',
  summary: 'The neutral face, calm and nearly still: Sentri breathes slowly in place and blinks now and then.',
  duration: 5000,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.5, y: -0.6, scaleY: 1.015 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.5, scale: 0.95, opacity: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.58, ease: EASE.in },
        { at: 0.6, scaleY: 0.1, ease: EASE.out },
        { at: 0.63 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_DEFAULT };
