/* @layer renderer-components @kind logic */
import { rangeBetween } from '../../DataTable/behavior/range-between';
import { toggledId } from '../../DataTable/behavior/row-selection-math';
import type { LogClick, LogSelectionMove } from './log-selection.type';

const clickSelection = (click: LogClick): LogSelectionMove => {
  const { order, selected, anchor, id, keys } = click;
  if (keys.shift) {
    const from = anchor ?? id;
    const range = rangeBetween(order, from, id);
    return { ids: new Set([...(keys.toggle ? selected : []), ...range]), cursor: id, anchor: from };
  }
  if (keys.toggle) return { ids: toggledId(selected, id), cursor: id, anchor: id };
  return { ids: new Set([id]), cursor: id, anchor: id };
};

export { clickSelection };
