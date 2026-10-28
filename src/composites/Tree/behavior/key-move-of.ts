/* @layer renderer-components @kind logic */
import type { TreeFlatRow, TreeMoveRequest } from '../Tree.type';
import type { KeyMoveInput } from './move-request.type';

const keyMoveOf = <T,>(input: KeyMoveInput<T>): TreeMoveRequest | undefined => {
  const { rows, indexOfKey, keys, direction, maxDepth, childCount } = input;
  const rowOf = (key: string | null): TreeFlatRow<T> | undefined => rows[(key === null ? undefined : indexOfKey.get(key)) ?? -1];
  const first = rowOf(keys[0] ?? null);
  if (!first) return undefined;
  const same = keys.every((key) => rowOf(key)?.parentKey === first.parentKey);
  const moving = new Set(same ? keys : [first.key]);
  const request = (parentKey: string | null, index: number, into: boolean): TreeMoveRequest => ({
    keys: rows.filter((row) => moving.has(row.key)).map((row) => row.key), parentKey, index, into, modifier: 'none',
  });
  const others = rows.filter((row) => row.parentKey === first.parentKey && !moving.has(row.key));
  const places = rows.filter((row) => moving.has(row.key)).map((row) => row.position);
  const start = Math.min(...places);
  const end = Math.max(...places);

  if (direction === 'up') {
    const before = others.filter((row) => row.position < start).length;
    return before === 0 ? undefined : request(first.parentKey, before - 1, false);
  }
  if (direction === 'down') {
    const before = others.filter((row) => row.position < end).length;
    return before >= others.length ? undefined : request(first.parentKey, before + 1, false);
  }
  if (direction === 'in') {
    const previous = others.filter((row) => row.position < start).at(-1);
    if (!previous?.branch || (maxDepth !== undefined && previous.depth + 1 > maxDepth)) return undefined;
    return request(previous.key, childCount(previous.key), true);
  }
  const parent = rowOf(first.parentKey);
  return parent ? request(parent.parentKey, parent.position, false) : undefined;
};

export { keyMoveOf };
