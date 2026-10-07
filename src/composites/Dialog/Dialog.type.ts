/* @layer renderer-components @kind types */
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';

interface DialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmDisabled?: boolean;
  hideCancel?: boolean;
  variant?: 'danger' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
  id?: string;
  data?: DataAttributes;
  children?: React.ReactNode;
}

export type {
  DialogProps,
};
