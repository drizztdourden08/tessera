/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Divider } from '../../../primitives/Divider';
import { TooltipContent } from '../../../primitives/Tooltip';
import { contextHandler } from '../behavior/context-handler';
import { ToolbarContext } from '../behavior/toolbar-context';
import { SEPARATOR_CLASS } from '../Toolbar.constants';
import { ToolbarGroup } from './ToolbarGroup';
import { ToolbarNumber } from './ToolbarNumber';
import { ToolbarTool } from './ToolbarTool';
import type { ToolbarItemViewProps } from './ToolbarItemView.type';

const ToolbarItemView = ({ item }: ToolbarItemViewProps) => {
  const { orientation, contextMenu } = useContext(ToolbarContext);
  if (item.kind === 'separator') {
    return <Divider orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'} className={SEPARATOR_CLASS} />;
  }
  const onContext = contextHandler(item, contextMenu);
  if (item.kind === 'number') return <ToolbarNumber item={item} onContext={onContext} />;
  if (item.kind === 'group') return <ToolbarGroup item={item} onContext={onContext} />;
  const tip = <TooltipContent name={item.label} description={item.description} shortcut={item.shortcut} />;
  const clickOpen = item.openOn === 'click';
  const shared = {
    stopId: item.id, icon: item.icon, label: item.label, caption: item.caption, description: item.description, shortcut: item.shortcut,
    disabled: item.disabled, options: item.options, tip, hoverOpen: !clickOpen, clickOpen, onContext,
  };
  if (item.kind === 'toggle') return <ToolbarTool {...shared} active={item.pressed} onPress={() => item.onChange(!item.pressed)} />;
  return <ToolbarTool {...shared} onPress={item.onSelect} />;
};

export { ToolbarItemView };
