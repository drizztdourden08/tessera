/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import { outwardMoves } from '../outward-moves';
import { pebbleTracks } from '../pebble-tracks';

const PELAGO_JUMP_HOP: MascotAnimation = {
  name: 'Hop',
  summary: 'Two quick little hops: the islets tuck in close on short threads while the island is in the air and spring back out as it lands with a squash; the eyes squeeze shut on each landing.',
  duration: 1500,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.08, y: 1, ease: EASE.snap },
        { at: 0.24, y: -4.6, ease: EASE.in },
        { at: 0.38, y: 0.6, ease: EASE.snap },
        { at: 0.56, y: -3, ease: EASE.in },
        { at: 0.7, y: 0.5, ease: EASE.out },
        { at: 0.8, y: -0.3 },
        { at: 0.9 },
        { at: 1 },
      ],
    },
    {
      part: 'island',
      frames: [
        { at: 0 },
        { at: 0.08, scaleX: 1.05, scaleY: 0.95, ease: EASE.snap },
        { at: 0.2, scaleX: 0.97, scaleY: 1.04 },
        { at: 0.32 },
        { at: 0.38, scaleX: 1.06, scaleY: 0.94, ease: EASE.snap },
        { at: 0.5, scaleX: 0.98, scaleY: 1.03 },
        { at: 0.64 },
        { at: 0.7, scaleX: 1.05, scaleY: 0.95 },
        { at: 0.82 },
        { at: 1 },
      ],
    },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.08, scaleX: 1.06 }, { at: 0.24, scale: 0.74, opacity: 0.6 }, { at: 0.38, scaleX: 1.08 }, { at: 0.56, scale: 0.8, opacity: 0.65 }, { at: 0.7, scaleX: 1.06 }, { at: 0.84 }, { at: 1 }] },
    { part: 'eyes', frames: [{ at: 0 }, { at: 0.08, scaleY: 0.4, ease: EASE.snap }, { at: 0.2, scale: 1.1 }, { at: 0.38, scaleY: 0.45 }, { at: 0.5, scale: 1.1 }, { at: 0.7, scaleY: 0.45 }, { at: 0.84 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.24, scale: 1.14 }, { at: 0.38 }, { at: 0.56, scale: 1.12 }, { at: 0.72 }, { at: 1 }] },
    ...isletTracks([
      { at: 0 },
      { at: 0.08, moves: outwardMoves(0.6) },
      { at: 0.24, moves: outwardMoves(-2.6), ease: EASE.snap },
      { at: 0.38, moves: outwardMoves(1.4) },
      { at: 0.56, moves: outwardMoves(-2.2), ease: EASE.snap },
      { at: 0.7, moves: outwardMoves(1.2), ease: EASE.overshoot },
      { at: 0.84 },
      { at: 1 },
    ]),
    ...pebbleTracks((i) => [{ at: 0 }, { at: 0.24, y: 1.6 + 0.3 * i }, { at: 0.38, y: -0.6 }, { at: 0.56, y: 1.2 }, { at: 0.7, y: -0.4 }, { at: 0.84 }, { at: 1 }], 80),
  ],
};

export { PELAGO_JUMP_HOP };
