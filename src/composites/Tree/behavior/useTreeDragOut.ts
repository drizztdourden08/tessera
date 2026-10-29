/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import { isElement } from '../../../primitives/dom/is-element';
import { useNativeDragGhost } from '../../DragGhost';
import { INTERACTIVE } from '../Tree.constants';
import { dragKeysOf } from './drag-keys-of';
import { dragOutStart } from './drag-out-start';
import type { TreeDragOut, TreeDragOutInput, TreeRowDragOut } from './useTreeDragOut.type';

const useTreeDragOut = <T,>(input: TreeDragOutInput<T>): TreeDragOut => {
  const { rows, selected, onDragOut, renderThumbnail, reorderOn } = input;
  const ghost = useNativeDragGhost();
  const fromControl = useRef(false);

  const dragOutOf = useCallback((at: number): TreeRowDragOut | undefined => {
    if (!onDragOut) return undefined;
    return {
      draggable: true,
      onPointerDownCapture: (event) => {
        fromControl.current = isElement(event.target) && event.target.closest(INTERACTIVE) !== null;
      },
      onDragStart: (event) => {
        const held = fromControl.current || (reorderOn && event.altKey);
        dragOutStart(event, { keys: dragKeysOf(rows, selected, at), onDragOut, ghost, renderThumbnail, held });
      },
    };
  }, [rows, selected, onDragOut, renderThumbnail, reorderOn, ghost]);

  return { dragOutOf };
};

export { useTreeDragOut };
