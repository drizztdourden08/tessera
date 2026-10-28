/* @layer renderer-components @kind types */
import type { ToolbarChoices, ToolbarContextEvent, ToolbarItem, ToolbarNumber } from '../Toolbar.type';

interface ToolbarItemViewProps {
  item: ToolbarItem;
}

interface ToolbarNumberProps {
  item: ToolbarNumber;
  onContext?: (event: ToolbarContextEvent) => void;
}

interface ToolbarGroupProps {
  item: ToolbarChoices;
  onContext?: (event: ToolbarContextEvent) => void;
}

export type { ToolbarGroupProps, ToolbarItemViewProps, ToolbarNumberProps };
