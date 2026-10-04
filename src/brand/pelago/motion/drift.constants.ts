/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const PELAGO_DRIFT: MascotAnimation = {
  name: 'Drift',
  summary: 'Always on, under every animation: the three spheres drift on slow loops of their own, pressing together and pulling apart.',
  duration: 7200,
  loop: true,
  tracks: [
    {
      part: 'sphereTop',
      frames: [
        { at: 0 },
        { at: 0.25, x: 1.2, y: 0.8, scale: 1.04 },
        { at: 0.5, x: 0.3, y: 1.8, scale: 0.96 },
        { at: 0.75, x: -1.2, y: 0.5, scale: 1.02 },
        { at: 1 },
      ],
    },
    {
      part: 'sphereLeft',
      frames: [
        { at: 0 },
        { at: 0.2, x: -1, y: 1.2, scale: 0.96 },
        { at: 0.45, x: -2.2, y: -0.4, scale: 1.04 },
        { at: 0.7, x: -0.6, y: -1.4 },
        { at: 1 },
      ],
    },
    {
      part: 'sphereRight',
      frames: [
        { at: 0 },
        { at: 0.3, x: 1.6, y: -1, scale: 1.03 },
        { at: 0.55, x: 0.8, y: 1.2, scale: 0.97 },
        { at: 0.8, x: 2, y: 0.3 },
        { at: 1 },
      ],
    },
  ],
};

export { PELAGO_DRIFT };
