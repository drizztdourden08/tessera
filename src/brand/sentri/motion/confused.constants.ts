/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const SENTRI_CONFUSED: MascotAnimation = {
  name: 'Confused',
  summary: 'Puzzled: tilts hard to the right with arched eyes and rocks its head back and forth, while a question mark sways from side to side above it.',
  duration: 3200,
  loop: true,
  still: ['question', 'soft'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, x: 1, rotate: 12 },
        { at: 0.25, x: 1, y: -0.5, rotate: 8 },
        { at: 0.5, x: 1, rotate: 12 },
        { at: 0.75, x: 1, y: -0.5, rotate: 8 },
        { at: 1, x: 1, rotate: 12 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, x: 1 },
        { at: 0.25, x: 1, scale: 0.95 },
        { at: 0.5, x: 1 },
        { at: 0.75, x: 1, scale: 0.95 },
        { at: 1, x: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: 26 },
        { at: 0.5, rotate: 34 },
        { at: 1, rotate: 26 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: 8 },
        { at: 0.5, rotate: 3 },
        { at: 1, rotate: 8 },
      ],
    },
    {
      part: 'question',
      frames: [
        { at: 0 },
        { at: 0.25, x: 1, rotate: 8 },
        { at: 0.5 },
        { at: 0.75, x: -1, rotate: -8 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_CONFUSED };
