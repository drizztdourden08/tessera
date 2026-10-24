/* @layer renderer-components @kind util */
import type { ReorderKeyEvent } from '../../reorder/reorder.type';
import { ROW_ACTION_KEYS } from '../ReorderList.constants';
import type { ReorderRowAction, ReorderRowCan } from '../ReorderList.type';

const rowKeyAction = (event: ReorderKeyEvent, can: ReorderRowCan): ReorderRowAction | undefined => {
  if (event.altKey || event.ctrlKey || event.metaKey) return undefined;
  const action = ROW_ACTION_KEYS[event.key];
  return action !== undefined && can[action] ? action : undefined;
};

export { rowKeyAction };
