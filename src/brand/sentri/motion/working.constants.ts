/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_WORKING: MascotAnimation = {
  name: 'Working',
  summary: 'Busy at a laptop: sits behind it with its eyes on the screen, tapping the keys with quick pod strokes and nodding a little as it types.',
  duration: 1200,
  loop: true,
  still: ['laptop'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.2, y: 0.8, rotate: -1 },
        { at: 0.45 },
        { at: 0.6, y: 0.8, rotate: -1 },
        { at: 0.8 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: -2, y: 1 },
        { at: 0.46, x: -2, y: 1, ease: EASE.snap },
        { at: 0.5, x: -1, y: 1 },
        { at: 0.7, x: -1, y: 1, ease: EASE.snap },
        { at: 0.74, x: -2, y: 1 },
        { at: 1, x: -2, y: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: -8, ease: EASE.out },
        { at: 0.12, rotate: 8 },
        { at: 0.25, rotate: -8, ease: EASE.out },
        { at: 0.5, rotate: 8 },
        { at: 0.62, rotate: -8 },
        { at: 1, rotate: -8 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: 12, ease: EASE.out },
        { at: 0.12 },
        { at: 0.37, rotate: 12, ease: EASE.out },
        { at: 0.5 },
        { at: 0.75, rotate: 12, ease: EASE.out },
        { at: 0.87 },
        { at: 1, rotate: 12 },
      ],
    },
  ],
};

export { SENTRI_WORKING };
