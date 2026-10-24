/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Divider } from '../../../primitives/Divider';
import { TooltipContent } from '../../../primitives/Tooltip';
import { ToolbarContext } from '../behavior/toolbar-context';
import { ToolbarGroup } from './ToolbarGroup';
import { ToolbarNumber } from './ToolbarNumber';
import { ToolbarTool } from './ToolbarTool';
import type { ToolbarItemViewProps } from './ToolbarItemView.type';

const ToolbarItemView = ({ item }: ToolbarItemViewProps) => {
  const { orientation } = useContext(ToolbarContext);
  if (item.kind === 'separator') {
    return <Divider orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'} className="toolbar__separator" />;
  }
  if (item.kind === 'number') return <ToolbarNumber item={item} />;
  if (item.kind === 'group') return <ToolbarGroup item={item} />;
  const tip = <TooltipContent name={item.label} description={item.description} shortcut={item.shortcut} />;
  const clickOpen = item.openOn === 'click';
  const shared = {
    stopId: item.id, icon: item.icon, label: item.label, caption: item.caption, description: item.description, shortcut: item.shortcut,
    disabled: item.disabled, options: item.options, tip, hoverOpen: !clickOpen, clickOpen,
  };
  if (item.kind === 'toggle') return <ToolbarTool {...shared} active={item.pressed} onPress={() => item.onChange(!item.pressed)} />;
  return <ToolbarTool {...shared} onPress={item.onSelect} />;
};

export { ToolbarItemView };
