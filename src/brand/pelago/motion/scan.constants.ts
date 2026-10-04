/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { PELAGO_LAG } from '../pelago-lag.constants';

const PELAGO_SCAN: MascotAnimation = {
  name: 'Look around',
  summary: 'Scans the room: the floating eyes drift out to the left, blink across to the right, then rise to peek up. The body turns a moment after the eyes and the hands swing behind it.',
  duration: 4000,
  loop: true,
  tracks: [
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.06, ease: EASE.snap },
        { at: 0.12, x: -6, y: 1 },
        { at: 0.3, x: -6, y: 1, ease: EASE.in },
        { at: 0.34, x: -1, scaleY: 0.1, ease: EASE.out },
        { at: 0.4, x: 6, y: 1 },
        { at: 0.58, x: 6, y: 1, ease: EASE.snap },
        { at: 0.66, x: 0.5, y: -4 },
        { at: 0.84, x: 0.5, y: -4 },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    {
      part: 'body',
      lag: PELAGO_LAG.eyes,
      frames: [
        { at: 0 },
        { at: 0.12, x: -1, rotate: -4 },
        { at: 0.32, x: -1, rotate: -4 },
        { at: 0.42, x: 1, rotate: 4 },
        { at: 0.6, x: 1, rotate: 4 },
        { at: 0.68, y: -1, scaleY: 1.04 },
        { at: 0.84, y: -1, scaleY: 1.04 },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    { part: 'shadow', lag: PELAGO_LAG.eyes, frames: [{ at: 0 }, { at: 0.12, x: -1 }, { at: 0.32, x: -1 }, { at: 0.42, x: 1 }, { at: 0.6, x: 1 }, { at: 0.68, scale: 0.92 }, { at: 0.84, scale: 0.92 }, { at: 0.94 }, { at: 1 }] },
    { part: 'handLeft', lag: PELAGO_LAG.hands, frames: [{ at: 0 }, { at: 0.12, x: -1, rotate: 10 }, { at: 0.32, x: -1, rotate: 10 }, { at: 0.42, x: 1, rotate: -8 }, { at: 0.6, x: 1, rotate: -8 }, { at: 0.68, y: -1 }, { at: 0.84, y: -1 }, { at: 0.94 }, { at: 1 }] },
    { part: 'handRight', lag: PELAGO_LAG.hands, frames: [{ at: 0 }, { at: 0.12, x: -1, rotate: 8 }, { at: 0.32, x: -1, rotate: 8 }, { at: 0.42, x: 1, rotate: -10 }, { at: 0.6, x: 1, rotate: -10 }, { at: 0.68, y: -1 }, { at: 0.84, y: -1 }, { at: 0.94 }, { at: 1 }] },
  ],
};

export { PELAGO_SCAN };
