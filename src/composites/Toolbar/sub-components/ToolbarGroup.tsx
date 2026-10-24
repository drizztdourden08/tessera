/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Box } from '../../../primitives/Box';
import { Small } from '../../../primitives/text-elements';
import { TooltipContent } from '../../../primitives/Tooltip';
import { ToolbarContext } from '../behavior/toolbar-context';
import { ToolbarTool } from './ToolbarTool';
import type { ToolbarGroupProps } from './ToolbarItemView.type';

const ToolbarGroup = ({ item }: ToolbarGroupProps) => {
  const { layout } = useContext(ToolbarContext);
  const list = layout === 'list';
  return (
    <Box role="group" aria-label={item.label} className={list ? 'toolbar__set' : 'toolbar__group'}>
      {list && <Small tone="dim" className="toolbar__set-label" aria-hidden="true">{item.label}</Small>}
      {item.choices.map((choice) => (
        <ToolbarTool
          key={choice.value}
          stopId={`${item.id}:${choice.value}`}
          icon={choice.icon}
          label={choice.label}
          description={choice.description}
          shortcut={choice.shortcut}
          tip={<TooltipContent name={choice.label} description={choice.description} shortcut={choice.shortcut} />}
          active={item.value === choice.value}
          disabled={item.disabled === true || choice.disabled === true}
          onPress={() => item.onChange(choice.value)}
        />
      ))}
    </Box>
  );
};

export { ToolbarGroup };
