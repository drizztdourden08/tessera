/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

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
  className?: string;
}

export type { InlineCreateFormProps };
