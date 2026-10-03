/* @layer renderer-components @kind types */
import type { StepperDirection } from '../Stepper.type';

interface StepperMotion {
  from: number;
  direction: StepperDirection;
}

export type { StepperMotion };
