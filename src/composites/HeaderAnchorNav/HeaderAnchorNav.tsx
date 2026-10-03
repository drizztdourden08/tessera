/* @layer renderer-components @kind component */
import { Badge } from '../../primitives/Badge';
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import type { HeaderAnchorNavProps } from './HeaderAnchorNav.type';
import '../../theme/focus-ring.css';
import './HeaderAnchorNav.css';

const itemClass = (active: boolean): string =>
  `header-anchor-nav__item focus-ring-inset${active ? ' header-anchor-nav__item--active' : ''}`;

const HeaderAnchorNav = (props: HeaderAnchorNavProps) => {
  const { items, activeId, onSelect, ariaLabel, className = '' } = props;
  return (
    <Box as="nav" className={`header-anchor-nav${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
      <Box as="ul" className="header-anchor-nav__list">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <Box as="li" key={item.id}>
              <Pressable className={itemClass(active)} aria-current={active ? 'location' : undefined} onClick={() => onSelect(item.id)}>
                {item.label}
                {item.badge != null && <Badge variant="inline" color={active ? 'primary' : 'tame'} value={item.badge} />}
              </Pressable>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export { HeaderAnchorNav };
