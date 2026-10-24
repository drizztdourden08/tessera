/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Box } from '../../../primitives/Box';
import { Divider } from '../../../primitives/Divider';
import { ToolbarContext } from '../behavior/toolbar-context';
import { ToolbarNumber } from './ToolbarNumber';
import { TooltipContent } from '../../../primitives/Tooltip';
import { ToolbarTool } from './ToolbarTool';
import type { ToolbarItemViewProps } from './ToolbarItemView.type';

const ToolbarItemView = ({ item }: ToolbarItemViewProps) => {
  const { orientation } = useContext(ToolbarContext);
  if (item.kind === 'separator') {
    return <Divider orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'} className="toolbar__separator" />;
  }
  if (item.kind === 'number') return <ToolbarNumber item={item} />;
  if (item.kind === 'group') {
    return (
      <Box role="group" aria-label={item.label} className="toolbar__group">
        {item.choices.map((choice) => (
          <ToolbarTool
            key={choice.value}
            stopId={`${item.id}:${choice.value}`}
            icon={choice.icon}
            label={choice.label}
            shortcut={choice.shortcut}
            tip={<TooltipContent name={choice.label} description={choice.description} shortcut={choice.shortcut} />}
            active={item.value === choice.value}
            disabled={item.disabled === true || choice.disabled === true}
            onPress={() => item.onChange(choice.value)}
          />
        ))}
      </Box>
    );
  }
  const tip = <TooltipContent name={item.label} description={item.description} shortcut={item.shortcut} />;
  const shared = { stopId: item.id, icon: item.icon, label: item.label, caption: item.caption, shortcut: item.shortcut, disabled: item.disabled, options: item.options, tip, hoverOpen: true };
  if (item.kind === 'toggle') return <ToolbarTool {...shared} active={item.pressed} onPress={() => item.onChange(!item.pressed)} />;
  return <ToolbarTool {...shared} onPress={item.onSelect} />;
};

export { ToolbarItemView };
