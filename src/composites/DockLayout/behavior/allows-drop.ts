/* @layer renderer-components @kind logic */
import type { DropTarget } from '../DockLayout.type';
import type { DragSource, DropCheck } from './drag.type';
import { dropOf } from './drop-of';

const allowsDrop = (check: DropCheck | undefined, source: DragSource, target: DropTarget): boolean => {
  if (!check?.canDrop || source.isMain || source.id === null) return true;
  return check.canDrop(source.id, dropOf(target, check.laid));
};

export { allowsDrop };
