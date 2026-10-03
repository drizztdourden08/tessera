/* @layer renderer-components @kind types */
import type { StepperStep } from '../Stepper.type';

interface StepperSubStepsProps {
  step: StepperStep;
  enabled: boolean;
  activeId?: string;
  onSelect?: (stepId: string, subStepId: string) => void;
}

export type { StepperSubStepsProps };
