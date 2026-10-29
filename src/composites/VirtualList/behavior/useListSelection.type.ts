/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { SelectionModel } from '../../selection';
import type { KeyTarget } from '../../virtual/virtual-focus.type';
import type { VirtualListSelection } from '../VirtualList.type';

interface UseListSelectionInput<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  getLabel?: (item: T, index: number) => string;
  selection?: VirtualListSelection;
}

interface ListSelection {
  keys: readonly string[];
  select: SelectionModel;
  onMove: (event: KeyboardEvent<HTMLElement>, target: KeyTarget, from: number) => void;
  jumpRef: RefObject<(index: number, row: number) => void>;
}

export type { ListSelection, UseListSelectionInput };
