/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { VirtualListHandle } from '../../VirtualList';
import type { MillerColumn } from '../MillerColumns.type';

interface MillerColumnsModel<T> {
  rootRef: RefObject<HTMLElement | null>;
  columns: readonly MillerColumn<T>[];
  path: readonly string[];
  attach: (index: number) => (handle: VirtualListHandle | null) => void;
  changeAt: (column: number, next: ReadonlySet<string>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { MillerColumnsModel };
