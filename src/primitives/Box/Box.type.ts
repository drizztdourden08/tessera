/* @layer renderer-components @kind types */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  disabled?: boolean;
  open?: boolean;
  children?: ReactNode;
}

export type { BoxProps };
