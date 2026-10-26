/* @layer renderer-components @kind component */
import { Pressable } from '../../../primitives/Pressable';
import { WidgetIcon } from './WidgetIcon';
import type { WidgetTabChipProps } from './WidgetTabChip.type';

const WidgetTabChip = (props: WidgetTabChipProps) => {
  const { tab, active, onActivate } = props;
  return (
    <Pressable
      className={`widget__tab${active ? ' widget__tab--active' : ''}`}
      data-drag-tab={tab.id}
      aria-pressed={active}
      onClick={() => onActivate(tab.id)}
    >
      <WidgetIcon name={tab.icon} />
      {tab.label}
    </Pressable>
  );
};

export { WidgetTabChip };
