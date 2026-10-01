/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: ControlSize;
  className?: string;
}

export type { CheckboxProps };
