/* @layer renderer-components @kind logic */
import type { TreeMoveRequest } from '../Tree.type';
import type { MoveRequestInput } from './move-request.type';

const moveRequestOf = <T,>(input: MoveRequestInput<T>): TreeMoveRequest => {
  const { rows, indexOfKey, target, keys, modifier, childCount } = input;
  const rowOf = (key: string) => rows[indexOfKey.get(key) ?? -1];
  const ordered = [...keys].sort((a, b) => (indexOfKey.get(a) ?? 0) - (indexOfKey.get(b) ?? 0));
  const siblings = ordered.filter((key) => rowOf(key)?.parentKey === target.parentKey);
  const before = siblings.filter((key) => (rowOf(key)?.position ?? 0) - 1 < target.index).length;
  const index = target.into ? childCount(target.parentKey) - siblings.length : target.index - before;
  return { keys: ordered, parentKey: target.parentKey, index: Math.max(0, index), into: target.into, modifier };
};

export { moveRequestOf };
