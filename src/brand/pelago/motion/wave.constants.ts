/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { PELAGO_LAG } from '../pelago-lag.constants';

const PELAGO_WAVE: MascotAnimation = {
  name: 'Wave',
  summary: 'Says hello: leans away and lifts a little, raises the right hand high and waves it three times with a happy squint, then lets it float back down.',
  duration: 2200,
  loop: false,
  tracks: [
    {
      part: 'body',
      frames: [
        { at: 0 },
        { at: 0.14, x: -0.5, y: -1.2, rotate: -4, ease: EASE.out },
        { at: 0.34, x: -0.5, y: -2, rotate: -7 },
        { at: 0.54, x: -0.5, y: -1.2, rotate: -4 },
        { at: 0.74, x: -0.5, y: -2, rotate: -7 },
        { at: 0.86, y: -1, rotate: -3 },
        { at: 0.96 },
        { at: 1 },
      ],
    },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.14, x: -0.5, scale: 0.9, opacity: 0.8 }, { at: 0.86, scale: 0.9, opacity: 0.8 }, { at: 0.96 }, { at: 1 }] },
    { part: 'sphereRight', frames: [{ at: 0 }, { at: 0.15, x: 0.8, y: -0.8 }, { at: 0.8, x: 0.8, y: -0.8 }, { at: 0.95 }, { at: 1 }] },
    {
      part: 'handRight',
      lag: PELAGO_LAG.hands / 2,
      frames: [
        { at: 0 },
        { at: 0.12, x: 1.5, y: -11, rotate: -6, ease: EASE.overshoot },
        { at: 0.22, x: 1.5, y: -11, rotate: 10 },
        { at: 0.32, x: 1.5, y: -11, rotate: -12 },
        { at: 0.42, x: 1.5, y: -11, rotate: 10 },
        { at: 0.52, x: 1.5, y: -11, rotate: -12 },
        { at: 0.62, x: 1.5, y: -11, rotate: 10 },
        { at: 0.72, x: 1.5, y: -11, rotate: -6 },
        { at: 0.84, x: 1, y: -7, ease: EASE.overshoot },
        { at: 0.96 },
        { at: 1 },
      ],
    },
    { part: 'handLeft', lag: PELAGO_LAG.hands, frames: [{ at: 0 }, { at: 0.12, y: -1, rotate: -8 }, { at: 0.85, y: -1, rotate: -8 }, { at: 0.95 }, { at: 1 }] },
    { part: 'eyes', lag: PELAGO_LAG.eyes, frames: [{ at: 0 }, { at: 0.14, y: -1.2 }, { at: 0.34, y: -2 }, { at: 0.54, y: -1.2 }, { at: 0.74, y: -2 }, { at: 0.86, y: -1 }, { at: 0.96 }, { at: 1 }] },
    { part: 'eyes', frames: [{ at: 0 }, { at: 0.1, x: 1.5 }, { at: 0.15, x: 1.5, scaleY: 0.45 }, { at: 0.8, x: 1.5, scaleY: 0.45 }, { at: 0.88 }, { at: 1 }] },
  ],
};

export { PELAGO_WAVE };
