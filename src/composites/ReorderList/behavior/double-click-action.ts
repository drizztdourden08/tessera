/* @layer renderer-components @kind util */
import type { ReorderDoubleClickHit, ReorderRowAction, ReorderRowCan } from '../ReorderList.type';

const doubleClickAction = (hit: ReorderDoubleClickHit, can: ReorderRowCan): ReorderRowAction | undefined => {
  if (!hit.main) return undefined;
  if (can.activate) return 'activate';
  return can.rename && hit.label ? 'rename' : undefined;
};

export { doubleClickAction };
