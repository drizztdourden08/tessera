/* @layer renderer-components @kind logic */
import { FLOAT_BOX } from '../DockLayout.constants';
import type { Size } from '../DockLayout.type';
import type { DragContext, DropResult, ExternalPointer } from './drag.type';
import { externalSource } from './external-source';
import { externalView } from './external-view';
import { resolveDrop } from './resolve-drop';

const externalDrop = (ctx: DragContext, drag: ExternalPointer, view: Window, size: Size = FLOAT_BOX): DropResult =>
  resolveDrop(externalSource(drag.id, drag.pointer, size), externalView(ctx, drag, view, size));

export { externalDrop };
