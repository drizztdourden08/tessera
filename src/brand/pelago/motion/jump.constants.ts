/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { PELAGO_LAG } from '../pelago-lag.constants';

const ARC: readonly MotionFrame[] = [
  { at: 0 },
  { at: 0.12, y: 2, ease: EASE.snap },
  { at: 0.3, y: -7, ease: EASE.out },
  { at: 0.45, y: -8, ease: EASE.in },
  { at: 0.62, y: 0.5 },
  { at: 0.72, y: 1 },
  { at: 0.84, y: -0.5 },
  { at: 0.94 },
  { at: 1 },
];

const fling = (side: 1 | -1): readonly MotionFrame[] => [
  { at: 0 },
  { at: 0.12, rotate: -12 * side, ease: EASE.snap },
  { at: 0.32, rotate: 55 * side },
  { at: 0.5, rotate: 45 * side },
  { at: 0.66, rotate: -10 * side, ease: EASE.overshoot },
  { at: 0.86 },
  { at: 1 },
];

const PELAGO_JUMP: MascotAnimation = {
  name: 'Jump',
  summary: 'A soft hop: the spheres squash to wind up, stretch tall as it springs, float at the top with the hands flung up, then land in a wobble. The eyes and hands catch up a moment late.',
  duration: 1800,
  loop: false,
  tracks: [
    {
      part: 'body',
      frames: [
        { at: 0 },
        { at: 0.12, y: 2, scaleX: 1.1, scaleY: 0.88, ease: EASE.snap },
        { at: 0.3, y: -7, scaleX: 0.92, scaleY: 1.1, ease: EASE.out },
        { at: 0.45, y: -8, ease: EASE.in },
        { at: 0.62, y: 0.5 },
        { at: 0.72, y: 1, scaleX: 1.1, scaleY: 0.9 },
        { at: 0.84, y: -0.5, scaleX: 0.97, scaleY: 1.03 },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    { part: 'sphereTop', frames: [{ at: 0 }, { at: 0.12, y: 1.5 }, { at: 0.3, y: -1.8 }, { at: 0.5 }, { at: 0.72, y: 1.2 }, { at: 0.9 }, { at: 1 }] },
    { part: 'sphereLeft', frames: [{ at: 0 }, { at: 0.12, x: -1 }, { at: 0.3, x: 0.8, y: 0.8 }, { at: 0.5 }, { at: 0.72, x: -1.2 }, { at: 0.9 }, { at: 1 }] },
    { part: 'sphereRight', frames: [{ at: 0 }, { at: 0.12, x: 1 }, { at: 0.3, x: -0.8, y: 0.8 }, { at: 0.5 }, { at: 0.72, x: 1.2 }, { at: 0.9 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.12, scaleX: 1.08 }, { at: 0.38, scale: 0.6, opacity: 0.5 }, { at: 0.62 }, { at: 0.72, scaleX: 1.08 }, { at: 0.9 }, { at: 1 }] },
    { part: 'eyes', lag: PELAGO_LAG.eyes / 2, frames: ARC },
    { part: 'eyes', frames: [{ at: 0 }, { at: 0.12, scaleY: 0.5, ease: EASE.snap }, { at: 0.3, y: -1, scale: 1.12 }, { at: 0.5, scale: 1.12 }, { at: 0.7, scaleY: 0.8 }, { at: 0.86 }, { at: 1 }] },
    { part: 'handLeft', lag: PELAGO_LAG.hands / 2, frames: ARC },
    { part: 'handRight', lag: PELAGO_LAG.hands / 2, frames: ARC },
    { part: 'handLeft', frames: fling(1) },
    { part: 'handRight', frames: fling(-1) },
  ],
};

export { PELAGO_JUMP };
