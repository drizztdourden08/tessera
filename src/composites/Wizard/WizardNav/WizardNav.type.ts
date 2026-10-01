/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface WizardNavProps {
  isFirst: boolean;
  isLast: boolean;
  canGoNext: boolean;
  busy?: boolean;
  hint?: ReactNode;
  extra?: ReactNode;
  onCancel?: () => void;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  cancelLabel?: string;
  backLabel?: string;
  nextLabel?: string;
  finishLabel?: string;
  busyLabel?: string;
  className?: string;
}

interface WizardNavLabels {
  cancel: string;
  back: string;
  next: string;
  finish: string;
}

export type { WizardNavLabels, WizardNavProps };
