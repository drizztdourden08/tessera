/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { FloatingSwitchOption } from './sub-components/FloatingSwitchOption';
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
      {items.map((item) => <FloatingSwitchOption key={item.id} item={item} active={item.id === activeId} onSelect={onSelect} />)}
    </Box>
  );
};

export { FloatingSwitch };
