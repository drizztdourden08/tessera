/* @layer renderer-components @kind logic */
import type { KeyMoveContext, KeyMoveInput } from './move-request.type';

const keyMoveContext = <T,>(input: KeyMoveInput<T>): KeyMoveContext | undefined => {
  const { rows, indexOfKey, keys, maxDepth, childCount } = input;
  const rowOf = (key: string | null) => rows[(key === null ? undefined : indexOfKey.get(key)) ?? -1];
  const first = rowOf(keys[0] ?? null);
  if (!first) return undefined;
  const same = keys.every((key) => rowOf(key)?.parentKey === first.parentKey);
  const moving = new Set(same ? keys : [first.key]);
  const places = rows.filter((row) => moving.has(row.key)).map((row) => row.position);
  return {
    parentKey: first.parentKey,
    others: rows.filter((row) => row.parentKey === first.parentKey && !moving.has(row.key)),
    start: Math.min(...places),
    end: Math.max(...places),
    maxDepth,
    rowOf,
    childCount,
    request: (parentKey, index, into) => ({
      keys: rows.filter((row) => moving.has(row.key)).map((row) => row.key), parentKey, index, into, modifier: 'none',
    }),
  };
};

export { keyMoveContext };
