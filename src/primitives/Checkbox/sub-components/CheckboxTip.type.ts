/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { OptionTooltip } from '../../Tooltip';

interface CheckboxTipProps {
  tooltip: string | OptionTooltip | undefined;
  name: ReactNode;
  children: ReactNode;
}

export type { CheckboxTipProps };
