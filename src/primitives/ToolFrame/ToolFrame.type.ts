/* @layer renderer-components @kind types */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

type ToolFramePlacement = 'top' | 'left' | 'right';

interface ToolFrameProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  toolbar?: ReactNode;
  toolbarPlacement?: ToolFramePlacement;
  padded?: boolean;
  shrink?: boolean;
  children?: ReactNode;
}

export type { ToolFramePlacement, ToolFrameProps };
