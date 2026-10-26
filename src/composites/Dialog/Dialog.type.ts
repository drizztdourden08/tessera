/* @layer renderer-components @kind types */
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
import type { DialogSize } from '../DialogShell/DialogShell.type';

interface DialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmDisabled?: boolean;
  hideCancel?: boolean;
  variant?: 'danger' | 'default';
  size?: DialogSize;
  steady?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  id?: string;
  data?: DataAttributes;
  children?: React.ReactNode;
}

export type {
  DialogProps,
};
