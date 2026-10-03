/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StepperOrientation } from '../../../primitives/Stepper';
import type { WizardApi, WizardValues } from '../wizard.type';

interface WizardFrameProps<V extends WizardValues> {
  wizard: WizardApi<V>;
  onExit: () => void;
  title?: string;
  orientation?: StepperOrientation;
  compactProgress?: boolean;
  activeSubStepId?: string;
  onSubStepSelect?: (stepId: string, subStepId: string) => void;
  headerExtra?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export type { WizardFrameProps };
