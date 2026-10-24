/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { OptionTooltip, TooltipPlacement } from '../Tooltip';

interface OptionTipProps {
  reason: string | undefined;
  name: ReactNode;
  tooltip: OptionTooltip | undefined;
  placement: TooltipPlacement;
  children: ReactNode;
}

export type { OptionTipProps };
