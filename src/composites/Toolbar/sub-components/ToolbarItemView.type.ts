/* @layer renderer-components @kind types */
import type { ToolbarItem, ToolbarNumber } from '../Toolbar.type';

interface ToolbarItemViewProps {
  item: ToolbarItem;
}

interface ToolbarNumberProps {
  item: ToolbarNumber;
}

export type { ToolbarItemViewProps, ToolbarNumberProps };
