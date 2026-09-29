/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';

type ButtonGroupOrientation = 'horizontal' | 'vertical';

interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  orientation?: ButtonGroupOrientation;
  children: ReactNode;
}

export type { ButtonGroupOrientation, ButtonGroupProps };
