/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { VirtualListHandle } from '../../VirtualList';
import type { MillerColumn } from '../MillerColumns.type';

interface Wanted {
  column: number;
  index: number;
}

type MillerIntent =
  | { kind: 'go'; selected: string; path: readonly string[]; wanted: Wanted }
  | { kind: 'open' };

interface MillerIntentInput<T> {
  key: string;
  column: number;
  item: T;
  path: readonly string[];
  columns: readonly MillerColumn<T>[];
  getKey: (item: T) => string;
  getChildren: (item: T) => readonly T[] | undefined;
}

interface MillerColumnsModel<T> {
  rootRef: RefObject<HTMLElement | null>;
  columns: readonly MillerColumn<T>[];
  path: readonly string[];
  attach: (index: number) => (handle: VirtualListHandle | null) => void;
  changeAt: (column: number, next: ReadonlySet<string>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { MillerColumnsModel, MillerIntent, MillerIntentInput, Wanted };
