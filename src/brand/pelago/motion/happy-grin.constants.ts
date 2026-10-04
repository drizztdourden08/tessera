/* @layer renderer-components @kind data */
import type { MascotAnimation, MotionFrame } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat } from '../pelago.type';

const OPEN = { c: { x: -7, y: 1 }, d: { x: 7, y: 1.4 }, a: { y: -1 }, b: { y: -1 } } as const;
const CLAP = { c: { x: -15.2, y: 1.6, rotate: -8 }, d: { x: 15.2, y: 2, rotate: 8 }, a: { y: -2.2 }, b: { y: -2.2 } } as const;

const claps: readonly IsletBeat[] = [0.1, 0.3, 0.5].flatMap((at): IsletBeat[] => [
  { at, moves: OPEN, ease: EASE.in },
  { at: at + 0.1, moves: CLAP, ease: EASE.out },
]);

const chuckle: readonly MotionFrame[] = [0, 0.16, 0.32, 0.48].flatMap((at, i): MotionFrame[] => [
  { at: at + 0.08, y: -1.3, rotate: i % 2 ? 2 : -2 },
  { at: at + 0.16, ease: EASE.in },
]);

const PELAGO_HAPPY_GRIN: MascotAnimation = {
  name: 'Grin',
  summary: 'A big grin: the eyes close into happy arches over a wide smile, the island giggles with quick little bobs, and the lower islets clap together three times in front of it while the upper ones lift.',
  duration: 1800,
  loop: false,
  still: ['lidsSmile', 'grin'],
  tracks: [
    { part: 'rig', frames: [{ at: 0 }, ...chuckle, { at: 0.72, y: -0.6 }, { at: 0.84 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.08, scale: 0.92 }, { at: 0.64, scale: 0.92 }, { at: 0.8 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.1, scale: 1.28 }, { at: 0.76, scale: 1.28 }, { at: 0.9 }, { at: 1 }] },
    { part: 'grin', frames: [{ at: 0 }, { at: 0.2, scaleX: 1.15, scaleY: 1.25 }, { at: 0.3 }, { at: 0.4, scaleX: 1.15, scaleY: 1.25 }, { at: 0.5 }, { at: 0.6, scaleX: 1.15, scaleY: 1.25 }, { at: 0.72 }, { at: 1 }] },
    ...isletTracks([{ at: 0 }, ...claps, { at: 0.8, ease: EASE.overshoot }, { at: 1 }]),
  ],
};

export { PELAGO_HAPPY_GRIN };
