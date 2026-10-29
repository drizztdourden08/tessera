/* @layer stories @kind types */
import type { DragEvent, ReactNode } from 'react';
import type { TreeRowSize, TreeRowState, TreeSelectionMode, TreeTrailShow } from '../../../src/composites';
import type { TreeEntry } from './tree-entries';

type TreeArgs = {
  mode: TreeSelectionMode;
  reorder: boolean;
  guides: boolean;
  compact: boolean;
  openOnPick: boolean;
  query: string;
};

interface TreeDemoProps {
  mode?: TreeSelectionMode;
  reorder?: boolean;
  guides?: boolean;
  query?: string;
  rowSize?: TreeRowSize;
  openOnPick?: boolean;
  maxDepth?: number;
  start?: readonly TreeEntry[];
  open?: readonly string[];
  trail?: TreeTrailShow;
  renderTrail?: (entry: TreeEntry, state: TreeRowState) => ReactNode;
  onDragOut?: (keys: readonly string[], event: DragEvent<HTMLElement>) => void;
}

export type { TreeArgs, TreeDemoProps };
