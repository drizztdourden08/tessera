/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import { outwardMoves } from '../outward-moves';

const bounce = (drop: number): readonly MotionFrame[] => [
  { at: 0 },
  { at: 0.12, y: 0.5 * drop },
  { at: 0.34, y: 2.4 * drop, ease: EASE.in },
  { at: 0.62, y: 1.4 * drop, ease: EASE.out },
  { at: 0.7, y: -1.6 * drop, ease: EASE.out },
  { at: 0.8, y: 0.5 * drop },
  { at: 0.9 },
  { at: 1 },
];

const PELAGO_JUMP: MascotAnimation = {
  name: 'Jump',
  summary: 'A leap: the island dips, then rises high while the islets fling outward on stretched threads; they snap back as it lands with a small settle, and the pebbles bounce under it.',
  duration: 1800,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.12, y: 2, ease: EASE.snap },
        { at: 0.34, y: -9, ease: EASE.out },
        { at: 0.46, y: -9.5, ease: EASE.in },
        { at: 0.62, y: 0.4 },
        { at: 0.7, y: 1 },
        { at: 0.8, y: -0.4 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    { part: 'island', frames: [{ at: 0 }, { at: 0.12, scaleX: 1.05, scaleY: 0.95, ease: EASE.snap }, { at: 0.3, scaleX: 0.97, scaleY: 1.04 }, { at: 0.5 }, { at: 0.7, scaleX: 1.05, scaleY: 0.95 }, { at: 0.84 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.12, scaleX: 1.08 }, { at: 0.4, scale: 0.55, opacity: 0.4 }, { at: 0.62 }, { at: 0.7, scaleX: 1.1 }, { at: 0.9 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.34, scale: 1.12 }, { at: 0.6 }, { at: 1 }] },
    { part: 'eyes', frames: [{ at: 0 }, { at: 0.12, scaleY: 0.5, ease: EASE.snap }, { at: 0.3, y: -0.6, scale: 1.15 }, { at: 0.56, scale: 1.1 }, { at: 0.7, scaleY: 0.6 }, { at: 0.84 }, { at: 1 }] },
    ...isletTracks([
      { at: 0 },
      { at: 0.12, moves: outwardMoves(-0.8), ease: EASE.out },
      { at: 0.36, moves: outwardMoves(3.6), ease: EASE.inOut },
      { at: 0.5, moves: outwardMoves(3.2), ease: EASE.overshoot },
      { at: 0.66 },
      { at: 1 },
    ]),
    { part: 'pebbleA', frames: bounce(1) },
    { part: 'pebbleB', frames: bounce(1.25) },
    { part: 'pebbleC', frames: bounce(0.8) },
  ],
};

export { PELAGO_JUMP };
