/* @layer renderer-components @kind types */
import type { ToolbarChoices, ToolbarItem, ToolbarNumber } from '../Toolbar.type';

interface ToolbarItemViewProps {
  item: ToolbarItem;
}

interface ToolbarNumberProps {
  item: ToolbarNumber;
}

interface ToolbarGroupProps {
  item: ToolbarChoices;
}

export type { ToolbarGroupProps, ToolbarItemViewProps, ToolbarNumberProps };
