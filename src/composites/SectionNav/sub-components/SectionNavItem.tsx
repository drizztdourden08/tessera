/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import type { SectionNavItemProps } from './SectionNavItem.type';
import '../../../theme/focus-ring.css';
import '../../../theme/icon-glow.css';
import './SectionNavItem.css';

const SectionNavItem = (props: SectionNavItemProps) => {
  const { item, active, onSelect } = props;
  return (
    <Pressable
      className={`section-nav__item focus-ring-inset${active ? ' section-nav__item--active' : ''}`}
      onClick={() => onSelect(item.id)}
      disabled={item.disabled}
      title={item.label}
      aria-label={item.label}
      aria-current={active ? 'page' : undefined}
    >
      <Box as="span" className={`section-nav__icon${active ? ' icon-glow' : ''}`} aria-hidden="true">{item.icon}</Box>
      <Span className="section-nav__label">{item.label}</Span>
      <Icon name="chevron-right" className="section-nav__chevron" size={16} />
    </Pressable>
  );
};

export { SectionNavItem };
