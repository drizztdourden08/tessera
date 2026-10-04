/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { driftFrames } from '../drift-frames';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat } from '../pelago.type';
import { threadGlow } from '../thread-glow';

const parked = (breath: number): IsletBeat['moves'] => ({
  a: { x: -2, y: 12 + breath, rotate: -14 },
  b: { x: 2, y: 11 + breath, rotate: 14 },
  c: { x: 1, y: 6.4 + breath, rotate: 8 },
  d: { x: -1, y: 6.8 + breath, rotate: -8 },
});

const LOW = { y: 4.2, scaleX: 1.03, scaleY: 0.95 } as const;

const PELAGO_RESTING: MascotAnimation = {
  name: 'Resting',
  summary: 'Lying down for a rest: the island settles low onto its ring and spreads a little, its islets set down on the ground around it on slack, dim threads, the eyes close, and it breathes slowly while two Zs drift up.',
  duration: 6400,
  loop: true,
  still: ['lidsShut', 'zeeSmall', 'zeeMid'],
  tracks: [
    { part: 'rig', frames: [{ at: 0, ...LOW }, { at: 0.5, y: 4.6, scaleX: 1.04, scaleY: 0.94 }, { at: 1, ...LOW }] },
    { part: 'shadow', frames: [{ at: 0, scale: 1.1 }, { at: 0.5, scale: 1.13 }, { at: 1, scale: 1.1 }] },
    { part: 'glow', frames: [{ at: 0, opacity: 0.4, scale: 0.9 }, { at: 0.5, opacity: 0.5, scale: 0.95 }, { at: 1, opacity: 0.4, scale: 0.9 }] },
    ...threadGlow([{ at: 0, opacity: 0.5 }, { at: 0.5, opacity: 0.58 }, { at: 1, opacity: 0.5 }]),
    ...isletTracks([{ at: 0, moves: parked(0) }, { at: 0.5, moves: parked(-0.3) }, { at: 1, moves: parked(0) }]),
    { part: 'zeeSmall', frames: driftFrames(0.1, 0.65, [-0.6, 3], [0.8, 0.4]) },
    { part: 'zeeMid', frames: driftFrames(0.3, 0.65, [-0.6, 3], [1, 0]) },
  ],
};

export { PELAGO_RESTING };
