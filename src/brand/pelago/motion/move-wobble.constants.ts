/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat } from '../pelago.type';
import { pebbleTracks } from '../pebble-tracks';

const STEP_LEFT: IsletBeat['moves'] = { a: { x: 0.6, y: -1.2 }, b: { y: 1 }, c: { y: -1.8, rotate: 8 } };
const STEP_RIGHT: IsletBeat['moves'] = { a: { y: 1 }, b: { x: -0.6, y: -1.2 }, d: { y: -1.8, rotate: -8 } };

const PELAGO_MOVE_WOBBLE: MascotAnimation = {
  name: 'Wobble',
  summary: 'Waddles along: the island rocks from side to side with a little hop on each step, the lower islets lift in turn like feet, the upper ones swing like arms, and the eyes sway with the rocking.',
  duration: 1600,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, x: -0.5, rotate: -6 },
        { at: 0.25, y: -1.6, ease: EASE.in },
        { at: 0.5, x: 0.5, rotate: 6 },
        { at: 0.75, y: -1.6, ease: EASE.in },
        { at: 1, x: -0.5, rotate: -6 },
      ],
    },
    { part: 'shadow', frames: [{ at: 0, x: -0.8 }, { at: 0.25, scale: 0.9 }, { at: 0.5, x: 0.8 }, { at: 0.75, scale: 0.9 }, { at: 1, x: -0.8 }] },
    { part: 'eyes', frames: [{ at: 0, x: -0.6 }, { at: 0.5, x: 0.6 }, { at: 1, x: -0.6 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.25, scale: 1.08 }, { at: 0.5 }, { at: 0.75, scale: 1.08 }, { at: 1 }] },
    ...isletTracks([{ at: 0, moves: STEP_LEFT }, { at: 0.25 }, { at: 0.5, moves: STEP_RIGHT }, { at: 0.75 }, { at: 1, moves: STEP_LEFT }], 100),
    ...pebbleTracks((i) => [{ at: 0, x: 0.6, rotate: 8 + i * 2 }, { at: 0.5, x: -0.6, rotate: -8 - i * 2 }, { at: 1, x: 0.6, rotate: 8 + i * 2 }], 160),
  ],
};

export { PELAGO_MOVE_WOBBLE };
