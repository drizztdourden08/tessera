/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import type { FloatingSwitchProps } from './FloatingSwitch.type';
import '../../theme/focus-ring.css';
import './FloatingSwitch.css';

const FloatingSwitch = (props: FloatingSwitchProps) => {
  const { items, activeId, onSelect, label, className = '' } = props;
  return (
    <Box as="nav" className={`floating-switch${className ? ` ${className}` : ''}`} aria-label={label}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <Pressable
            key={item.id}
            className={`floating-switch__item focus-ring-inset${active ? ' floating-switch__item--active' : ''}`}
            onClick={() => { if (!active) onSelect(item.id); }}
            disabled={item.disabled}
            aria-current={active ? 'page' : undefined}
          >
            <Box as="span" className="floating-switch__icon" aria-hidden="true">{item.icon}</Box>
            {item.label}
          </Pressable>
        );
      })}
    </Box>
  );
};

export { FloatingSwitch };
