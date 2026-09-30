/* @layer renderer-components @kind logic */
import { FLOAT_BOX, NO_HELD_KEYS } from '../DockLayout.constants';
import type { Size } from '../DockLayout.type';
import type { DragContext, DragView, ExternalPointer } from './drag.type';
import { externalSource } from './external-source';
import { viewFor } from './view-for';

const externalView = (ctx: DragContext, drag: ExternalPointer, view: Window, size: Size = FLOAT_BOX): DragView => {
  const source = externalSource(drag.id, drag.pointer, size);
  const client = { x: drag.pointer.x + ctx.stage.x, y: drag.pointer.y + ctx.stage.y };
  const seen = viewFor(ctx, source, { pointer: drag.pointer, client, onScreen: client, view }, NO_HELD_KEYS);
  return { ...seen, outside: false, stays: false };
};

export { externalView };
