/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { PELAGO_LAG } from '../pelago-lag.constants';

const HOPS: readonly MotionFrame[] = [
  { at: 0 },
  { at: 0.08, y: 1, ease: EASE.snap },
  { at: 0.22, y: -5, ease: EASE.in },
  { at: 0.38, y: 0.5, ease: EASE.snap },
  { at: 0.52, y: -5, ease: EASE.in },
  { at: 0.68, y: 0.5 },
  { at: 0.82 },
  { at: 1 },
];

const flap = (side: 1 | -1): readonly MotionFrame[] => [
  { at: 0 },
  { at: 0.12, rotate: 70 * side },
  { at: 0.22, rotate: 50 * side },
  { at: 0.32, rotate: 75 * side },
  { at: 0.42, rotate: 50 * side },
  { at: 0.52, rotate: 75 * side },
  { at: 0.66, rotate: 40 * side, ease: EASE.overshoot },
  { at: 0.86 },
  { at: 1 },
];

const PELAGO_HAPPY: MascotAnimation = {
  name: 'Happy',
  summary: 'A little celebration: two quick hops that tip one way then the other, the spheres bounce against each other, the hands flap high and the eyes squeeze into a smile.',
  duration: 1500,
  loop: false,
  tracks: [
    {
      part: 'body',
      frames: [
        { at: 0 },
        { at: 0.08, y: 1, scaleX: 1.08, scaleY: 0.9, ease: EASE.snap },
        { at: 0.22, y: -5, rotate: -6, scaleX: 0.95, scaleY: 1.06, ease: EASE.in },
        { at: 0.38, y: 0.5, scaleX: 1.08, scaleY: 0.92, ease: EASE.snap },
        { at: 0.52, y: -5, rotate: 6, scaleX: 0.95, scaleY: 1.06, ease: EASE.in },
        { at: 0.68, y: 0.5, scaleX: 1.06, scaleY: 0.94 },
        { at: 0.82 },
        { at: 1 },
      ],
    },
    { part: 'sphereTop', frames: [{ at: 0 }, { at: 0.22, y: -1.2 }, { at: 0.38, y: 1 }, { at: 0.52, y: -1.2 }, { at: 0.68, y: 1 }, { at: 0.84 }, { at: 1 }] },
    { part: 'sphereLeft', frames: [{ at: 0 }, { at: 0.22, x: 1 }, { at: 0.38, x: -1 }, { at: 0.52, x: 1 }, { at: 0.68, x: -1 }, { at: 0.84 }, { at: 1 }] },
    { part: 'sphereRight', frames: [{ at: 0 }, { at: 0.22, x: -1 }, { at: 0.38, x: 1 }, { at: 0.52, x: -1 }, { at: 0.68, x: 1 }, { at: 0.84 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.22, scale: 0.72, opacity: 0.6 }, { at: 0.38 }, { at: 0.52, scale: 0.72, opacity: 0.6 }, { at: 0.68 }, { at: 1 }] },
    { part: 'eyes', lag: PELAGO_LAG.eyes / 2, frames: HOPS },
    { part: 'eyes', frames: [{ at: 0 }, { at: 0.08, scaleY: 0.35 }, { at: 0.76, scaleY: 0.35 }, { at: 0.86 }, { at: 1 }] },
    { part: 'handLeft', lag: PELAGO_LAG.hands / 2, frames: HOPS },
    { part: 'handRight', lag: PELAGO_LAG.hands / 2, frames: HOPS },
    { part: 'handLeft', frames: flap(1) },
    { part: 'handRight', frames: flap(-1) },
  ],
};

export { PELAGO_HAPPY };
