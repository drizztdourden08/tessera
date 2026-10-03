/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import type { SideNavItemProps } from './SideNavItem.type';
import '../../../theme/focus-ring.css';
import '../../../theme/icon-glow.css';
import './SideNavItem.css';

const SideNavItem = (props: SideNavItemProps) => {
  const { item, active, onSelect } = props;
  return (
    <Pressable
      className={`side-nav__item focus-ring-inset${active ? ' side-nav__item--active' : ''}`}
      onClick={() => onSelect(item.id)}
      disabled={item.disabled}
      title={item.label}
      aria-label={item.label}
      aria-current={active ? 'page' : undefined}
    >
      <Box as="span" className={`side-nav__icon${active ? ' icon-glow' : ''}`} aria-hidden="true">{item.icon}</Box>
      <Span className="side-nav__label">{item.label}</Span>
      <Icon name="chevron-right" className="side-nav__chevron" size={16} />
    </Pressable>
  );
};

export { SideNavItem };
