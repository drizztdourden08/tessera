/* @layer renderer-components @kind types */
import type { IconName } from '../Icon';
import type { TagCategoryColor } from '../Tag';

type StepperOrientation = 'horizontal' | 'vertical';

type StepperStatus = 'done' | 'current' | 'upcoming' | 'error';

type StepperDirection = 'still' | 'forward' | 'back';

type StepperTone = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info' | TagCategoryColor;

type StepperDoneIcon = IconName | false;

type StepperReserve = 'summaries' | 'none';

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
  tone?: StepperTone;
  doneIcon?: StepperDoneIcon;
}

interface StepperProps {
  steps: readonly StepperStep[];
  currentId: string;
  orientation?: StepperOrientation;
  compact?: boolean;
  tone?: StepperTone;
  doneIcon?: StepperDoneIcon;
  reserve?: StepperReserve;
  canSelect?: (id: string) => boolean;
  onSelect?: (id: string) => void;
  activeSubStepId?: string;
  onSubStepSelect?: (stepId: string, subStepId: string) => void;
  label?: string;
  className?: string;
}

export type { StepperDirection, StepperDoneIcon, StepperOrientation, StepperProps, StepperReserve, StepperStatus, StepperStep, StepperSubStep, StepperTone };
