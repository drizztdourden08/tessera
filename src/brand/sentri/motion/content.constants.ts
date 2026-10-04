/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const SENTRI_CONTENT: MascotAnimation = {
  name: 'Content',
  summary: 'A soft squint: the eyes curve into gentle arches and Sentri rises and sinks slowly, easy and relaxed, the pods swaying a beat behind.',
  duration: 4000,
  loop: true,
  still: ['soft'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0 },
        { at: 0.5, y: -1.2, scaleX: 0.99, scaleY: 1.02 },
        { at: 1 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0 },
        { at: 0.5, scale: 0.9, opacity: 0.8 },
        { at: 1 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: -2 },
        { at: 0.55, rotate: 7 },
        { at: 1, rotate: -2 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: 2 },
        { at: 0.55, rotate: -7 },
        { at: 1, rotate: 2 },
      ],
    },
  ],
};

export { SENTRI_CONTENT };
