/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useHighlight } from '../../../primitives/dom/useHighlight';
import { Pressable } from '../../../primitives/Pressable';
import type { FloatingSwitchOptionProps } from './FloatingSwitchOption.type';

const FloatingSwitchOption = (props: FloatingSwitchOptionProps) => {
  const { item, active, onSelect } = props;
  const highlight = useHighlight({ onHighlight: item.onHighlight, disabled: item.disabled });
  return (
    <Pressable
      {...highlight}
      className={`floating-switch__item focus-ring-inset${active ? ' floating-switch__item--active' : ''}`}
      onClick={() => { if (!active) onSelect(item.id); }}
      disabled={item.disabled}
      aria-current={active ? 'page' : undefined}
    >
      <Box as="span" className={`floating-switch__icon${active ? ' icon-glow' : ''}`} aria-hidden="true">{item.icon}</Box>
      <Box as="span" className="floating-switch__label">{item.label}</Box>
    </Pressable>
  );
};

export { FloatingSwitchOption };
