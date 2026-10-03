/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ButtonVariant } from '../../primitives/Button/Button.type';

type UtilityScreenTone = 'busy' | 'info' | 'success' | 'warning' | 'danger';

interface UtilityScreenStatus {
  tone: UtilityScreenTone;
  title: ReactNode;
  message?: ReactNode;
}

interface UtilityScreenProgress {
  value: number;
  max?: number;
  label?: string;
}

interface UtilityScreenAction {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}

interface UtilityScreenProps {
  title: ReactNode;
  onClose: () => void;
  status: UtilityScreenStatus;
  progress?: UtilityScreenProgress;
  children?: ReactNode;
  actions?: readonly UtilityScreenAction[];
  hidden?: boolean;
  className?: string;
}

export type { UtilityScreenAction, UtilityScreenProgress, UtilityScreenProps, UtilityScreenStatus, UtilityScreenTone };
