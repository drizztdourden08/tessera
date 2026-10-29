/* @layer renderer-components @kind logic */
import type { PointerEvent } from 'react';
import { isElement } from '../../../primitives/dom/is-element';
import { DRAG_THRESHOLD, INTERACTIVE } from '../Tree.constants';
import type { DragSession, ReorderHandlers, TreeRowPointer } from './useTreeDrag.type';

const far = (session: DragSession, event: PointerEvent<HTMLElement>): boolean =>
  session.down !== null && Math.hypot(event.clientX - session.down.x, event.clientY - session.down.y) > DRAG_THRESHOLD;

const yielding = (event: PointerEvent<HTMLElement>, yields: boolean): boolean => yields && !event.altKey && event.pointerType !== 'touch';

const pointerHandlersOf = (base: ReorderHandlers, session: DragSession, yields: boolean): TreeRowPointer => ({
  onPointerDown: (event) => {
    if (isElement(event.target) && event.target.closest(INTERACTIVE)) return;
    if (yielding(event, yields)) return;
    session.moved = false;
    session.down = { x: event.clientX, y: event.clientY };
    base.onPointerDown(event);
  },
  onPointerMove: (event) => {
    if (!session.moved && far(session, event)) session.moved = true;
    base.onPointerMove(event);
  },
  onPointerUp: (event) => {
    base.onPointerUp(event);
    session.down = null;
  },
  onPointerCancel: () => {
    session.moved = false;
    base.onPointerCancel();
  },
});

export { pointerHandlersOf };
