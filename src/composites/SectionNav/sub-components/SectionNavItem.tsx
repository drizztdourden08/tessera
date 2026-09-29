/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { PathIcon } from '../../../primitives/PathIcon';
import { CHEVRON_RIGHT, GLYPH_BOX } from '../SectionNav.constants';
import type { SectionNavItemProps } from './SectionNavItem.type';
import '../../../theme/focus-ring.css';
import './SectionNavItem.css';

const SectionNavItem = (props: SectionNavItemProps) => {
  const { item, active, onSelect } = props;
  return (
    <Pressable
      className={`section-nav__item focus-ring-inset${active ? ' section-nav__item--active' : ''}`}
      onClick={() => onSelect(item.id)}
      title={item.label}
      aria-label={item.label}
      aria-current={active ? 'page' : undefined}
    >
      <Box as="span" className="section-nav__icon" aria-hidden="true">{item.icon}</Box>
      <Box as="span" className="section-nav__label">{item.label}</Box>
      <PathIcon className="section-nav__chevron" paths={[CHEVRON_RIGHT]} viewBox={GLYPH_BOX} size={16} aria-hidden="true" />
    </Pressable>
  );
};

export { SectionNavItem };
