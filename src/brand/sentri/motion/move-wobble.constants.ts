/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_MOVE_WOBBLE: MascotAnimation = {
  name: 'Wobble',
  summary: 'Waddles in place: rocks left and right, lifting a little as it passes the middle, with wobble lines puffing on each lean. The eyes swing with it and break into a grin near the end of each waddle.',
  duration: 1200,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, x: -1, rotate: -6, ease: EASE.out },
        { at: 0.25, y: -1.2, scaleY: 1.02 },
        { at: 0.5, x: 1, rotate: 6, ease: EASE.out },
        { at: 0.75, y: -1.2, scaleY: 1.02 },
        { at: 1, x: -1, rotate: -6 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, x: -1 },
        { at: 0.25, scale: 0.92, opacity: 0.85 },
        { at: 0.5, x: 1 },
        { at: 0.75, scale: 0.92, opacity: 0.85 },
        { at: 1, x: -1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: 18 },
        { at: 0.25, rotate: 4 },
        { at: 0.5, rotate: -8 },
        { at: 0.75, rotate: 8 },
        { at: 1, rotate: 18 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: 8 },
        { at: 0.25, rotate: -6 },
        { at: 0.5, rotate: -18 },
        { at: 0.75, rotate: -4 },
        { at: 1, rotate: 8 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: -1 },
        { at: 0.46, ease: EASE.snap },
        { at: 0.52, x: 1 },
        { at: 0.96, x: 1, ease: EASE.snap },
        { at: 1, x: -1 },
      ],
    },
    {
      part: 'grin',
      frames: [
        { at: 0 },
        { at: 0.62 },
        { at: 0.68, opacity: 1 },
        { at: 0.9, opacity: 1 },
        { at: 0.96 },
        { at: 1 },
      ],
    },
    {
      part: 'whoosh',
      frames: [
        { at: 0, opacity: 0.9 },
        { at: 0.16, x: -1, opacity: 0 },
        { at: 0.44, opacity: 0 },
        { at: 0.5, opacity: 0.9 },
        { at: 0.66, x: 1, opacity: 0 },
        { at: 0.94, opacity: 0 },
        { at: 1, opacity: 0.9 },
      ],
    },
  ],
};

export { SENTRI_MOVE_WOBBLE };
