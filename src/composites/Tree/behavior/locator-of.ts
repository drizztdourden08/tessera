/* @layer renderer-components @kind logic */
import { dropTargetOf } from './drop-target-of';
import type { LocatorInput } from './useTreeDrag.type';

const locatorOf = <T,>(input: LocatorInput<T>) => (point: { clientX: number; clientY: number }): number => {
  const { rows, indexOfKey, bodyRef, rowHeight, reorder, requestFor, moving, fromRow, target } = input;
  const top = bodyRef.current?.getBoundingClientRect().top ?? 0;
  const allow = reorder?.canDrop;
  target.current = dropTargetOf({
    rows, indexOfKey, y: point.clientY - top, rowHeight, from: fromRow.current, moving: new Set(moving.current), maxDepth: reorder?.maxDepth,
    allow: allow ? (at) => allow(requestFor(at, moving.current)) : undefined,
  });
  return target.current?.gap ?? fromRow.current;
};

export { locatorOf };
