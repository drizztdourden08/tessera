/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_BLINK: MascotAnimation = {
  name: 'Blink',
  summary: 'Blinks twice: the eyes shut like shutters, hold for a beat and open again, and the pods twitch up with each blink.',
  duration: 900,
  loop: false,
  tracks: [
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.12, ease: EASE.snap },
        { at: 0.16, scaleY: 0.1 },
        { at: 0.24, scaleY: 0.1, ease: EASE.snap },
        { at: 0.3 },
        { at: 0.48, ease: EASE.snap },
        { at: 0.52, scaleY: 0.1 },
        { at: 0.6, scaleY: 0.1, ease: EASE.snap },
        { at: 0.66 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0 },
        { at: 0.16, rotate: 4, ease: EASE.out },
        { at: 0.32 },
        { at: 0.52, rotate: 4, ease: EASE.out },
        { at: 0.68 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0 },
        { at: 0.16, rotate: -4, ease: EASE.out },
        { at: 0.32 },
        { at: 0.52, rotate: -4, ease: EASE.out },
        { at: 0.68 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_BLINK };
