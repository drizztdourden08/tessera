/* @layer renderer-components @kind util */
import type { PointerEvent } from 'react';
import type { ReorderDrag } from '../../reorder/reorder.type';

const cellPointer = (drag: ReorderDrag | undefined, index: number) => {
  const handlers = drag?.handlers(index);
  return {
    onPointerDown: (event: PointerEvent<HTMLElement>): void => {
      if (!event.shiftKey && !event.ctrlKey && !event.metaKey) handlers?.onPointerDown(event);
    },
    onPointerMove: handlers?.onPointerMove,
    onPointerUp: handlers?.onPointerUp,
    onPointerCancel: handlers?.onPointerCancel,
  };
};

export { cellPointer };
