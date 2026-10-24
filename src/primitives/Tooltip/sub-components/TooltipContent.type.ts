/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ShortcutKey } from '../../Shortcut';

interface OptionTooltip {
  description?: string;
  shortcut?: string | readonly ShortcutKey[];
}

interface TooltipContentProps extends OptionTooltip {
  name: ReactNode;
}

export type { OptionTooltip, TooltipContentProps };
