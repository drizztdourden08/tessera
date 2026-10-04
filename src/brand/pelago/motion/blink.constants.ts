/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const PELAGO_BLINK: MascotAnimation = {
  name: 'Blink',
  summary: 'Blinks twice, quickly, and the crystal glow dims a little with each blink.',
  duration: 900,
  loop: false,
  tracks: [
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.12, ease: EASE.in },
        { at: 0.2, y: 0.2, scaleY: 0.12, ease: EASE.out },
        { at: 0.32 },
        { at: 0.5, ease: EASE.in },
        { at: 0.58, y: 0.2, scaleY: 0.12, ease: EASE.out },
        { at: 0.7 },
        { at: 1 },
      ],
    },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.2, opacity: 0.75 }, { at: 0.34 }, { at: 0.58, opacity: 0.75 }, { at: 0.72 }, { at: 1 }] },
  ],
};

export { PELAGO_BLINK };
