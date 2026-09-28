/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';

type FloatingLength = number | string;

interface FloatingPlacement {
  top?: FloatingLength;
  left?: FloatingLength;
  right?: FloatingLength;
  bottom?: FloatingLength;
  width?: FloatingLength;
}

interface FloatingProps extends HTMLAttributes<HTMLDivElement> {
  placement?: FloatingPlacement | null;
  children?: ReactNode;
}

export type { FloatingLength, FloatingPlacement, FloatingProps };
