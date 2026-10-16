/* @layer renderer-components @kind types */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

type BoxSurface = 'sunken' | 'raised';

interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  surface?: BoxSurface;
  disabled?: boolean;
  open?: boolean;
  children?: ReactNode;
}

export type { BoxProps, BoxSurface };
