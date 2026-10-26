/* @layer renderer-components @kind logic */
import type { RowMoveTarget } from './row-features.type';

const moveTarget = (keys: readonly string[], from: number, to: number, groupKey: string | undefined): RowMoveTarget => {
  const rest = keys.filter((_, at) => at !== from);
  const afterKey = rest[to - 1];
  const beforeKey = rest[to];
  return {
    index: to,
    ...(beforeKey !== undefined && { beforeKey }),
    ...(afterKey !== undefined && { afterKey }),
    ...(groupKey !== undefined && { groupKey }),
  };
};

export { moveTarget };
