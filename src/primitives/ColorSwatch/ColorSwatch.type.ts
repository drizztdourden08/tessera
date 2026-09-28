/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ColorSwatchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  color: string;
  caption?: ReactNode;
  selected?: boolean;
  edited?: boolean;
  transparent?: boolean;
}

export type { ColorSwatchProps };
