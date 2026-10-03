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

interface UtilityScreenFootnote {
  text: ReactNode;
  action?: ReactNode;
}

interface UtilityScreenProps {
  title: ReactNode;
  onClose: () => void;
  status: UtilityScreenStatus;
  progress?: UtilityScreenProgress;
  settings?: ReactNode;
  children?: ReactNode;
  footnote?: UtilityScreenFootnote;
  actions?: readonly UtilityScreenAction[];
  hidden?: boolean;
  className?: string;
}

export type { UtilityScreenAction, UtilityScreenFootnote, UtilityScreenProgress, UtilityScreenProps, UtilityScreenStatus, UtilityScreenTone };
