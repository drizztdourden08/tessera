/* @layer renderer-components @kind logic */
import type { ReorderDrag } from '../../reorder';
import { GHOST_LIMIT } from '../Tree.constants';
import type { TreeReorder } from '../Tree.type';
import type { TreeDragGhost } from './useTreeDrag.type';

const ghostOf = (active: boolean, drag: ReorderDrag, reorder: TreeReorder | undefined): TreeDragGhost | null => {
  if (!active) return null;
  const thumbnails = drag.dragKeys.slice(0, GHOST_LIMIT).map((key) => reorder?.renderThumbnail?.(key));
  return { count: drag.dragKeys.length, thumbnails, point: drag.point };
};

export { ghostOf };
