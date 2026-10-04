/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const SENTRI_HAPPY_GRIN: MascotAnimation = {
  name: 'Grin',
  summary: 'Grins with its eyes turned into little carets, bobbing gently up and down while the pods flap high on each bob.',
  duration: 1600,
  loop: true,
  still: ['grin'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, scaleX: 1.02, scaleY: 0.98 },
        { at: 0.25, y: -1.5, scaleX: 0.99, scaleY: 1.02 },
        { at: 0.5, scaleX: 1.02, scaleY: 0.98 },
        { at: 0.75, y: -1.5, scaleX: 0.99, scaleY: 1.02 },
        { at: 1, scaleX: 1.02, scaleY: 0.98 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.25, scale: 0.9, opacity: 0.85 },
        { at: 0.5 },
        { at: 0.75, scale: 0.9, opacity: 0.85 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: 6 },
        { at: 0.27, rotate: 26 },
        { at: 0.52, rotate: 6 },
        { at: 0.77, rotate: 26 },
        { at: 1, rotate: 6 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: -6 },
        { at: 0.27, rotate: -26 },
        { at: 0.52, rotate: -6 },
        { at: 0.77, rotate: -26 },
        { at: 1, rotate: -6 },
      ],
    },
  ],
};

export { SENTRI_HAPPY_GRIN };
