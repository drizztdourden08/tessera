/* @layer renderer-components @kind types */
type WizardOrientation = 'horizontal' | 'vertical';

type WizardStepState = 'done' | 'current' | 'upcoming';

type WizardStepDirection = 'still' | 'forward' | 'back';

interface WizardSubStep {
  id: string;
  label: string;
  count?: number;
}

interface WizardProgressStep {
  id: string;
  label: string;
  summary?: string;
  subSteps?: readonly WizardSubStep[];
}

interface WizardProgressProps {
  steps: readonly WizardProgressStep[];
  currentId: string;
  orientation?: WizardOrientation;
  compact?: boolean;
  canSelect?: (id: string) => boolean;
  onSelect?: (id: string) => void;
  activeSubStepId?: string;
  onSubStepSelect?: (stepId: string, subStepId: string) => void;
  label?: string;
  className?: string;
}

interface WizardItemView {
  name: string;
  current: boolean;
  done: boolean;
  disabled: boolean;
  summary?: string;
  subSteps: readonly WizardSubStep[];
}

export type { WizardItemView, WizardOrientation, WizardProgressProps, WizardProgressStep, WizardStepDirection, WizardStepState, WizardSubStep };
