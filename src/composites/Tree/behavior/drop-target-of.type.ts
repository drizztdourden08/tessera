/* @layer renderer-components @kind types */
import type { TreeDropTarget, TreeFlatRow } from '../Tree.type';

type DropZone = 'before' | 'into' | 'after';

interface DropTargetInput<T> {
  rows: readonly TreeFlatRow<T>[];
  indexOfKey: ReadonlyMap<string, number>;
  y: number;
  rowHeight: number;
  from: number;
  moving: ReadonlySet<string>;
  maxDepth?: number;
  allow?: (target: TreeDropTarget) => boolean;
}

export type { DropTargetInput, DropZone };
