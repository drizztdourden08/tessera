/* @layer renderer-components @kind component */
import { Badge } from '../../primitives/Badge';
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { ScrollStrip } from '../../primitives/scroll-strip/ScrollStrip';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { HeaderAnchorNavProps } from './HeaderAnchorNav.type';
import '../../theme/focus-ring.css';
import './HeaderAnchorNav.css';

const itemClass = (active: boolean): string =>
  `header-anchor-nav__item focus-ring-inset${active ? ' header-anchor-nav__item--active' : ''}`;

const HeaderAnchorNav = (props: HeaderAnchorNavProps) => {
  const { items, activeId, onSelect, ariaLabel, className = '' } = props;
  const { navigation } = useTesseraStrings();
  return (
    <ScrollStrip
      as="nav"
      trackAs="ul"
      className={`header-anchor-nav${className ? ` ${className}` : ''}`}
      trackClassName="header-anchor-nav__list"
      aria-label={ariaLabel}
      pagerLabels={{ back: navigation.earlierItems, forward: navigation.laterItems }}
    >
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
    </ScrollStrip>
  );
};

export { HeaderAnchorNav };
