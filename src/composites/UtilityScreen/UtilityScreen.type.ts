/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ActionData } from '../../primitives/action-data';
import type { ButtonVariant } from '../../primitives/Button/Button.type';

type UtilityScreenTone = 'busy' | 'info' | 'success' | 'warning' | 'danger';

interface UtilityScreenStatus {
  tone: UtilityScreenTone;
  title: ReactNode;
  message?: ReactNode;
  error?: unknown;
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
  onSelect: () => void;
  label?: string;
  footnote?: ReactNode;
}

interface UtilityScreenAction extends Omit<ActionData<ButtonVariant>, 'confirm' | 'onCancel'> {
  loading?: boolean;
  retry?: boolean;
}

interface UtilityScreenProps {
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
