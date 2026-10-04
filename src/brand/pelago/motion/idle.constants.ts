/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { PELAGO_LAG } from '../pelago-lag.constants';

const BOB: readonly MotionFrame[] = [
  { at: 0 },
  { at: 0.25, y: -1.6, scaleX: 0.985, scaleY: 1.025 },
  { at: 0.5 },
  { at: 0.75, y: -1.6, scaleX: 0.985, scaleY: 1.025 },
  { at: 1 },
];

const FOLLOW: readonly MotionFrame[] = [{ at: 0 }, { at: 0.25, y: -1.6 }, { at: 0.5 }, { at: 0.75, y: -1.6 }, { at: 1 }];

const sway = (side: 1 | -1): readonly MotionFrame[] => [
  { at: 0, rotate: 3 * side, ease: EASE.out },
  { at: 0.3, rotate: -4 * side },
  { at: 0.55, rotate: 4 * side },
  { at: 0.8, rotate: -4 * side, ease: EASE.in },
  { at: 1, rotate: 3 * side },
];

const PELAGO_IDLE: MascotAnimation = {
  name: 'Idle',
  summary: 'Hovers and breathes. The eyes and hands float a beat behind the body, the hands sway, the eyes glance right, blink, then glance left.',
  duration: 6000,
  loop: true,
  tracks: [
    { part: 'body', frames: BOB },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.25, scale: 0.88, opacity: 0.7 }, { at: 0.5 }, { at: 0.75, scale: 0.88, opacity: 0.7 }, { at: 1 }] },
    { part: 'eyes', lag: PELAGO_LAG.eyes, frames: FOLLOW },
    { part: 'handLeft', lag: PELAGO_LAG.hands, frames: FOLLOW },
    { part: 'handRight', lag: PELAGO_LAG.hands, frames: FOLLOW },
    { part: 'handLeft', frames: sway(1) },
    { part: 'handRight', frames: sway(-1) },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.17, ease: EASE.snap },
        { at: 0.21, x: 2.5 },
        { at: 0.37, x: 2.5, ease: EASE.snap },
        { at: 0.41 },
        { at: 0.56, ease: EASE.in },
        { at: 0.58, y: 0.4, scaleY: 0.08, ease: EASE.out },
        { at: 0.61 },
        { at: 0.76, ease: EASE.snap },
        { at: 0.81, x: -2.5, y: 0.5 },
        { at: 0.92, x: -2.5, y: 0.5, ease: EASE.snap },
        { at: 0.96 },
        { at: 1 },
      ],
    },
  ],
};

export { PELAGO_IDLE };
