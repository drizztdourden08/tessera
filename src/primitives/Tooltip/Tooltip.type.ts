/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type TooltipFollow = 'anchor' | 'pointer';

interface TooltipProps {
  content: ReactNode;
  placement?: 'top' | 'bottom';
  follow?: TooltipFollow;
  focusable?: boolean;
  children: ReactNode;
  className?: string;
}

export type { TooltipFollow, TooltipProps };
