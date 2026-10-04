/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_IDEA: MascotAnimation = {
  name: 'Idea',
  summary: 'Has an idea: a dark bulb appears above, then glows yellow with pulsing rays as Sentri pops up with its eyes raised and pods thrown up, and the bulb dims again before the next idea.',
  duration: 3000,
  loop: true,
  still: ['bulb', 'rays'],
  tracks: [
    {
      part: 'bulbOff',
      frames: [
        { at: 0, opacity: 1 },
        { at: 0.24, opacity: 1 },
        { at: 0.32 },
        { at: 0.9 },
        { at: 1, opacity: 1 },
      ],
    },
    {
      part: 'bulb',
      frames: [
        { at: 0, opacity: 0 },
        { at: 0.24, opacity: 0 },
        { at: 0.3, scale: 1.15 },
        { at: 0.38 },
        { at: 0.9 },
        { at: 1, opacity: 0 },
      ],
    },
    {
      part: 'rays',
      frames: [
        { at: 0, opacity: 0 },
        { at: 0.26, scale: 0.8, opacity: 0 },
        { at: 0.32, scale: 1.08 },
        { at: 0.42, opacity: 0.35 },
        { at: 0.52, scale: 1.06 },
        { at: 0.62, opacity: 0.35 },
        { at: 0.72 },
        { at: 0.88, opacity: 0 },
        { at: 1, opacity: 0 },
      ],
    },
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.24, ease: EASE.out },
        { at: 0.3, y: -2.5, scaleX: 0.95, scaleY: 1.06 },
        { at: 0.42, y: -1 },
        { at: 0.54 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: 1 },
        { at: 0.12, x: 1, ease: EASE.snap },
        { at: 0.16, x: -1 },
        { at: 0.26, x: -1, ease: EASE.snap },
        { at: 0.3, y: -1 },
        { at: 0.86, y: -1 },
        { at: 0.94 },
        { at: 1, x: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0 },
        { at: 0.24, rotate: -6 },
        { at: 0.31, rotate: 36 },
        { at: 0.42, rotate: 24 },
        { at: 0.54, rotate: 10 },
        { at: 0.86 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0 },
        { at: 0.24, rotate: 6 },
        { at: 0.31, rotate: -36 },
        { at: 0.42, rotate: -24 },
        { at: 0.54, rotate: -10 },
        { at: 0.86 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_IDEA };
