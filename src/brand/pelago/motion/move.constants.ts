/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { isletTracks } from '../islet-tracks';
import type { IsletMove } from '../pelago.type';
import { PELAGO_LAG } from '../pelago-lag.constants';

const trail = (x: number, y: number): Record<'a' | 'b' | 'c' | 'd', IsletMove> => ({
  a: { x: x - 0.4, y: y - 0.3 },
  b: { x, y },
  c: { x: x + 0.3, y: y + 0.2 },
  d: { x: x - 0.6, y },
});

const PELAGO_MOVE: MascotAnimation = {
  name: 'Move',
  summary: 'Drifts forward: the island tips into the travel and bobs twice a stride, the islets trail a beat behind so their threads stretch, the pebbles swing back and the eyes look ahead.',
  duration: 1400,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: -0.4, rotate: 5 },
        { at: 0.25, y: -1.4, rotate: 6 },
        { at: 0.5, y: -0.4, rotate: 5 },
        { at: 0.75, y: -1.4, rotate: 6 },
        { at: 1, y: -0.4, rotate: 5 },
      ],
    },
    { part: 'shadow', frames: [{ at: 0, x: 1.5, scale: 0.94 }, { at: 0.25, x: 1.5, scale: 0.88 }, { at: 0.5, x: 1.5, scale: 0.94 }, { at: 0.75, x: 1.5, scale: 0.88 }, { at: 1, x: 1.5, scale: 0.94 }] },
    { part: 'eyes', frames: [{ at: 0, x: 1.3 }, { at: 1, x: 1.3 }] },
    ...isletTracks([
      { at: 0, moves: trail(-2.4, 0.2) },
      { at: 0.25, moves: trail(-3, 0.7) },
      { at: 0.5, moves: trail(-2.4, 0.2) },
      { at: 0.75, moves: trail(-3, 0.7) },
      { at: 1, moves: trail(-2.4, 0.2) },
    ], PELAGO_LAG.islets),
    ...(['pebbleA', 'pebbleB', 'pebbleC'] as const).map((part, i) => ({
      part,
      lag: PELAGO_LAG.pebbles,
      frames: [{ at: 0, x: -1.2 - i * 0.3, rotate: -10 }, { at: 0.5, x: -1.6 - i * 0.3, rotate: -14 }, { at: 1, x: -1.2 - i * 0.3, rotate: -10 }],
    })),
  ],
};

export { PELAGO_MOVE };
