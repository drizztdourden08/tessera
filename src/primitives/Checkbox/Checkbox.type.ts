/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export type { CheckboxProps };
