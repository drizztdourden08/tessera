/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { driftFrames } from '../drift-frames';
import { isletTracks } from '../islet-tracks';
import { outwardMoves } from '../outward-moves';

const SMALL = { y: 0.6, scale: 0.97 } as const;
const HUDDLE = outwardMoves(-4.6, { scale: 0.9 });
const SHIVER = outwardMoves(-4, { scale: 0.9 });

const tremble = (start: number): readonly MotionFrame[] =>
  [0.04, 0.08, 0.12, 0.16, 0.2].map((step, i) => ({ at: start + step, ...SMALL, x: i % 2 ? -0.3 : 0.3, ease: EASE.linear }));

const PELAGO_WORRIED: MascotAnimation = {
  name: 'Worried',
  summary: 'Anxious: the brows tip up over the eyes, sweat drops run down beside the spire, the island shrinks and trembles, its islets huddle in close on short threads, and the crystal glow flickers low.',
  duration: 2000,
  loop: true,
  still: ['sweatLeft', 'sweatRight', 'lidsWorried'],
  tracks: [
    { part: 'rig', frames: [{ at: 0, ...SMALL }, ...tremble(0), { at: 0.3, ...SMALL }, { at: 0.5, ...SMALL }, ...tremble(0.5), { at: 0.8, ...SMALL }, { at: 1, ...SMALL }] },
    { part: 'shadow', frames: [{ at: 0, scale: 0.95 }, { at: 1, scale: 0.95 }] },
    { part: 'glow', frames: [{ at: 0, opacity: 0.55, scale: 0.95 }, { at: 0.15, opacity: 0.75 }, { at: 0.3, opacity: 0.5 }, { at: 0.6, opacity: 0.72 }, { at: 1, opacity: 0.55, scale: 0.95 }] },
    ...isletTracks([{ at: 0, moves: HUDDLE }, { at: 0.12, moves: SHIVER }, { at: 0.24, moves: HUDDLE }, { at: 0.62, moves: SHIVER }, { at: 0.74, moves: HUDDLE }, { at: 1, moves: HUDDLE }]),
    { part: 'sweatLeft', frames: driftFrames(0.04, 0.6, [0, -0.6], [-0.5, 2.8]) },
    { part: 'sweatRight', frames: driftFrames(0.36, 0.6, [0, -0.6], [0.5, 2.6]) },
  ],
};

export { PELAGO_WORRIED };
