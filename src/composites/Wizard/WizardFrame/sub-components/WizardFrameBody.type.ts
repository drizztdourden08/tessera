/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WizardOrientation } from '../../WizardProgress/WizardProgress.type';
import type { WizardPresentation } from '../WizardFrame.type';

interface WizardFrameBodyProps {
  orientation: WizardOrientation;
  presentation: WizardPresentation;
  stepKey: string;
  title?: ReactNode;
  progress: ReactNode;
  step: ReactNode;
  nav: ReactNode;
  className: string;
}

export type { WizardFrameBodyProps };
