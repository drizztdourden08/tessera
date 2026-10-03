/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';
import type { TreeRow } from '../GroupTree.type';
import type { TreeExpansion } from './useTreeExpansion.type';

interface TreeNavigationInput<T> {
  rows: readonly TreeRow<T>[];
  expansion: TreeExpansion;
  selectedKey?: string | null;
  onSelect?: (key: string, item: T | undefined) => void;
  onActivate?: (item: T) => void;
}

interface TreeNavigation<T> {
  listRef: RefObject<HTMLDivElement | null>;
  activeKey: string | null;
  choose: (row: TreeRow<T>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { TreeNavigation, TreeNavigationInput };
