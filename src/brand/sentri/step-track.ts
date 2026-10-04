/* @layer renderer-components @kind logic */
import { EASE } from '../motion/motion.constants';
import type { MotionFrame, MotionTrack } from '../motion/motion.type';

const stepTrack = (part: string, frames: readonly MotionFrame[]): MotionTrack => ({ part, frames: frames.map((f) => ({ ease: EASE.step, ...f })) });

export { stepTrack };
