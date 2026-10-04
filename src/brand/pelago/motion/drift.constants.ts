/* @layer renderer-components @kind data */
import type { MascotAnimation } from '../../motion/motion.type';

const PELAGO_DRIFT: MascotAnimation = {
  name: 'Drift',
  summary: 'Always on, under every animation: the pebbles under the island drift and turn on slow loops of their own.',
  duration: 6000,
  loop: true,
  tracks: [
    { part: 'pebbleA', frames: [{ at: 0 }, { at: 0.3, x: 0.4, y: 0.7, rotate: 9 }, { at: 0.65, x: -0.3, y: 0.3, rotate: -7 }, { at: 1 }] },
    { part: 'pebbleB', frames: [{ at: 0 }, { at: 0.25, x: -0.3, y: 0.5, rotate: -10 }, { at: 0.6, x: 0.4, y: 0.9, rotate: 6 }, { at: 1 }] },
    { part: 'pebbleC', frames: [{ at: 0 }, { at: 0.4, y: 0.9, rotate: 14 }, { at: 0.75, x: 0.3, y: 0.4, rotate: -10 }, { at: 1 }] },
  ],
};

export { PELAGO_DRIFT };
