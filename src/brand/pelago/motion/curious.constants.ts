/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat } from '../pelago.type';

const LOOK = { x: 1, y: -1 } as const;

const scratch = (at: number, lift: number): IsletBeat => ({
  at,
  moves: { b: { x: -2.2, y: -4 - lift, rotate: -14 - lift * 10 }, a: { y: -0.6 }, c: { y: -0.4 } },
});

const PELAGO_CURIOUS: MascotAnimation = {
  name: 'Curious',
  summary: 'Wonders about something: a question mark floats over the spire and rocks, the island tilts its head, the eyes look up at the mark and blink, and the upper right islet lifts to scratch its head.',
  duration: 3200,
  loop: true,
  still: ['question'],
  tracks: [
    { part: 'rig', frames: [{ at: 0, rotate: -7 }, { at: 0.5, y: -0.5, rotate: -9 }, { at: 1, rotate: -7 }] },
    { part: 'shadow', frames: [{ at: 0, x: -0.6 }, { at: 0.5, x: -0.8, scale: 0.95 }, { at: 1, x: -0.6 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.3, scale: 1.1 }, { at: 0.6 }, { at: 0.8, scale: 1.1 }, { at: 1 }] },
    {
      part: 'eyes',
      frames: [
        { at: 0, ...LOOK },
        { at: 0.3, ...LOOK, ease: EASE.in },
        { at: 0.33, ...LOOK, scaleY: 0.1, ease: EASE.out },
        { at: 0.36, ...LOOK },
        { at: 0.6, x: 0.2, y: -1.2, scale: 1.1 },
        { at: 0.8, ...LOOK },
        { at: 1, ...LOOK },
      ],
    },
    { part: 'question', frames: [{ at: 0, rotate: -6 }, { at: 0.5, y: -0.8, rotate: 6 }, { at: 1, rotate: -6 }] },
    ...isletTracks([scratch(0, 0), scratch(0.15, 0.8), scratch(0.3, 0), scratch(0.45, 0.8), scratch(0.6, 0), scratch(1, 0)], 120),
  ],
};

export { PELAGO_CURIOUS };
