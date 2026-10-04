/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const SENTRI_FOCUSED: MascotAnimation = {
  name: 'Focused',
  summary: 'Concentrates: narrows its eyes, leans in and keeps a small mark of effort by its tip that bobs and fades as it thinks.',
  duration: 2400,
  loop: true,
  still: ['narrow', 'focus'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: 0.6, rotate: 2 },
        { at: 0.5, y: 1, rotate: 4 },
        { at: 1, y: 0.6, rotate: 2 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: -12 },
        { at: 0.5, rotate: -7 },
        { at: 1, rotate: -12 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: 12 },
        { at: 0.5, rotate: 7 },
        { at: 1, rotate: 12 },
      ],
    },
    {
      part: 'focus',
      frames: [
        { at: 0 },
        { at: 0.4, y: -1.5 },
        { at: 0.62, y: -2, opacity: 0.3 },
        { at: 0.82 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_FOCUSED };
