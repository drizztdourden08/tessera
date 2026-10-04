/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';
import { isletTracks } from '../islet-tracks';

const OUT = { x: 8, y: -0.4 };
const JAB = { x: 9.6, y: -0.4 };

const PELAGO_POINT: MascotAnimation = {
  name: 'Point',
  summary: 'Shows the way: the upper right islet shoots out to the side and holds there on a taut thread, jabbing twice, while the island leans after it and the eyes look where it points.',
  duration: 2200,
  loop: false,
  tracks: [
    { part: 'rig', frames: [{ at: 0 }, { at: 0.14, y: -0.6, rotate: 2, ease: EASE.out }, { at: 0.8, y: -0.6, rotate: 2 }, { at: 0.92 }, { at: 1 }] },
    { part: 'shadow', frames: [{ at: 0 }, { at: 0.16, x: 0.8, scale: 0.95 }, { at: 0.8, x: 0.8, scale: 0.95 }, { at: 0.94 }, { at: 1 }] },
    { part: 'island', frames: [{ at: 0 }, { at: 0.14, x: 0.5 }, { at: 0.8, x: 0.5 }, { at: 0.92 }, { at: 1 }] },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.1, x: 1.6, y: -0.3 },
        { at: 0.6, x: 1.6, y: -0.3, ease: EASE.in },
        { at: 0.62, x: 1.6, y: -0.3, scaleY: 0.15, ease: EASE.out },
        { at: 0.64, x: 1.6, y: -0.3 },
        { at: 0.8, x: 1.6, y: -0.3 },
        { at: 0.88 },
        { at: 1 },
      ],
    },
    ...isletTracks([
      { at: 0 },
      { at: 0.14, moves: { b: OUT }, ease: EASE.snap },
      { at: 0.3, moves: { b: OUT }, ease: EASE.snap },
      { at: 0.36, moves: { b: JAB }, ease: EASE.out },
      { at: 0.44, moves: { b: OUT }, ease: EASE.snap },
      { at: 0.5, moves: { b: JAB }, ease: EASE.out },
      { at: 0.58, moves: { b: OUT } },
      { at: 0.8, moves: { b: OUT }, ease: EASE.inOut },
      { at: 0.94 },
      { at: 1 },
    ]),
  ],
};

export { PELAGO_POINT };
