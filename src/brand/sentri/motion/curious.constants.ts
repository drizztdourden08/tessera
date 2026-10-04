/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_CURIOUS: MascotAnimation = {
  name: 'Curious',
  summary: 'Wonders about something: tilts its head, a question mark hovers above and sways, and the eyes look up one way, then the other.',
  duration: 3200,
  loop: true,
  still: ['question'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, x: -1, rotate: -8 },
        { at: 0.5, x: -1, y: -1, rotate: -9 },
        { at: 1, x: -1, rotate: -8 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, x: -1 },
        { at: 0.5, x: -1, scale: 0.94 },
        { at: 1, x: -1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: -6 },
        { at: 0.5, rotate: -2 },
        { at: 1, rotate: -6 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: -14 },
        { at: 0.5, rotate: -22 },
        { at: 1, rotate: -14 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: 1, y: -1 },
        { at: 0.44, x: 1, y: -1, ease: EASE.snap },
        { at: 0.5, x: -1, y: -1 },
        { at: 0.94, x: -1, y: -1, ease: EASE.snap },
        { at: 1, x: 1, y: -1 },
      ],
    },
    {
      part: 'question',
      frames: [
        { at: 0 },
        { at: 0.25, y: -1.5, rotate: 6 },
        { at: 0.5 },
        { at: 0.75, y: -1.5, rotate: -6 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_CURIOUS };
