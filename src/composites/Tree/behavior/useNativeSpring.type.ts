/* @layer renderer-components @kind types */
import type { DragEventHandler } from 'react';
import type { TreeFlatRow } from '../Tree.type';

interface NativeSpringInput<T> {
  rows: readonly TreeFlatRow<T>[];
  indexOfKey: ReadonlyMap<string, number>;
  delay: number;
  setExpanded: (key: string, expanded: boolean) => void;
}

interface TreeNativeOver {
  onDragOver: DragEventHandler<HTMLElement>;
  onDragLeave: DragEventHandler<HTMLElement>;
  onDrop: DragEventHandler<HTMLElement>;
}

export type { NativeSpringInput, TreeNativeOver };
