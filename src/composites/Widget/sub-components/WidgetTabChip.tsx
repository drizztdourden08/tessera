/* @layer renderer-components @kind component */
import { Pressable } from '../../../primitives/Pressable';
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
      {tab.label}
    </Pressable>
  );
};

export { WidgetTabChip };
