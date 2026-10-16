/* @layer renderer-components @kind types */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

interface ToolFrameProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  toolbar?: ReactNode;
  padded?: boolean;
  children?: ReactNode;
}

export type { ToolFrameProps };
