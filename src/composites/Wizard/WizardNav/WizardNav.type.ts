/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../../../primitives/Icon';
import type { WizardStepButtons } from '../wizard.type';

interface WizardNavProps {
  isFirst: boolean;
  isLast: boolean;
  canGoNext: boolean;
  busy?: boolean;
  hint?: ReactNode;
  busyHint?: string;
  extra?: ReactNode;
  buttons?: WizardStepButtons;
  onCancel?: () => void;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  className?: string;
}

interface WizardNavLook {
  label: string;
  icon: IconName | null;
}

interface WizardNavLooks {
  cancel: WizardNavLook | null;
  back: WizardNavLook | null;
  next: WizardNavLook;
}

export type { WizardNavLook, WizardNavLooks, WizardNavProps };
