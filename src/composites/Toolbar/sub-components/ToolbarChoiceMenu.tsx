/* @layer renderer-components @kind component */
import { TooltipContent } from '../../../primitives/Tooltip';
import { choiceGroup } from '../behavior/choice-group';
import { ToolbarTool } from './ToolbarTool';
import type { ToolbarGroupProps } from './ToolbarItemView.type';

const ToolbarChoiceMenu = ({ item, onContext }: ToolbarGroupProps) => {
  const slot = item.display === 'slot';
  const current = item.choices.find((choice) => choice.value === item.value) ?? item.choices[0];
  if (current === undefined) return null;
  const openOn = item.openOn ?? (slot ? 'hold' : 'click');
  const shortcut = current.shortcut ?? item.shortcut;
  return (
    <ToolbarTool
      stopId={item.id}
      icon={current.icon}
      label={item.label}
      description={current.label}
      shortcut={shortcut}
      tip={<TooltipContent name={item.label} description={current.label} shortcut={shortcut} />}
      active={slot && item.pressed === true}
      disabled={item.disabled}
      options={[choiceGroup(item)]}
      hoverOpen={openOn === 'hover'}
      clickOpen={openOn === 'click'}
      holdOpen={openOn === 'hold'}
      holdDelay={item.holdDelay}
      dwell={item.dwell}
      badge={item.badge}
      borrowed={item.borrowed}
      onPress={slot ? () => item.onPress?.(item.value) : undefined}
      onContext={onContext}
    />
  );
};

export { ToolbarChoiceMenu };
