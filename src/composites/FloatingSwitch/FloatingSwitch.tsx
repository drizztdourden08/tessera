/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { useSwitchThumb } from './behavior/useSwitchThumb';
import type { FloatingSwitchProps } from './FloatingSwitch.type';
import '../../theme/focus-ring.css';
import '../../theme/icon-glow.css';
import './FloatingSwitch.css';

const FloatingSwitch = (props: FloatingSwitchProps) => {
  const { items, activeId, onSelect, label, className = '' } = props;
  const itemsKey = items.map((item) => `${item.id}:${item.label}`).join('|');
  const { trackRef, thumbStyle, shown, gliding } = useSwitchThumb(activeId, itemsKey);
  const thumbClass = `floating-switch__thumb${shown ? '' : ' floating-switch__thumb--hidden'}${gliding ? ' floating-switch__thumb--gliding' : ''}`;
  return (
    <Box as="nav" ref={trackRef} className={`floating-switch${className ? ` ${className}` : ''}`} aria-label={label}>
      <Box as="span" className={thumbClass} style={thumbStyle} aria-hidden="true" />
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
            <Box as="span" className={`floating-switch__icon${active ? ' icon-glow' : ''}`} aria-hidden="true">{item.icon}</Box>
            <Box as="span" className="floating-switch__label">{item.label}</Box>
          </Pressable>
        );
      })}
    </Box>
  );
};

export { FloatingSwitch };
