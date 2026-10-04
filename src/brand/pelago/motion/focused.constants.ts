/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { PELAGO_RIG } from '../pelago-rig.constants';
import { sparkTrack } from '../spark-track';

const LEGS: readonly (readonly [start: number, end: number])[] = [[0.04, 0.26], [0.27, 0.49], [0.5, 0.72], [0.73, 0.95]];

const ring = PELAGO_RIG.threads.filter((thread) => thread.orbit);

const PELAGO_FOCUSED: MascotAnimation = {
  name: 'Focused',
  summary: 'Concentrating: the eyes narrow under level lids, the island leans in and holds still with its islets steady, and a spark of light circles the ring from islet to islet while the crystal glows bright.',
  duration: 3000,
  loop: true,
  still: ['lidsFocus'],
  tracks: [
    { part: 'rig', frames: [{ at: 0, y: 0.5 }, { at: 0.5, y: 0.2 }, { at: 1, y: 0.5 }] },
    { part: 'shadow', frames: [{ at: 0, scale: 1.02 }, { at: 1, scale: 1.02 }] },
    {
      part: 'glow',
      frames: [{ at: 0, scale: 1.15 }, { at: 0.26, scale: 1.24 }, { at: 0.36, scale: 1.15 }, { at: 0.49, scale: 1.24 }, { at: 0.6, scale: 1.15 }, { at: 0.72, scale: 1.24 }, { at: 0.84, scale: 1.15 }, { at: 0.95, scale: 1.24 }, { at: 1, scale: 1.15 }],
    },
    ...ring.map((thread, i) => sparkTrack(thread, ...(LEGS[i] ?? [0, 0]))),
  ],
};

export { PELAGO_FOCUSED };
