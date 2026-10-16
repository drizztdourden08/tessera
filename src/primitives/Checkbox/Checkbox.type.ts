/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ControlSize } from '../field-control/field-control.type';
import type { ControlLabelSize } from '../field-control/label-size.type';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  help?: ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: ControlSize;
  labelSize?: ControlLabelSize;
  className?: string;
}

export type { CheckboxProps };
