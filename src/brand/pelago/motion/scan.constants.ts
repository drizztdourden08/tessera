/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat } from '../pelago.type';
import { PELAGO_LAG } from '../pelago-lag.constants';

const shift = (at: number, x: number, y = 0): IsletBeat => ({
  at,
  moves: { a: { x, y }, b: { x, y }, c: { x, y }, d: { x, y } },
});

const PELAGO_SCAN: MascotAnimation = {
  name: 'Look around',
  summary: 'Keeps watch: the crystal eyes glance left, blink across to the right, then look up; the island turns a moment after them and the islets shift the other way.',
  duration: 4000,
  loop: true,
  tracks: [
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.06, ease: EASE.snap },
        { at: 0.12, x: -1.6, y: 0.3 },
        { at: 0.3, x: -1.6, y: 0.3, ease: EASE.in },
        { at: 0.34, scaleY: 0.1, ease: EASE.out },
        { at: 0.4, x: 1.6, y: 0.3 },
        { at: 0.58, x: 1.6, y: 0.3, ease: EASE.snap },
        { at: 0.66, x: 0.3, y: -1.2 },
        { at: 0.84, x: 0.3, y: -1.2 },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    {
      part: 'island',
      lag: PELAGO_LAG.island,
      frames: [
        { at: 0 },
        { at: 0.12, x: -0.6, rotate: -3 },
        { at: 0.32, x: -0.6, rotate: -3 },
        { at: 0.42, x: 0.6, rotate: 3 },
        { at: 0.6, x: 0.6, rotate: 3 },
        { at: 0.68, y: -0.5 },
        { at: 0.84, y: -0.5 },
        { at: 0.94 },
        { at: 1 },
      ],
    },
    { part: 'shadow', lag: PELAGO_LAG.island, frames: [{ at: 0 }, { at: 0.12, x: -0.5 }, { at: 0.32, x: -0.5 }, { at: 0.42, x: 0.5 }, { at: 0.6, x: 0.5 }, { at: 0.68 }, { at: 1 }] },
    ...isletTracks([
      { at: 0 },
      shift(0.12, 0.5),
      shift(0.32, 0.5),
      shift(0.42, -0.5),
      shift(0.6, -0.5),
      shift(0.68, 0, 0.4),
      shift(0.84, 0, 0.4),
      { at: 0.94 },
      { at: 1 },
    ], PELAGO_LAG.islets + PELAGO_LAG.island),
  ],
};

export { PELAGO_SCAN };
