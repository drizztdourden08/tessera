/* @layer renderer-components @kind types */
import type { ReorderModifier } from '../../reorder';
import type { TreeDropTarget, TreeFlatRow, TreeMoveRequest } from '../Tree.type';

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

interface KeyMoveContext {
  parentKey: string | null;
  others: readonly TreeFlatRow<unknown>[];
  start: number;
  end: number;
  maxDepth?: number;
  rowOf: (key: string | null) => TreeFlatRow<unknown> | undefined;
  childCount: (parentKey: string | null) => number;
  request: (parentKey: string | null, index: number, into: boolean) => TreeMoveRequest;
}

type KeyMoveStep = (context: KeyMoveContext) => TreeMoveRequest | undefined;

interface KeyRequestInput<T> {
  event: { key: string; altKey: boolean; ctrlKey: boolean; metaKey: boolean };
  row: TreeFlatRow<T> | undefined;
  rows: readonly TreeFlatRow<T>[];
  indexOfKey: ReadonlyMap<string, number>;
  selected: ReadonlySet<string>;
  maxDepth?: number;
  childCount: (parentKey: string | null) => number;
}

export type { KeyMoveContext, KeyMoveInput, KeyMoveStep, KeyRequestInput, MoveRequestInput, TreeKeyDirection };
