/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ShortcutSpec } from '../../Shortcut';

interface OptionTooltip {
  description?: string;
  shortcut?: ShortcutSpec;
}

interface TooltipContentProps extends OptionTooltip {
  name: ReactNode;
}

export type { OptionTooltip, TooltipContentProps };
