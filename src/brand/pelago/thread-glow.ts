/* @layer renderer-components @kind logic */
import type { MotionFrame, MotionTrack } from '../motion/motion.type';
import { PELAGO_RIG } from './pelago-rig.constants';

const threadGlow = (frames: readonly MotionFrame[]): MotionTrack[] => PELAGO_RIG.threads.map((thread) => ({ part: thread.id, frames }));

export { threadGlow };
