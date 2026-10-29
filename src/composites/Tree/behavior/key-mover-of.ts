/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import { keyRequestOf } from './key-request-of';
import type { KeyMoverInput } from './useTreeDrag.type';

const keyMoverOf = <T,>(input: KeyMoverInput<T>) => (event: KeyboardEvent<HTMLElement>, at: number): boolean => {
  const { reorder, enabled, rows, indexOfKey, selected, childCount, commit } = input;
  if (!enabled || !reorder) return false;
  const { chord, request } = keyRequestOf({ event, row: rows[at], rows, indexOfKey, selected, maxDepth: reorder.maxDepth, childCount });
  if (!chord) return false;
  event.preventDefault();
  if (request && (reorder.canDrop?.(request) ?? true)) commit(request);
  return true;
};

export { keyMoverOf };
