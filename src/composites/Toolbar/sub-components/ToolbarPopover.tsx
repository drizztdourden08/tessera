/* @layer renderer-components @kind component */
import { TooltipContent } from '../../../primitives/Tooltip';
import { ToolbarTool } from './ToolbarTool';
import type { ToolbarPopoverProps } from './ToolbarItemView.type';

const ToolbarPopover = ({ item, onContext }: ToolbarPopoverProps) => (
  <ToolbarTool
    stopId={item.id}
    icon={item.icon}
    label={item.label}
    caption={item.caption}
    description={item.description}
    shortcut={item.shortcut}
    tip={<TooltipContent name={item.label} description={item.description} shortcut={item.shortcut} />}
    disabled={item.disabled}
    badge={item.badge}
    borrowed={item.borrowed}
    render={item.render}
    onContext={onContext}
  />
);

export { ToolbarPopover };
