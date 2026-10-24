/* @layer renderer-components @kind types */
import type { ToolbarItemBase } from '../Toolbar.type';

interface ToolbarTipProps {
  name: string;
  description?: string;
  shortcut?: ToolbarItemBase['shortcut'];
}

export type { ToolbarTipProps };
