/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const FLINT_WORKING: MascotAnimation = {
  name: 'Working',
  summary: 'Busy at a laptop set down in front of it: both stone hands type on the keys in turn, the eyes read down along the screen line by line and snap back, the mouth pursed in concentration, and the stone bobs a little with the typing.',
  duration: 1600,
  loop: true,
  still: ['laptop'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: 0.2, scaleX: 1.01, scaleY: 0.99 },
        { at: 0.25 },
        { at: 0.5, y: 0.2, scaleX: 1.01, scaleY: 0.99 },
        { at: 0.75 },
        { at: 1, y: 0.2, scaleX: 1.01, scaleY: 0.99 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, x: 5, y: 0.8, rotate: -12 },
        { at: 0.12, x: 5, y: -0.5, rotate: -6 },
        { at: 0.25, x: 5.6, y: 0.8, rotate: -12 },
        { at: 0.37, x: 5.6, y: -0.5, rotate: -6 },
        { at: 0.5, x: 5, y: 0.8, rotate: -12 },
        { at: 0.62, x: 5, y: -0.5, rotate: -6 },
        { at: 0.75, x: 4.4, y: 0.8, rotate: -12 },
        { at: 0.87, x: 4.4, y: -0.5, rotate: -6 },
        { at: 1, x: 5, y: 0.8, rotate: -12 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, x: -5, y: -0.5, rotate: 6 },
        { at: 0.13, x: -5, y: 0.8, rotate: 12 },
        { at: 0.25, x: -5.4, y: -0.5, rotate: 6 },
        { at: 0.38, x: -5.4, y: 0.8, rotate: 12 },
        { at: 0.5, x: -4.6, y: -0.5, rotate: 6 },
        { at: 0.63, x: -4.6, y: 0.8, rotate: 12 },
        { at: 0.75, x: -5, y: -0.5, rotate: 6 },
        { at: 0.88, x: -5, y: 0.8, rotate: 12 },
        { at: 1, x: -5, y: -0.5, rotate: 6 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: -1, y: 0.9 },
        { at: 0.42, x: 1, y: 0.9, ease: EASE.snap },
        { at: 0.48, x: -1, y: 1 },
        { at: 0.9, x: 1, y: 1, ease: EASE.snap },
        { at: 0.96, x: -1, y: 0.9 },
        { at: 1, x: -1, y: 0.9 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, scaleX: 0.75, scaleY: 0.7 },
        { at: 1, scaleX: 0.75, scaleY: 0.7 },
      ],
    },
  ],
};

export { FLINT_WORKING };
