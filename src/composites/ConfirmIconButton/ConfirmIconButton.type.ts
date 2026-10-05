/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ConfirmIconButtonPlacement = 'start' | 'center' | 'end';

type ConfirmIconButtonSize = 'sm' | 'xs';

interface ConfirmIconButtonProps {
  icon: ReactNode;
  label: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onAsk?: () => void;
  disabled?: boolean;
  defaultArmed?: boolean;
  placement?: ConfirmIconButtonPlacement;
  size?: ConfirmIconButtonSize;
  tabIndex?: number;
  className?: string;
}

export type {
  ConfirmIconButtonPlacement,
  ConfirmIconButtonProps,
  ConfirmIconButtonSize,
};
