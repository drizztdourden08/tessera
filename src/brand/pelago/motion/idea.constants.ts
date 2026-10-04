/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import { outwardMoves } from '../outward-moves';
import { PELAGO_RIG } from '../pelago-rig.constants';
import { sparkTrack } from '../spark-track';
import { threadGlow } from '../thread-glow';

const LIGHT = 0.44;
const THINK = { x: -1, y: -1.1 } as const;
const SEE = { x: 0.4, y: -1.3 } as const;
const LEGS: readonly (readonly [start: number, end: number])[] = [[0.56, 0.64], [0.64, 0.72], [0.72, 0.8], [0.8, 0.88]];

const ring = PELAGO_RIG.threads.filter((thread) => thread.orbit);

const PELAGO_IDEA: MascotAnimation = {
  name: 'Idea',
  summary: 'Gets an idea: Pelago ponders with its eyes up and its threads dim, then a yellow bulb lights over the spire with rays, the crystal flares, the threads shine bright, the islets spring out and a spark runs round the ring.',
  duration: 2800,
  loop: true,
  still: ['bulb', 'rays'],
  tracks: [
    { part: 'rig', frames: [{ at: 0, rotate: -3 }, { at: LIGHT, y: 0.3, rotate: -4, ease: EASE.snap }, { at: 0.5, y: -2.4 }, { at: 0.6, y: -0.6 }, { at: 0.88, y: -0.6 }, { at: 1, rotate: -3 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: LIGHT }, { at: 0.5, scale: 0.85, opacity: 0.7 }, { at: 0.6, scale: 0.95 }, { at: 0.88, scale: 0.95 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0, opacity: 0.5, scale: 0.95 }, { at: LIGHT, opacity: 0.5, scale: 0.95, ease: EASE.snap }, { at: 0.5, scale: 1.45 }, { at: 0.62, scale: 1.2 }, { at: 0.88, scale: 1.2 }, { at: 1, opacity: 0.5, scale: 0.95 }] },
    {
      part: 'eyes',
      frames: [
        { at: 0, ...THINK },
        { at: 0.2, ...THINK, ease: EASE.in },
        { at: 0.23, ...THINK, scaleY: 0.1, ease: EASE.out },
        { at: 0.26, ...THINK },
        { at: LIGHT, ...THINK, ease: EASE.snap },
        { at: 0.49, ...SEE, scale: 1.3 },
        { at: 0.62, ...SEE, scale: 1.15 },
        { at: 0.88, ...SEE, scale: 1.15 },
        { at: 1, ...THINK },
      ],
    },
    { part: 'bulb', frames: [{ at: 0, opacity: 0, scale: 0.3, y: 2 }, { at: LIGHT, opacity: 0, scale: 0.3, y: 2, ease: EASE.overshoot }, { at: 0.5, opacity: 1 }, { at: 0.88, opacity: 1, ease: EASE.in }, { at: 0.96, opacity: 0, scale: 0.6, y: -1 }, { at: 1, opacity: 0, scale: 0.3, y: 2 }] },
    {
      part: 'rays',
      frames: [{ at: 0, opacity: 0, scale: 0.6 }, { at: 0.48, opacity: 0, scale: 0.6 }, { at: 0.54, scale: 1.15 }, { at: 0.62, opacity: 0.5 }, { at: 0.7, scale: 1.1 }, { at: 0.78, opacity: 0.5 }, { at: 0.86 }, { at: 0.92, opacity: 0, scale: 0.8 }, { at: 1, opacity: 0, scale: 0.6 }],
    },
    ...threadGlow([{ at: 0, opacity: 0.35 }, { at: LIGHT, opacity: 0.35, ease: EASE.snap }, { at: 0.5 }, { at: 0.9 }, { at: 0.98, opacity: 0.35 }, { at: 1, opacity: 0.35 }]),
    ...isletTracks([{ at: 0, moves: outwardMoves(-1) }, { at: LIGHT, moves: outwardMoves(-1.3), ease: EASE.snap }, { at: 0.49, moves: outwardMoves(2), ease: EASE.overshoot }, { at: 0.56 }, { at: 0.9 }, { at: 1, moves: outwardMoves(-1) }]),
    ...ring.map((thread, i) => sparkTrack(thread, ...(LEGS[i] ?? [0, 0]))),
  ],
};

export { PELAGO_IDEA };
