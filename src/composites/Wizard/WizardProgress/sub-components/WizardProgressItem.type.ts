/* @layer renderer-components @kind types */
import type { WizardOrientation, WizardProgressStep, WizardStepState } from '../WizardProgress.type';

interface WizardProgressItemProps {
  step: WizardProgressStep;
  number: number;
  state: WizardStepState;
  last: boolean;
  orientation: WizardOrientation;
  selectable: boolean;
  onSelect?: (id: string) => void;
  activeSubStepId?: string;
  onSubStepSelect?: (stepId: string, subStepId: string) => void;
}

export type { WizardProgressItemProps };
