/* @layer stories @kind types */
import type { TreeRowSize, TreeSelectionMode } from '../../../src/composites';
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
}

export type { TreeArgs, TreeDemoProps };
