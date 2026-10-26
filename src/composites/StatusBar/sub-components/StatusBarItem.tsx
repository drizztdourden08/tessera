/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import '../../../theme/focus-ring.css';
import { itemMenuProps } from '../behavior/item-menu-props';
import { StatusBarSwatch } from './StatusBarSwatch';
import type { StatusBarItemProps } from './StatusBarItem.type';

const StatusBarItem = (props: StatusBarItemProps) => {
  const { item, onContextMenu } = props;
  const { id, label, value, icon, swatch, tone, title } = item;
  const menu = itemMenuProps(id, onContextMenu);
  return (
    <Box className={onContextMenu ? 'status-bar__item focus-ring-inset' : 'status-bar__item'} title={title} {...menu}>
      <Box as="dt" className="status-bar__label">
        {icon && <Icon name={icon} className="status-bar__icon" aria-hidden />}
        <Span className="status-bar__label-text">{label}</Span>
      </Box>
      <Box as="dd" className="status-bar__value" data-tone={tone}>
        {swatch && <StatusBarSwatch color={swatch} />}
        <Span className="status-bar__value-text">{value}</Span>
      </Box>
    </Box>
  );
};

export { StatusBarItem };
