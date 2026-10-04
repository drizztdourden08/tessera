/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { isletEach } from '../islet-each';
import { isletTracks } from '../islet-tracks';
import { pebbleTracks } from '../pebble-tracks';
import { threadGlow } from '../thread-glow';

const INWARD = { a: 1, b: -1, c: -1, d: 1 } as const;

const droop = (by: number) => isletEach((id) => ({ x: INWARD[id] * 0.8, y: by + (id === 'a' || id === 'b' ? 1.2 : 0), rotate: INWARD[id] * 10 }));

const PELAGO_LOW_POWER: MascotAnimation = {
  name: 'Low power',
  summary: 'Running on empty: a red low battery blinks over the spire, the eyelids droop, the island sags low, the islets hang down on dim threads, and the crystal glow flickers and nearly goes out before it struggles back.',
  duration: 4000,
  loop: true,
  still: ['battery', 'lidsTired'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: 2.2, rotate: 2, scaleY: 0.97 },
        { at: 0.5, y: 2.8, rotate: 3, scaleY: 0.96 },
        { at: 0.62, y: 3.4, rotate: 3.5, scaleY: 0.95 },
        { at: 0.72, y: 2.6, rotate: 2.5, scaleY: 0.96 },
        { at: 1, y: 2.2, rotate: 2, scaleY: 0.97 },
      ],
    },
    { part: 'shadow', frames: [{ at: 0, scale: 1.05 }, { at: 0.62, scale: 1.1 }, { at: 1, scale: 1.05 }] },
    {
      part: 'glow',
      frames: [
        { at: 0, opacity: 0.3, scale: 0.85 },
        { at: 0.3, opacity: 0.4, scale: 0.88 },
        { at: 0.58, opacity: 0.35, scale: 0.85 },
        { at: 0.6, opacity: 0.05, scale: 0.8 },
        { at: 0.64, opacity: 0.4, scale: 0.85 },
        { at: 0.66, opacity: 0.1, scale: 0.8 },
        { at: 0.7, opacity: 0.35, scale: 0.85 },
        { at: 1, opacity: 0.3, scale: 0.85 },
      ],
    },
    ...threadGlow([{ at: 0, opacity: 0.45 }, { at: 0.58, opacity: 0.45 }, { at: 0.6, opacity: 0.15 }, { at: 0.64, opacity: 0.45 }, { at: 0.66, opacity: 0.2 }, { at: 0.7, opacity: 0.45 }, { at: 1, opacity: 0.45 }]),
    ...isletTracks([{ at: 0, moves: droop(3.4) }, { at: 0.5, moves: droop(4) }, { at: 0.62, moves: droop(4.8) }, { at: 0.74, moves: droop(3.8) }, { at: 1, moves: droop(3.4) }], 250),
    { part: 'battery', frames: [{ at: 0 }, { at: 0.2, opacity: 0.3 }, { at: 0.4 }, { at: 0.6, opacity: 0.3 }, { at: 0.8 }, { at: 1 }] },
    ...pebbleTracks(() => [{ at: 0, y: 1 }, { at: 0.5, y: 1.4 }, { at: 1, y: 1 }]),
  ],
};

export { PELAGO_LOW_POWER };
