/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StepperOrientation } from '../../../../primitives/Stepper';

interface WizardFrameBodyProps {
  orientation: StepperOrientation;
  stepKey: string;
  title?: ReactNode;
  progress: ReactNode;
  step: ReactNode;
  nav: ReactNode;
  className: string;
}

export type { WizardFrameBodyProps };
