/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ButtonVariant } from '../../primitives/Button/Button.type';

type UtilityScreenTone = 'busy' | 'info' | 'success' | 'warning' | 'danger';

interface UtilityScreenStatus {
  tone: UtilityScreenTone;
  title: ReactNode;
  message?: ReactNode;
  icon?: ReactNode;
}

interface UtilityScreenProgress {
  value: number;
  max?: number;
  label?: string;
}

interface UtilityScreenNotes {
  title: ReactNode;
  children: ReactNode;
}

interface UtilityScreenReport {
  onClick: () => void;
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
  settings?: ReactNode;
  notes?: UtilityScreenNotes;
  children?: ReactNode;
  report?: UtilityScreenReport;
  actions?: readonly UtilityScreenAction[];
  backdrop?: ReactNode;
  hidden?: boolean;
  className?: string;
}

export type {
  UtilityScreenAction, UtilityScreenNotes, UtilityScreenProgress, UtilityScreenProps, UtilityScreenReport, UtilityScreenStatus, UtilityScreenTone,
};
