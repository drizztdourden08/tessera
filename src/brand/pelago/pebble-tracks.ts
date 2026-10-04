/* @layer renderer-components @kind logic */
import type { MotionFrame, MotionTrack } from '../motion/motion.type';

const pebbleTracks = (frames: (i: number) => readonly MotionFrame[], lag = 0): MotionTrack[] =>
  (['pebbleA', 'pebbleB', 'pebbleC'] as const).map((part, i) => ({ part, ...(lag ? { lag: lag + i * 40 } : {}), frames: frames(i) }));

export { pebbleTracks };
