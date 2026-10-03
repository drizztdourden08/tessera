/* @layer renderer-components @kind types */
type StepperOrientation = 'horizontal' | 'vertical';

type StepperStatus = 'done' | 'current' | 'upcoming' | 'error';

type StepperDirection = 'still' | 'forward' | 'back';

interface StepperSubStep {
  id: string;
  label: string;
  count?: number;
}

interface StepperStep {
  id: string;
  label: string;
  summary?: string;
  subSteps?: readonly StepperSubStep[];
  error?: boolean;
}

interface StepperProps {
  steps: readonly StepperStep[];
  currentId: string;
  orientation?: StepperOrientation;
  compact?: boolean;
  canSelect?: (id: string) => boolean;
  onSelect?: (id: string) => void;
  activeSubStepId?: string;
  onSubStepSelect?: (stepId: string, subStepId: string) => void;
  label?: string;
  className?: string;
}

export type { StepperDirection, StepperOrientation, StepperProps, StepperStatus, StepperStep, StepperSubStep };
