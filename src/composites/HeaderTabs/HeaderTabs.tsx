/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import type { HeaderTabsProps } from './HeaderTabs.type';
import '../../theme/focus-ring.css';
import './HeaderTabs.css';

const tabClass = (active: boolean): string =>
  `header-tabs__tab focus-ring-inset${active ? ' header-tabs__tab--active' : ''}`;

const HeaderTabs = (props: HeaderTabsProps) => {
  const { items, activeId, onSelect, ariaLabel, className = '' } = props;
  return (
    <Box as="nav" className={`header-tabs${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <Pressable
            key={item.id}
            className={tabClass(active)}
            aria-current={active ? 'true' : undefined}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
            {item.badge != null && <Box as="span" className="header-tabs__badge">{item.badge}</Box>}
          </Pressable>
        );
      })}
    </Box>
  );
};

export { HeaderTabs };
