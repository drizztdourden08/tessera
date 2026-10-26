/* @layer renderer-components @kind logic */
import { cellControlEvent } from './cell-control-event';
import type { CellControlEvent } from './cell-control-event.type';

const guardCellControl = <E extends CellControlEvent>(handler: ((event: E) => void) | undefined) =>
  handler && ((event: E) => {
    if (!cellControlEvent(event)) handler(event);
  });

export { guardCellControl };
