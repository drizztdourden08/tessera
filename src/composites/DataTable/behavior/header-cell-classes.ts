/* @layer renderer-components @kind logic */
import type { HeaderCellClassInput } from './header-cell-classes.type';

const headerCellClasses = (input: HeaderCellClassInput): string => {
  const { isDragging, vacated, edge, menuOpen, sorted } = input;
  return [
    'data-table__header-cell',
    isDragging && `data-table__header-cell--${vacated ? 'vacated' : 'dragging'}`,
    edge && `data-table__header-cell--drop-${edge}`,
    menuOpen && 'data-table__header-cell--menu-open',
    sorted && 'data-table__header-cell--sorted',
  ].filter(Boolean).join(' ');
};

export { headerCellClasses };
