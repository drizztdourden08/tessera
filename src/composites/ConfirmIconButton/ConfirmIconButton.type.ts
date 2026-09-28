/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface ConfirmIconButtonProps {
  icon: ReactNode;
  label: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  disabled?: boolean;
  className?: string;
}

export type {
  ConfirmIconButtonProps,
};
