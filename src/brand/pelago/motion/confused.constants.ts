/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat } from '../pelago.type';
import { popFrames } from '../pop-frames';

const MUDDLE = { a: { y: -2.4, rotate: -15 }, b: { y: 1.6, rotate: 10 }, c: { x: -1.2, y: -0.6 }, d: { x: 1.2, y: 0.6 } } as const;
const SWAPPED = { a: { y: 1.6, rotate: 10 }, b: { y: -2.4, rotate: -15 }, c: { x: 1.2, y: 0.6 }, d: { x: -1.2, y: -0.6 } } as const;

const beat = (at: number, moves: IsletBeat['moves']): IsletBeat => ({ at, moves });

const PELAGO_CONFUSED: MascotAnimation = {
  name: 'Confused',
  summary: 'Puzzled: a question mark wobbles over the spire and a smaller one pops up beside it, the island tips one way then the other, the eyes dart about and blink, and the islets bob out of step on tangled threads.',
  duration: 2600,
  loop: true,
  still: ['question', 'questionSmall'],
  tracks: [
    { part: 'rig', frames: [{ at: 0, rotate: 6 }, { at: 0.3, x: -0.4, rotate: -5 }, { at: 0.5, rotate: -6 }, { at: 0.8, x: 0.4, rotate: 5 }, { at: 1, rotate: 6 }] },
    { part: 'shadow', frames: [{ at: 0, x: 0.5 }, { at: 0.5, x: -0.5 }, { at: 1, x: 0.5 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.3, opacity: 0.7 }, { at: 0.5 }, { at: 0.8, opacity: 0.7 }, { at: 1 }] },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: 1 },
        { at: 0.2, x: 1, ease: EASE.snap },
        { at: 0.25, x: -1, y: 0.4 },
        { at: 0.45, x: -1, y: 0.4, ease: EASE.in },
        { at: 0.48, x: -0.2, y: 0.2, scaleY: 0.1, ease: EASE.out },
        { at: 0.52, x: 0.6, y: -0.8 },
        { at: 0.75, x: 0.6, y: -0.8, ease: EASE.snap },
        { at: 0.8, x: 1 },
        { at: 1, x: 1 },
      ],
    },
    { part: 'question', frames: [{ at: 0, rotate: 12 }, { at: 0.5, y: -0.6, rotate: -12 }, { at: 1, rotate: 12 }] },
    { part: 'questionSmall', frames: popFrames(0.3, 0.76, { rotate: -10 }) },
    ...isletTracks([beat(0, MUDDLE), beat(0.5, SWAPPED), beat(1, MUDDLE)], 150),
  ],
};

export { PELAGO_CONFUSED };
