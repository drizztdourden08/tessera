/* @layer renderer-components @kind logic */
import type { HTMLAttributes } from 'react';
import type { LogSelection } from './log-selection.type';

const rowSelectionProps = (id: string, selection: LogSelection | null | undefined): HTMLAttributes<HTMLElement> => {
  if (!selection) return { className: 'log-panel__row' };
  const selected = selection.isSelected(id);
  return {
    className: `log-panel__row log-panel__row--selectable focus-ring-inset${selected ? ' log-panel__row--selected' : ''}`,
    role: 'option',
    'aria-selected': selected,
    tabIndex: id === selection.tabStop ? 0 : -1,
    onClick: (event) => selection.onRowClick(id, event),
    onMouseDown: selection.onRowMouseDown,
  };
};

export { rowSelectionProps };
