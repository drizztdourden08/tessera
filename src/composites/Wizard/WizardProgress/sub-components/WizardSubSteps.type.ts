/* @layer renderer-components @kind types */
import type { WizardProgressStep } from '../WizardProgress.type';

interface WizardSubStepsProps {
  step: WizardProgressStep;
  enabled: boolean;
  activeId?: string;
  onSelect?: (stepId: string, subStepId: string) => void;
}

export type { WizardSubStepsProps };
