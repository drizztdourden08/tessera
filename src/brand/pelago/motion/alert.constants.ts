/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import { outwardMoves } from '../outward-moves';

const JOLT: readonly MotionFrame[] = [
  { at: 0 },
  { at: 0.06, y: 0.8, ease: EASE.snap },
  { at: 0.14, y: -2.4, ease: EASE.linear },
  { at: 0.2, x: -0.7, y: -2.2, ease: EASE.linear },
  { at: 0.26, x: 0.7, y: -2.2, ease: EASE.linear },
  { at: 0.32, x: -0.5, y: -2.2, ease: EASE.linear },
  { at: 0.38, x: 0.3, y: -2.2 },
  { at: 0.44, y: -2.2 },
  { at: 0.78, y: -2 },
  { at: 0.92 },
  { at: 1 },
];

const PULLED = outwardMoves(-5, { scale: 0.92 });

const PELAGO_ALERT: MascotAnimation = {
  name: 'Alert',
  summary: 'Startled: the island jolts up and shakes, the islets pull in close on short threads, the crystal glow flares and the eyes go wide and dart left and right, then it all eases back.',
  duration: 1600,
  loop: false,
  tracks: [
    { part: 'rig', frames: JOLT },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.06, scaleX: 1.06 }, { at: 0.14, scale: 0.8, opacity: 0.6 }, { at: 0.78, scale: 0.82, opacity: 0.65 }, { at: 0.92 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.1, scale: 1.4, ease: EASE.out }, { at: 0.3, scale: 1.25 }, { at: 0.76, scale: 1.2 }, { at: 0.92 }, { at: 1 }] },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.06, scaleY: 0.2, ease: EASE.snap },
        { at: 0.14, scale: 1.35 },
        { at: 0.46, scale: 1.3, ease: EASE.snap },
        { at: 0.5, x: -1.2, scale: 1.3 },
        { at: 0.6, x: -1.2, scale: 1.3, ease: EASE.snap },
        { at: 0.64, x: 1.2, scale: 1.3 },
        { at: 0.72, x: 1.2, scale: 1.3, ease: EASE.snap },
        { at: 0.76, scale: 1.3 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    ...isletTracks([{ at: 0 }, { at: 0.12, moves: PULLED, ease: EASE.snap }, { at: 0.76, moves: PULLED, ease: EASE.overshoot }, { at: 0.92 }, { at: 1 }]),
    ...(['pebbleA', 'pebbleB', 'pebbleC'] as const).map((part, i) => ({
      part,
      lag: 60 + i * 50,
      frames: [{ at: 0 }, { at: 0.14, y: -1.2 }, { at: 0.3, y: 0.8 }, { at: 0.44, y: -0.3 }, { at: 0.56 }, { at: 1 }],
    })),
  ],
};

export { PELAGO_ALERT };
