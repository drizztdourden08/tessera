/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';
import { EASE } from '../../motion/motion.constants';

const SENTRI_WAVE: MascotAnimation = {
  name: 'Wave',
  summary: 'Says hello: leans away and lifts a little, raises the right pod and waves it three times with a happy squint, then lowers it with a swing.',
  duration: 2200,
  loop: false,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.12, y: -1, rotate: -5, ease: EASE.out },
        { at: 0.32, y: -1.5, rotate: -6 },
        { at: 0.52, y: -1, rotate: -5 },
        { at: 0.72, y: -1.5, rotate: -6 },
        { at: 0.85, y: -1, rotate: -5 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.12, scale: 0.92, opacity: 0.85 },
        { at: 0.85, scale: 0.92, opacity: 0.85 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0 },
        { at: 0.12, rotate: -75, ease: EASE.overshoot },
        { at: 0.22, rotate: -40 },
        { at: 0.32, rotate: -98 },
        { at: 0.42, rotate: -40 },
        { at: 0.52, rotate: -98 },
        { at: 0.62, rotate: -40 },
        { at: 0.72, rotate: -76 },
        { at: 0.84, rotate: -70, ease: EASE.overshoot },
        { at: 0.96 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0 },
        { at: 0.12, rotate: -6 },
        { at: 0.85, rotate: -6 },
        { at: 0.95 },
        { at: 1 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0 },
        { at: 0.1, x: 1 },
        { at: 0.15, x: 1, scaleY: 0.45 },
        { at: 0.8, x: 1, scaleY: 0.45 },
        { at: 0.88 },
        { at: 1 },
      ],
    },
  ],
};

export { SENTRI_WAVE };
