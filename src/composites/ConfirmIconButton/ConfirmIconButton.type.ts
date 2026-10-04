/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ConfirmIconButtonPlacement = 'start' | 'center' | 'end';

interface ConfirmIconButtonProps {
  icon: ReactNode;
  label: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  disabled?: boolean;
  defaultArmed?: boolean;
  placement?: ConfirmIconButtonPlacement;
  tabIndex?: number;
  className?: string;
}

export type {
  ConfirmIconButtonPlacement,
  ConfirmIconButtonProps,
};
