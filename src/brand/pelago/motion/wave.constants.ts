/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';
import type { IsletBeat } from '../pelago.type';

const UP = { x: -5, y: -7.6 };

const swing = (at: number, side: 1 | -1): IsletBeat => ({
  at,
  moves: { b: { x: UP.x + 2 * side, y: UP.y - 0.4, rotate: 20 * side }, c: { y: -1 } },
});

const PELAGO_WAVE: MascotAnimation = {
  name: 'Wave',
  summary: 'Says hello: the upper right islet rises beside the face and rocks side to side like a waving hand, its threads following, while the island leans in and the eyes smile.',
  duration: 2400,
  loop: false,
  tracks: [
    { part: 'rig', frames: [{ at: 0 }, { at: 0.14, y: -0.8, rotate: 2.5, ease: EASE.out }, { at: 0.8, y: -0.8, rotate: 2.5 }, { at: 0.94 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.14, scale: 0.94, opacity: 0.85 }, { at: 0.8, scale: 0.94, opacity: 0.85 }, { at: 0.94 }, { at: 1 }] },
    { part: 'eyes', frames: [{ at: 0 }, { at: 0.1, x: 1, y: -0.5 }, { at: 0.16, x: 1, y: -0.5, scaleY: 0.45 }, { at: 0.78, x: 1, y: -0.5, scaleY: 0.45 }, { at: 0.88 }, { at: 1 }] },
    { part: 'glow', frames: [{ at: 0 }, { at: 0.16, scale: 1.08 }, { at: 0.8, scale: 1.08 }, { at: 0.94 }, { at: 1 }] },
    ...isletTracks([
      { at: 0 },
      { at: 0.14, moves: { b: UP, c: { y: -1 } }, ease: EASE.overshoot },
      swing(0.24, 1),
      swing(0.34, -1),
      swing(0.44, 1),
      swing(0.54, -1),
      swing(0.64, 1),
      { at: 0.74, moves: { b: UP, c: { y: -1 } }, ease: EASE.inOut },
      { at: 0.92 },
      { at: 1 },
    ]),
  ],
};

export { PELAGO_WAVE };
