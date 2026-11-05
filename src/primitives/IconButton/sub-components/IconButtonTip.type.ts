/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TooltipPlacement } from '../../Tooltip/Tooltip.type';

interface IconButtonTipProps {
  tooltip?: ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
}

export type { IconButtonTipProps };
