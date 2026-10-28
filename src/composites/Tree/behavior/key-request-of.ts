/* @layer renderer-components @kind logic */
import type { TreeMoveRequest } from '../Tree.type';
import { DIRECTIONS } from './useTreeDrag.constants';
import { keyMoveOf } from './key-move-of';
import { topKeysOf } from './top-keys-of';
import type { KeyRequestInput } from './move-request.type';

const keyRequestOf = <T,>(input: KeyRequestInput<T>): { chord: boolean; request: TreeMoveRequest | undefined } => {
  const { event, row, rows, indexOfKey, selected, maxDepth, childCount } = input;
  const direction = DIRECTIONS[event.key];
  if (!direction || !event.altKey || event.ctrlKey || event.metaKey) return { chord: false, request: undefined };
  if (!row) return { chord: true, request: undefined };
  const keys = selected.has(row.key) ? topKeysOf(rows, selected) : [row.key];
  return { chord: true, request: keyMoveOf({ rows, indexOfKey, keys, direction, maxDepth, childCount }) };
};

export { keyRequestOf };
