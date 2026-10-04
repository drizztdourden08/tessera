/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { driftFrames } from '../drift-frames';
import { isletEach } from '../islet-each';
import { isletTracks } from '../islet-tracks';
import { threadGlow } from '../thread-glow';

const ZEES = ['zeeSmall', 'zeeMid', 'zeeBig'] as const;

const droop = (by: number) => isletEach((id) => ({ y: by + (id === 'c' || id === 'd' ? 0.6 : 0) }));

const PELAGO_SLEEP: MascotAnimation = {
  name: 'Sleep',
  summary: 'Fast asleep: the eyes are shut, the island sinks a little and breathes slowly with its head tipped, the islets droop on dim threads, the crystal glow is low, and three Zs drift up one after another.',
  duration: 5600,
  loop: true,
  still: ['lidsShut', ...ZEES],
  tracks: [
    { part: 'rig', frames: [{ at: 0, y: 1.2, rotate: 3 }, { at: 0.5, y: 2, rotate: 3, scaleX: 1.01, scaleY: 0.98 }, { at: 1, y: 1.2, rotate: 3 }] },
    { part: 'shadow', frames: [{ at: 0, scale: 1.04 }, { at: 0.5, scale: 1.08 }, { at: 1, scale: 1.04 }] },
    { part: 'glow', frames: [{ at: 0, opacity: 0.35, scale: 0.92 }, { at: 0.5, opacity: 0.5, scale: 0.98 }, { at: 1, opacity: 0.35, scale: 0.92 }] },
    ...threadGlow([{ at: 0, opacity: 0.3 }, { at: 0.5, opacity: 0.42 }, { at: 1, opacity: 0.3 }]),
    ...isletTracks([{ at: 0, moves: droop(2.2) }, { at: 0.5, moves: droop(2.9) }, { at: 1, moves: droop(2.2) }], 400),
    ...ZEES.map((part, i) => ({ part, frames: driftFrames(0.05 + i * 0.16, 0.6, [-0.8, 1], [1, -1.6]) })),
  ],
};

export { PELAGO_SLEEP };
