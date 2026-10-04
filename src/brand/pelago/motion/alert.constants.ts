/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { PELAGO_LAG } from '../pelago-lag.constants';

const bunch = (x: number, y: number): readonly MotionFrame[] => [
  { at: 0 },
  { at: 0.1, x, y, scale: 0.94, ease: EASE.snap },
  { at: 0.76, x, y, scale: 0.94, ease: EASE.overshoot },
  { at: 0.92 },
  { at: 1 },
];

const raise = (side: 1 | -1): readonly MotionFrame[] => [
  { at: 0 },
  { at: 0.06, rotate: -8 * side, ease: EASE.snap },
  { at: 0.16, y: -2, rotate: 58 * side },
  { at: 0.3, y: -2, rotate: 50 * side, ease: EASE.linear },
  { at: 0.34, y: -2, rotate: 56 * side, ease: EASE.linear },
  { at: 0.38, y: -2, rotate: 48 * side, ease: EASE.linear },
  { at: 0.42, y: -2, rotate: 54 * side },
  { at: 0.76, y: -2, rotate: 52 * side, ease: EASE.overshoot },
  { at: 0.9 },
  { at: 1 },
];

const PELAGO_ALERT: MascotAnimation = {
  name: 'Alert',
  summary: 'Startled: the three spheres bunch tight together, the body pops up and trembles, the hands shoot up, the eyes go wide and dart left and right, then everything drifts apart again.',
  duration: 1600,
  loop: false,
  tracks: [
    {
      part: 'body',
      frames: [
        { at: 0 },
        { at: 0.07, y: 0.5, scaleX: 1.08, scaleY: 0.9, ease: EASE.snap },
        { at: 0.16, y: -4.5, scaleX: 0.9, scaleY: 1.1, ease: EASE.out },
        { at: 0.26, y: -3.8, scaleX: 0.96, ease: EASE.linear },
        { at: 0.31, x: -0.6, y: -3.8, ease: EASE.linear },
        { at: 0.36, x: 0.6, y: -3.6, ease: EASE.linear },
        { at: 0.41, x: -0.5, y: -3.8, ease: EASE.linear },
        { at: 0.46, x: 0.3, y: -3.6 },
        { at: 0.52, y: -3.8 },
        { at: 0.78, y: -3.4 },
        { at: 0.9, y: 0.3, ease: EASE.out },
        { at: 0.96, scaleX: 1.02, scaleY: 0.98 },
        { at: 1 },
      ],
    },
    { part: 'sphereTop', frames: bunch(-0.5, 2.6) },
    { part: 'sphereLeft', frames: bunch(2.6, -1.2) },
    { part: 'sphereRight', frames: bunch(-2.6, -1.8) },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.07, scaleX: 1.06, ease: EASE.snap }, { at: 0.16, scale: 0.72, opacity: 0.6 }, { at: 0.78, scale: 0.76, opacity: 0.65 }, { at: 0.9 }, { at: 1 }] },
    { part: 'eyes', lag: PELAGO_LAG.eyes / 2, frames: [{ at: 0 }, { at: 0.16, y: -4.5 }, { at: 0.26, y: -3.8 }, { at: 0.78, y: -3.4 }, { at: 0.9 }, { at: 1 }] },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.06, scaleY: 0.2, ease: EASE.snap },
        { at: 0.14, y: -1.5, scale: 1.3 },
        { at: 0.24, y: -1, scale: 1.18 },
        { at: 0.48, y: -1, scale: 1.18, ease: EASE.snap },
        { at: 0.51, x: -2.5, y: -1, scale: 1.18 },
        { at: 0.6, x: -2.5, y: -1, scale: 1.18, ease: EASE.snap },
        { at: 0.63, x: 2.5, y: -1, scale: 1.18 },
        { at: 0.72, x: 2.5, y: -1, scale: 1.18, ease: EASE.snap },
        { at: 0.75, y: -1, scale: 1.18 },
        { at: 0.85 },
        { at: 1 },
      ],
    },
    { part: 'handLeft', lag: PELAGO_LAG.hands / 2, frames: [{ at: 0 }, { at: 0.16, y: -4.5 }, { at: 0.26, y: -3.8 }, { at: 0.78, y: -3.4 }, { at: 0.9 }, { at: 1 }] },
    { part: 'handRight', lag: PELAGO_LAG.hands / 2, frames: [{ at: 0 }, { at: 0.16, y: -4.5 }, { at: 0.26, y: -3.8 }, { at: 0.78, y: -3.4 }, { at: 0.9 }, { at: 1 }] },
    { part: 'handLeft', frames: raise(1) },
    { part: 'handRight', frames: raise(-1) },
  ],
};

export { PELAGO_ALERT };
