/* @layer renderer-components @kind logic */
import type { TreeSelection, TreeSelectionMode } from '../Tree.type';

const selectionModeOf = (selection: TreeSelection | undefined): TreeSelectionMode | 'none' =>
  selection ? (selection.mode ?? 'multiple') : 'none';

export { selectionModeOf };
