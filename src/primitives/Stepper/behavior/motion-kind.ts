/* @layer renderer-components @kind util */
import type { StepperMotion, StepperMotionKind } from './step-motion.type';

const motionKind = (motion: StepperMotion, current: number): StepperMotionKind => {
  if (motion.direction === 'back') return 'back';
  if (motion.direction === 'still') return 'still';
  return current - motion.from > 1 ? 'skip' : 'step';
};

export { motionKind };
