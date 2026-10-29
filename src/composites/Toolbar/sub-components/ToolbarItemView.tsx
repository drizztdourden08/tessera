/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { TooltipContent } from '../../../primitives/Tooltip';
import { contextHandler } from '../behavior/context-handler';
import { ToolbarContext } from '../behavior/toolbar-context';
import { ToolbarGroup } from './ToolbarGroup';
import { ToolbarNumber } from './ToolbarNumber';
import { ToolbarPopover } from './ToolbarPopover';
import { ToolbarSeparatorView } from './ToolbarSeparatorView';
import { ToolbarTool } from './ToolbarTool';
import type { ToolbarItemViewProps } from './ToolbarItemView.type';

const ToolbarItemView = ({ item }: ToolbarItemViewProps) => {
  const { contextMenu } = useContext(ToolbarContext);
  if (item.kind === 'separator') return <ToolbarSeparatorView item={item} />;
  const onContext = contextHandler(item, contextMenu);
  if (item.kind === 'number') return <ToolbarNumber item={item} onContext={onContext} />;
  if (item.kind === 'group') return <ToolbarGroup item={item} onContext={onContext} />;
  if (item.kind === 'popover') return <ToolbarPopover item={item} onContext={onContext} />;
  const tip = <TooltipContent name={item.label} description={item.description} shortcut={item.shortcut} />;
  const openOn = item.openOn ?? 'hover';
  const shared = {
    stopId: item.id, icon: item.icon, label: item.label, caption: item.caption, description: item.description, shortcut: item.shortcut,
    disabled: item.disabled, options: item.options, tip, hoverOpen: openOn === 'hover', clickOpen: openOn === 'click', holdOpen: openOn === 'hold',
    holdDelay: item.holdDelay, dwell: item.dwell, badge: item.badge, borrowed: item.borrowed, onContext,
  };
  if (item.kind === 'toggle') return <ToolbarTool {...shared} active={item.pressed} onPress={() => item.onChange(!item.pressed)} />;
  return <ToolbarTool {...shared} onPress={item.onSelect} />;
};

export { ToolbarItemView };
