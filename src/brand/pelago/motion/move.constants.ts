/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { PELAGO_LAG } from '../pelago-lag.constants';

const STRIDE: readonly MotionFrame[] = [{ at: 0 }, { at: 0.25, y: -1.2 }, { at: 0.5 }, { at: 0.75, y: -1.2 }, { at: 1 }];

const trail = (side: 1 | -1, angle: number): readonly MotionFrame[] => [
  { at: 0, x: -1.5, y: -0.4, rotate: angle * side },
  { at: 0.25, x: -1.5, y: -0.4, rotate: (angle + 8) * side },
  { at: 0.5, x: -1.5, y: -0.4, rotate: angle * side },
  { at: 0.75, x: -1.5, y: -0.4, rotate: (angle + 8) * side },
  { at: 1, x: -1.5, y: -0.4, rotate: angle * side },
];

const PELAGO_MOVE: MascotAnimation = {
  name: 'Move',
  summary: 'Glides forward: leans into the travel and bobs twice a stride, the spheres stretch toward the front, the hands trail behind and the eyes look ahead.',
  duration: 1200,
  loop: true,
  tracks: [
    {
      part: 'body',
      frames: [
        { at: 0, y: -0.4, rotate: 6 },
        { at: 0.25, y: -1.6, rotate: 7, scaleX: 1.03, scaleY: 0.98 },
        { at: 0.5, y: -0.4, rotate: 6 },
        { at: 0.75, y: -1.6, rotate: 7, scaleX: 1.03, scaleY: 0.98 },
        { at: 1, y: -0.4, rotate: 6 },
      ],
    },
    { part: 'shadow', frames: [{ at: 0, x: 1, scale: 0.95 }, { at: 0.25, x: 1, scale: 0.88 }, { at: 0.5, x: 1, scale: 0.95 }, { at: 0.75, x: 1, scale: 0.88 }, { at: 1, x: 1, scale: 0.95 }] },
    { part: 'sphereRight', frames: [{ at: 0, x: 1.2 }, { at: 0.5, x: 1.8, ease: EASE.inOut }, { at: 1, x: 1.2 }] },
    { part: 'sphereLeft', frames: [{ at: 0, x: -0.6 }, { at: 0.5, x: -1.2 }, { at: 1, x: -0.6 }] },
    { part: 'eyes', lag: PELAGO_LAG.eyes / 2, frames: STRIDE },
    { part: 'eyes', frames: [{ at: 0, x: 2.5, y: 0.1 }, { at: 1, x: 2.5, y: 0.1 }] },
    { part: 'handLeft', lag: PELAGO_LAG.hands / 2, frames: STRIDE },
    { part: 'handRight', lag: PELAGO_LAG.hands / 2, frames: STRIDE },
    { part: 'handLeft', frames: trail(1, -14) },
    { part: 'handRight', frames: trail(-1, -22) },
  ],
};

export { PELAGO_MOVE };
