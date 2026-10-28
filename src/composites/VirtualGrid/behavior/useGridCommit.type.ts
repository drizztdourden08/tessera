/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ReorderModifier } from '../../reorder';
import type { VirtualGridReorder, VirtualGridSection } from '../VirtualGrid.type';
import type { GridTarget } from './grid-point-at.type';

interface UseGridCommitInput<T> {
  reorder?: VirtualGridReorder<T>;
  sections?: readonly VirtualGridSection<T>[];
  keys: readonly string[];
  owners: readonly string[];
  indexOfKey: ReadonlyMap<string, number>;
}

interface GridCommit {
  commit: (moving: readonly string[], to: GridTarget, modifier: ReorderModifier) => void;
  message: string;
  wanted: RefObject<string | null>;
}

export type { GridCommit, UseGridCommitInput };
