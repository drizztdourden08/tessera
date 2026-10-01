/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WizardApi, WizardValues } from '../wizard.type';
import type { WizardOrientation, WizardSubStep } from '../WizardProgress/WizardProgress.type';

type WizardPresentation = 'inline' | 'dialog';

interface WizardStepInfo {
  summary?: string;
  subSteps?: readonly WizardSubStep[];
}

interface WizardFrameProps<V extends WizardValues> {
  wizard: WizardApi<V>;
  onExit: () => void;
  title?: string;
  presentation?: WizardPresentation;
  open?: boolean;
  orientation?: WizardOrientation;
  compactProgress?: boolean;
  stepInfo?: Readonly<Record<string, WizardStepInfo>>;
  activeSubStepId?: string;
  onSubStepSelect?: (stepId: string, subStepId: string) => void;
  finishLabel?: string;
  busyLabel?: string;
  navExtra?: ReactNode;
  headerExtra?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export type { WizardFrameProps, WizardPresentation, WizardStepInfo };
