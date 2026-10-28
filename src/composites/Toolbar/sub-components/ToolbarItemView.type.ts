/* @layer renderer-components @kind types */
import type { ToolbarChoices, ToolbarContextEvent, ToolbarItem, ToolbarNumber, ToolbarPopover, ToolbarSeparator } from '../Toolbar.type';

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

interface ToolbarPopoverProps {
  item: ToolbarPopover;
  onContext?: (event: ToolbarContextEvent) => void;
}

interface ToolbarSeparatorViewProps {
  item: ToolbarSeparator;
}

export type { ToolbarGroupProps, ToolbarItemViewProps, ToolbarNumberProps, ToolbarPopoverProps, ToolbarSeparatorViewProps };
