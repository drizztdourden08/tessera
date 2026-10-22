/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import { Box } from '../../../primitives/Box';
import { useHighlight } from '../../../primitives/dom/useHighlight';
import { Pressable } from '../../../primitives/Pressable';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import { hasBadge } from '../behavior/has-badge';
import type { SideNavItemProps } from './SideNavItem.type';
import '../../../theme/focus-ring.css';
import '../../../theme/icon-glow.css';
import './SideNavItem.css';

const SideNavItem = (props: SideNavItemProps) => {
  const { item, active, onSelect } = props;
  const highlight = useHighlight({ onHighlight: item.onHighlight, disabled: item.disabled });
  const { badge } = item;
  const badged = hasBadge(badge);
  const icon = <Box as="span" className={`side-nav__icon${active ? ' icon-glow' : ''}`} aria-hidden="true">{item.icon}</Box>;
  return (
    <Pressable
      {...highlight}
      className={`side-nav__item focus-ring-inset${active ? ' side-nav__item--active' : ''}`}
      onClick={() => onSelect(item.id)}
      disabled={item.disabled}
      title={item.label}
      aria-label={item.label}
      aria-current={active ? 'page' : undefined}
    >
      {badged ? <Badge variant="dot" className="side-nav__badge-dot">{icon}</Badge> : icon}
      <Span className="side-nav__label">{item.label}</Span>
      {badged && (
        <Box as="span" className="side-nav__badge" aria-hidden="true">
          {typeof badge === 'string' || typeof badge === 'number' ? <Badge variant="inline" value={badge} /> : badge}
        </Box>
      )}
      <Icon name="chevron-right" className="side-nav__chevron" size={16} />
    </Pressable>
  );
};

export { SideNavItem };
