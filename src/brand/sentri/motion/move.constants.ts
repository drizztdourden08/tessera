/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const SENTRI_MOVE: MascotAnimation = {
  name: 'Move',
  summary: 'Hovers forward: leans into the travel, bobs twice a stride and holds its pods back like thrusters that flutter. The eyes look ahead.',
  duration: 1200,
  loop: true,
  tracks: [
    {
      part: 'rig',
      frames: [
        { at: 0, rotate: 7 },
        { at: 0.25, x: 0.6, y: -2, rotate: 9 },
        { at: 0.5, x: 1, rotate: 7 },
        { at: 0.75, x: 0.4, y: -2, rotate: 9 },
        { at: 1, rotate: 7 },
      ],
    },
    {
      part: 'shadow',
      frames: [
        { at: 0, x: 2 },
        { at: 0.25, x: 2.6, scale: 0.84, opacity: 0.75 },
        { at: 0.5, x: 3 },
        { at: 0.75, x: 2.4, scale: 0.84, opacity: 0.75 },
        { at: 1, x: 2 },
      ],
    },
    {
      part: 'podLeft',
      frames: [
        { at: 0, rotate: 24 },
        { at: 0.125, rotate: 31 },
        { at: 0.25, rotate: 22 },
        { at: 0.375, rotate: 30 },
        { at: 0.5, rotate: 24 },
        { at: 0.625, rotate: 31 },
        { at: 0.75, rotate: 22 },
        { at: 0.875, rotate: 30 },
        { at: 1, rotate: 24 },
      ],
    },
    {
      part: 'podRight',
      frames: [
        { at: 0, rotate: 14 },
        { at: 0.125, rotate: 19 },
        { at: 0.25, rotate: 12 },
        { at: 0.375, rotate: 18 },
        { at: 0.5, rotate: 14 },
        { at: 0.625, rotate: 19 },
        { at: 0.75, rotate: 12 },
        { at: 0.875, rotate: 18 },
        { at: 1, rotate: 14 },
      ],
    },
    {
      part: 'eyes',
      frames: [
        { at: 0, x: 2 },
        { at: 1, x: 2 },
      ],
    },
  ],
};

export { SENTRI_MOVE };
