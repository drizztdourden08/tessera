/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ControlSize } from '../../primitives/field-control/field-control.type';

interface InlineCreateFormProps {
  onCreate: (name: string) => void;
  onCancel?: () => void;
  extraFields?: ReactNode;
  canSubmit?: boolean;
  error?: ReactNode;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  submitLabel?: string;
  cancelLabel?: string;
  compact?: boolean;
  size?: ControlSize;
  className?: string;
}

export type { InlineCreateFormProps };
