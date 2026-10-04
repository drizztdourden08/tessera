/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import { outwardMoves } from '../outward-moves';
import { threadGlow } from '../thread-glow';

const DIM = 0.55;

const PELAGO_LOVE: MascotAnimation = {
  name: 'Love',
  summary: 'Smitten: a pink heart over the spire beats twice and rests, the crystal blushes and its glow beats with the heart, the threads flash bright on every beat, and the islets draw in close like a hug.',
  duration: 2400,
  loop: true,
  still: ['heart', 'blush'],
  tracks: [
    { part: 'rig', frames: [{ at: 0, rotate: -2 }, { at: 0.5, y: -0.6, rotate: 2 }, { at: 1, rotate: -2 }] },
    { part: 'shadow', frames: [{ at: 0, x: -0.4 }, { at: 0.5, x: 0.4, scale: 0.95 }, { at: 1, x: -0.4 }] },
    { part: 'heart', frames: [{ at: 0 }, { at: 0.08, scale: 1.32, ease: EASE.out }, { at: 0.18, scale: 0.94 }, { at: 0.26, scale: 1.2, ease: EASE.out }, { at: 0.4 }, { at: 0.7, y: -0.6 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0, scale: 1.1 }, { at: 0.08, scale: 1.42 }, { at: 0.18, scale: 1.1 }, { at: 0.26, scale: 1.32 }, { at: 0.4, scale: 1.1 }, { at: 1, scale: 1.1 }] },
    { part: 'eyes', frames: [{ at: 0, scaleX: 1.08, scaleY: 0.82 }, { at: 0.08, scale: 1.15 }, { at: 0.3, scaleX: 1.08, scaleY: 0.82 }, { at: 1, scaleX: 1.08, scaleY: 0.82 }] },
    ...threadGlow([{ at: 0, opacity: DIM }, { at: 0.08 }, { at: 0.18, opacity: 0.7 }, { at: 0.26 }, { at: 0.45, opacity: DIM }, { at: 1, opacity: DIM }]),
    ...isletTracks([
      { at: 0, moves: outwardMoves(-1) },
      { at: 0.08, moves: outwardMoves(-2.4, { scale: 1.1 }) },
      { at: 0.18, moves: outwardMoves(-1.2) },
      { at: 0.26, moves: outwardMoves(-2.1, { scale: 1.08 }) },
      { at: 0.42, moves: outwardMoves(-1) },
      { at: 1, moves: outwardMoves(-1) },
    ]),
  ],
};

export { PELAGO_LOVE };
