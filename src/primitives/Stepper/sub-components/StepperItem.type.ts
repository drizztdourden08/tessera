/* @layer renderer-components @kind types */
import type { StepperStatus, StepperStep } from '../Stepper.type';

interface StepperItemProps {
  step: StepperStep;
  number: number;
  status: StepperStatus;
  current: boolean;
  last: boolean;
  wave?: number;
  selectable: boolean;
  onSelect?: (id: string) => void;
  activeSubStepId?: string;
  onSubStepSelect?: (stepId: string, subStepId: string) => void;
}

export type { StepperItemProps };
