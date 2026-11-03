/* @layer renderer-components @kind logic */
import type { MouseEvent } from 'react';
import type { SelectionModel } from '../selection';
import type { VirtualCellHandlers } from './virtual-cell-handlers.type';

const clickHandlers = (select: SelectionModel, key: string, swallowClick: () => boolean, onPick?: (event: MouseEvent<HTMLElement>) => void): Pick<VirtualCellHandlers, 'onClick' | 'onMouseDown'> => ({
  onClick: (event) => {
    if (swallowClick()) return;
    select.click(key, event);
    onPick?.(event);
  },
  onMouseDown: (event) => {
    if (event.shiftKey) event.preventDefault();
  },
});

export { clickHandlers };
