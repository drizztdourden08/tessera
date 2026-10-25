/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { itemsOfSide } from './behavior/items-of-side';
import { useBarWidth } from './behavior/useBarWidth';
import { visibleItems } from './behavior/visible-items';
import { StatusBarActions } from './sub-components/StatusBarActions';
import { StatusBarList } from './sub-components/StatusBarList';
import type { StatusBarProps } from './StatusBar.type';
import './StatusBar.css';

const StatusBar = (props: StatusBarProps) => {
  const { items, actions = [], label, className } = props;
  const barRef = useRef<HTMLElement | null>(null);
  const shown = visibleItems(items, useBarWidth(barRef));

  return (
    <Box as="section" ref={barRef} aria-label={label} className={className ? `status-bar ${className}` : 'status-bar'}>
      <StatusBarList items={itemsOfSide(shown, 'start')} side="start" />
      <StatusBarList items={itemsOfSide(shown, 'end')} side="end" />
      <StatusBarActions actions={actions} />
    </Box>
  );
};

export { StatusBar };
