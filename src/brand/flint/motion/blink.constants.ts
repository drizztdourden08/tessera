/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_BLINK: MascotAnimation = {
  name: 'Blink',
  summary: 'Blinks twice, quickly, and settles a hair lower on its base with each blink.',
  duration: 900,
  loop: false,
  tracks: [
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.1, ease: EASE.in },
        { at: 0.18, scaleY: 0.1, ease: EASE.out },
        { at: 0.3 },
        { at: 0.45, ease: EASE.in },
        { at: 0.53, scaleY: 0.1, ease: EASE.out },
        { at: 0.65 },
        { at: 1 },
      ],
    },
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.18, scaleX: 1.01, scaleY: 0.985 },
        { at: 0.32 },
        { at: 0.53, scaleX: 1.01, scaleY: 0.985 },
        { at: 0.67 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_BLINK };
