/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_CURIOUS: MascotAnimation = {
  name: 'Curious',
  summary: 'Wonders about something: a question mark bobs over its head while it tilts onto one corner, rests its right hand under its chin and looks up at it with a small round mouth, then tilts further, eyes widening, blinks and tilts back.',
  duration: 3600,
  loop: true,
  still: ['question'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: -0.9, rotate: -5 },
        { at: 0.4, y: -0.9, rotate: -5 },
        { at: 0.5, y: -1.5, rotate: -8 },
        { at: 0.75, y: -1.5, rotate: -8 },
        { at: 0.85, y: -0.9, rotate: -5 },
        { at: 1, y: -0.9, rotate: -5 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, x: -0.5, scaleX: 0.97 },
        { at: 0.4, x: -0.5, scaleX: 0.97 },
        { at: 0.5, x: -0.8, scaleX: 0.95 },
        { at: 0.75, x: -0.8, scaleX: 0.95 },
        { at: 0.85, x: -0.5, scaleX: 0.97 },
        { at: 1, x: -0.5, scaleX: 0.97 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, x: -13, y: 1.8, rotate: -28 },
        { at: 0.45, x: -13, y: 1.8, rotate: -28 },
        { at: 0.5, x: -13, y: 1.3, rotate: -33 },
        { at: 0.55, x: -13, y: 1.8, rotate: -28 },
        { at: 0.6, x: -13, y: 1.3, rotate: -33 },
        { at: 0.65, x: -13, y: 1.8, rotate: -28 },
        { at: 1, x: -13, y: 1.8, rotate: -28 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, rotate: -6 },
        { at: 0.5, y: 0.3, rotate: -9 },
        { at: 1, rotate: -6 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: -0.6, y: -1 },
        { at: 0.45, x: -0.6, y: -1 },
        { at: 0.5, x: -1, y: -1, scale: 1.12 },
        { at: 0.7, x: -1, y: -1, scale: 1.12, ease: EASE.in },
        { at: 0.72, x: -1, y: -1, scaleX: 1.12, scaleY: 0.1, ease: EASE.out },
        { at: 0.75, x: -1, y: -1, scale: 1.12 },
        { at: 0.85, x: -0.6, y: -1 },
        { at: 1, x: -0.6, y: -1 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, x: -0.4, scaleX: 0.6, scaleY: 0.9 },
        { at: 0.45, x: -0.4, scaleX: 0.6, scaleY: 0.9 },
        { at: 0.5, x: -0.6, scaleX: 0.5, scaleY: 1.4 },
        { at: 0.75, x: -0.6, scaleX: 0.5, scaleY: 1.4 },
        { at: 0.85, x: -0.4, scaleX: 0.6, scaleY: 0.9 },
        { at: 1, x: -0.4, scaleX: 0.6, scaleY: 0.9 },
      ],
    },
    {
      part: 'question',
      frames: [
        { at: 0 },
        { at: 0.25, y: -0.6, rotate: 6 },
        { at: 0.5, rotate: -4, scale: 1.12 },
        { at: 0.6 },
        { at: 0.75, y: -0.6, rotate: 6 },
        { at: 1 },
      ],
    },
  ],
};

export { FLINT_CURIOUS };
