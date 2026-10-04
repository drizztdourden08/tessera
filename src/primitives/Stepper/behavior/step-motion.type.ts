/* @layer renderer-components @kind types */
import type { StepperDirection } from '../Stepper.type';

interface StepperMotion {
  from: number;
  direction: StepperDirection;
}

type StepperMotionKind = 'still' | 'step' | 'skip' | 'back';

export type { StepperMotion, StepperMotionKind };
