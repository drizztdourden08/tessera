/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_IDLE: MascotAnimation = {
  name: 'Idle',
  summary: 'Floats and breathes in place. The pods sway a beat behind the body, the eyes glance right, blink, then glance left.',
  duration: 6000,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.25, y: -1.5, scaleX: 0.985, scaleY: 1.03 },
        { at: 0.5 },
        { at: 0.75, y: -1.5, scaleX: 0.985, scaleY: 1.03 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.25, scale: 0.86, opacity: 0.7 },
        { at: 0.5 },
        { at: 0.75, scale: 0.86, opacity: 0.7 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: 2.2, ease: EASE.out },
        { at: 0.06, rotate: 3 },
        { at: 0.31, rotate: -3 },
        { at: 0.56, rotate: 3 },
        { at: 0.81, rotate: -3, ease: EASE.in },
        { at: 1, rotate: 2.2 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: -2.2, ease: EASE.out },
        { at: 0.06, rotate: -3 },
        { at: 0.31, rotate: 3 },
        { at: 0.56, rotate: -3 },
        { at: 0.81, rotate: 3, ease: EASE.in },
        { at: 1, rotate: -2.2 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.17, ease: EASE.snap },
        { at: 0.2, x: 2 },
        { at: 0.37, x: 2, ease: EASE.snap },
        { at: 0.4 },
        { at: 0.6, ease: EASE.in },
        { at: 0.615, scaleY: 0.1, ease: EASE.out },
        { at: 0.64 },
        { at: 0.79, ease: EASE.snap },
        { at: 0.82, x: -2 },
        { at: 0.93, x: -2, ease: EASE.snap },
        { at: 0.96 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_IDLE };
