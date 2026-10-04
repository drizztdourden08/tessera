/* @layer renderer-components @kind types */
import type { IconName } from '../../Icon';
import type { StepperStatus, StepperStep, StepperTone } from '../Stepper.type';

interface StepperItemProps {
  step: StepperStep;
  number: number;
  status: StepperStatus;
  current: boolean;
  last: boolean;
  wave?: number;
  lineTone?: StepperTone;
  doneIcon?: IconName;
  selectable: boolean;
  onSelect?: (id: string) => void;
  activeSubStepId?: string;
  onSubStepSelect?: (stepId: string, subStepId: string) => void;
}

export type { StepperItemProps };
