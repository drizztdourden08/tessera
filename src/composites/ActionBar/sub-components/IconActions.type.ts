/* @layer renderer-components @kind types */
import type { ActionItem } from '../ActionBar.type';

interface IconActionsProps {
  actions?: readonly ActionItem[];
  className: string;
}

export type { IconActionsProps };
