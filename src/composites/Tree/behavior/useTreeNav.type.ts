/* @layer renderer-components @kind types */
import type { FocusEvent, KeyboardEvent, RefObject } from 'react';
import type { SelectionModel } from '../../selection';
import type { ScrollAlign, VirtualMetrics } from '../../virtual';
import type { TreeFlatRow, TreeRowSize, TreeSelection, TreeSelectionMode } from '../Tree.type';

interface TreeNavInput<T> {
  rows: readonly TreeFlatRow<T>[];
  keys: readonly string[];
  indexOfKey: ReadonlyMap<string, number>;
  getLabel: (item: T) => string;
  selection?: TreeSelection;
  rowSize: TreeRowSize;
  overscan?: number;
}

interface TreeSelectInput<T> {
  rows: readonly TreeFlatRow<T>[];
  keys: readonly string[];
  indexOfKey: ReadonlyMap<string, number>;
  getLabel: (item: T) => string;
  selection?: TreeSelection;
  jumpRef: RefObject<(index: number, row: number) => void>;
}

interface TreeNav {
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  indices: readonly number[];
  metrics: VirtualMetrics;
  tabbable: number;
  mode: TreeSelectionMode | 'none';
  select: SelectionModel;
  pick: (key: string) => void;
  onScroll: () => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
  activate: (key: string) => void;
  jump: (index: number) => void;
  navigate: (event: KeyboardEvent<HTMLElement>, index: number) => void;
  scrollToKey: (key: string, align?: ScrollAlign) => void;
}

export type { TreeNav, TreeNavInput, TreeSelectInput };
