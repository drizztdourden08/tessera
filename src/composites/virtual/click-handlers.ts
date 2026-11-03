/* @layer renderer-components @kind logic */
import type { SelectionModel } from '../selection';
import type { VirtualCellHandlers } from './virtual-cell-handlers.type';

const clickHandlers = (select: SelectionModel, key: string, swallowClick: () => boolean): Pick<VirtualCellHandlers, 'onClick' | 'onMouseDown'> => ({
  onClick: (event) => {
    if (!swallowClick()) select.click(key, event);
  },
  onMouseDown: (event) => {
    if (event.shiftKey) event.preventDefault();
  },
});

export { clickHandlers };
