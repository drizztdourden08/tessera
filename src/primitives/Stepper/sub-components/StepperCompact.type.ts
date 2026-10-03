/* @layer renderer-components @kind types */
import type { StepperStep } from '../Stepper.type';

interface StepperCompactProps {
  steps: readonly StepperStep[];
  current: number;
  label: string;
  className: string;
}

export type { StepperCompactProps };
