/* @layer renderer-components @kind types */
import type { DragView } from '../behavior/drag.type';
import type { LaidOut } from '../behavior/layout-tree.type';

interface DropHintsProps {
  view: DragView;
  laid: LaidOut;
}

export type { DropHintsProps };
