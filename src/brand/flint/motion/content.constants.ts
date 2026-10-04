/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const FLINT_CONTENT: MascotAnimation = {
  name: 'Content',
  summary: 'Content and calm: eyes closed in soft happy arcs over a warm smile, the hands folded in front, it rocks slowly from one corner of its base to the other and breathes in time.',
  duration: 5200,
  loop: true,
  still: ['eyesHappy'],
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, y: -0.4, rotate: -2, scaleX: 1.01, scaleY: 0.99 },
        { at: 0.25, scaleX: 0.995, scaleY: 1.015 },
        { at: 0.5, y: -0.4, rotate: 2, scaleX: 1.01, scaleY: 0.99 },
        { at: 0.75, scaleX: 0.995, scaleY: 1.015 },
        { at: 1, y: -0.4, rotate: -2, scaleX: 1.01, scaleY: 0.99 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, x: -0.3, scaleX: 1.01 },
        { at: 0.25, scaleX: 0.99 },
        { at: 0.5, x: 0.3, scaleX: 1.01 },
        { at: 0.75, scaleX: 0.99 },
        { at: 1, x: -0.3, scaleX: 1.01 },
      ],
    },
    {
      part: 'handLeft',
      frames: [
        { at: 0, x: 3, y: 0.5, rotate: -14 },
        { at: 0.5, x: 3, y: 0.2, rotate: -10 },
        { at: 1, x: 3, y: 0.5, rotate: -14 },
      ],
    },
    {
      part: 'handRight',
      frames: [
        { at: 0, x: -3, y: 0.2, rotate: 10 },
        { at: 0.5, x: -3, y: 0.5, rotate: 14 },
        { at: 1, x: -3, y: 0.2, rotate: 10 },
      ],
    },
    {
      part: 'mouth',
      frames: [
        { at: 0, scaleX: 1.1, scaleY: 1.1 },
        { at: 0.5, scaleX: 1.15, scaleY: 1.2 },
        { at: 1, scaleX: 1.1, scaleY: 1.1 },
      ],
    },
  ],
};

export { FLINT_CONTENT };
