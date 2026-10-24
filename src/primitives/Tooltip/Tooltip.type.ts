/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type TooltipFollow = 'anchor' | 'pointer';

type TooltipPlacement = 'top' | 'bottom' | 'right' | 'left';

interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  follow?: TooltipFollow;
  focusable?: boolean;
  children: ReactNode;
  className?: string;
}

export type { TooltipFollow, TooltipPlacement, TooltipProps };
