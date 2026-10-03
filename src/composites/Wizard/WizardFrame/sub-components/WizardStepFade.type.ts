/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { StepperDirection } from '../../../../primitives/Stepper/Stepper.type';

interface WizardStepFadeProps {
  stepKey: string;
  direction: StepperDirection;
  children: ReactNode;
}

interface WizardFadeFrame {
  key: string;
  node: ReactNode;
}

export type { WizardFadeFrame, WizardStepFadeProps };
