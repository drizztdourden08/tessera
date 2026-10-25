/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Text } from '../../../primitives/Text';
import { Span } from '../../../primitives/text-elements';
import { ActionBar } from '../../ActionBar';
import { headerToggle } from '../behavior/header-toggle';
import { CELL_ATTRIBUTE, DEPTH_PROPERTY, HEADER_ACTIONS_KEEP, KIND_ATTRIBUTE } from '../VirtualGrid.constants';
import type { CSSProperties, KeyboardEvent } from 'react';
import type { GridHeaderProps } from './GridHeader.type';
import '../../../theme/focus-ring.css';

const GridHeader = (props: GridHeaderProps) => {
  const { stop, label, count, columns, collapsed, tabbable, depth = 0, actions = [], onToggle, onActivate, onNavigate } = props;
  const press = (event: KeyboardEvent<HTMLElement>) => {
    const next = event.target === event.currentTarget ? headerToggle(event.key, collapsed) : undefined;
    if (next === undefined) {
      onNavigate(event, stop);
      return;
    }
    event.preventDefault();
    onToggle(next);
  };
  const indent = { [DEPTH_PROPERTY]: Math.max(0, depth) } as CSSProperties;
  const icons =actions.map((action) => ({ ...action, iconOnly: true as const }));
  return (
    <Box
      role="gridcell"
      className="virtual-grid__header focus-ring-inset"
      style={indent}
      tabIndex={tabbable ? 0 : -1}
      aria-colindex={1}
      aria-colspan={columns}
      aria-expanded={!collapsed}
      {...{ [CELL_ATTRIBUTE]: stop, [KIND_ATTRIBUTE]: 'header' }}
      onClick={() => onToggle(!collapsed)}
      onFocus={() => onActivate(stop)}
      onKeyDown={press}
    >
      <Span tone="dim" className="virtual-grid__chevron"><Icon name={collapsed ? 'chevron-right' : 'chevron-down'} /></Span>
      <Text className="virtual-grid__header-label">{label}</Text>
      <Badge variant="inline" color="primary" value={count} />
      {icons.length > 0 && (
        <Box className="virtual-grid__header-actions" onClick={(event) => event.stopPropagation()}>
          <ActionBar actions={icons} size="sm" keep={HEADER_ACTIONS_KEEP} align="end" />
        </Box>
      )}
    </Box>
  );
};

export { GridHeader };
