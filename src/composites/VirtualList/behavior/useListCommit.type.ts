/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ReorderModifier } from '../../reorder';
import type { VirtualListReorder } from '../VirtualList.type';

interface UseListCommitInput<T> {
  reorder?: VirtualListReorder<T>;
  keys: readonly string[];
}

interface ListCommit {
  commit: (moving: readonly string[], to: number, modifier: ReorderModifier) => void;
  message: string;
  wanted: RefObject<string | null>;
}

export type { ListCommit, UseListCommitInput };
