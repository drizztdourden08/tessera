/* @layer renderer-components @kind types */
import type { ReorderModifier } from '../../reorder';
import type { TreeDropTarget, TreeFlatRow } from '../Tree.type';

type TreeKeyDirection = 'up' | 'down' | 'in' | 'out';

interface MoveRequestInput<T> {
  rows: readonly TreeFlatRow<T>[];
  indexOfKey: ReadonlyMap<string, number>;
  target: TreeDropTarget;
  keys: readonly string[];
  modifier: ReorderModifier;
  childCount: (parentKey: string | null) => number;
}

interface KeyMoveInput<T> {
  rows: readonly TreeFlatRow<T>[];
  indexOfKey: ReadonlyMap<string, number>;
  keys: readonly string[];
  direction: TreeKeyDirection;
  maxDepth?: number;
  childCount: (parentKey: string | null) => number;
}

export type { KeyMoveInput, MoveRequestInput, TreeKeyDirection };
