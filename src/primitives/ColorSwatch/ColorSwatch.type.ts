/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

interface ColorSwatchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  color: string;
  caption?: ReactNode;
  selected?: boolean;
  edited?: boolean;
  transparent?: boolean;
  size?: ControlSize;
}

export type { ColorSwatchProps };
