/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame, MotionTrack } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat, IsletId } from '../pelago.type';
import { PELAGO_RIG } from '../pelago-rig.constants';
import { sparkTrack } from '../spark-track';

const DIM = 0.25;
const DIMMED = 0.08;
const LIT = 0.84;
const PULSE = { a: 0.78, b: 0.3, c: 0.46, d: 0.62 } as const satisfies Record<IsletId, number>;
const LEGS: readonly (readonly [start: number, end: number])[] = [[0.12, 0.3], [0.3, 0.46], [0.46, 0.62], [0.62, 0.78]];

const legOf = (i: number): readonly [start: number, end: number] => LEGS[i] ?? [0, 0];

const ring = PELAGO_RIG.threads.filter((thread) => thread.from !== 'core');
const spokes = PELAGO_RIG.threads.filter((thread) => thread.from === 'core');

const dimUntil = (lit: number): readonly MotionFrame[] => [
  { at: 0 },
  { at: DIMMED, opacity: DIM },
  { at: lit, opacity: DIM, ease: EASE.out },
  { at: lit + 0.04 },
  { at: 1 },
];

const pulse = (id: IsletId): readonly IsletBeat[] => [
  { at: PULSE[id] },
  { at: PULSE[id] + 0.03, moves: { [id]: { scale: 1.2 } } },
  { at: PULSE[id] + 0.1 },
];

const threadLights: readonly MotionTrack[] = [
  ...ring.map((thread, i) => ({ part: thread.id, frames: dimUntil(legOf(i)[1]) })),
  ...spokes.map((thread) => ({ part: thread.id, frames: dimUntil(LIT) })),
];

const PELAGO_LINK: MascotAnimation = {
  name: 'Link',
  summary: 'Connects the worlds: every thread dims, then a spark of light runs around the ring from islet to islet, each thread lighting up behind it and each islet pulsing as it arrives; the spokes and the crystal flare last.',
  duration: 2600,
  loop: false,
  tracks: [
    ...threadLights,
    ...ring.map((thread, i) => sparkTrack(thread, ...legOf(i))),
    ...isletTracks([{ at: 0 }, ...pulse('b'), ...pulse('c'), ...pulse('d'), ...pulse('a'), { at: 1 }]),
    { part: 'glow', frames: [{ at: 0 }, { at: DIMMED, scale: 0.95, opacity: 0.55 }, { at: LIT, scale: 0.95, opacity: 0.55, ease: EASE.out }, { at: 0.9, scale: 1.35 }, { at: 0.97 }, { at: 1 }] },
    { part: 'island', frames: [{ at: 0 }, { at: LIT }, { at: 0.9, y: -0.8 }, { at: 1 }] },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.2, x: -0.4, y: -1 },
        { at: 0.38, x: 1.4 },
        { at: 0.54, y: 1 },
        { at: 0.7, x: -1.4 },
        { at: LIT },
        { at: 0.9, scale: 1.2 },
        { at: 1 },
      ],
    },
  ],
};

export { PELAGO_LINK };
