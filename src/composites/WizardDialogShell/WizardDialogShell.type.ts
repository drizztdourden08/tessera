/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface WizardStep {
  label: string;
}

interface WizardDialogShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  headerExtra?: ReactNode;
  steps: WizardStep[];
  activeStep: number;
  onStepChange: (index: number) => void;
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export type { WizardStep, WizardDialogShellProps };
