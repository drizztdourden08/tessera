/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import type { WidgetState } from '../Widget.type';
import { useWidgetDrag } from './useWidgetDrag';
import { useWidgetResize } from './useWidgetResize';

const useWidgetMoveResize = (state: WidgetState, onChange: (patch: Partial<WidgetState>) => void) => {
  const handleDragMove = useCallback(
    (x: number, y: number) => onChange({ x, y }),
    [onChange],
  );
  const dragMouseDown = useWidgetDrag({ x: state.x, y: state.y }, handleDragMove);

  const handleResize = useCallback(
    (width: number, height: number, x: number, y: number) => {
      if (state.mode === 'floating') {
        onChange({ width, height, x, y });
      } else {
        const side = state.side;
        const newSize = (side === 'left' || side === 'right') ? width : height;
        onChange({ dockedSize: newSize });
      }
    },
    [onChange, state.mode, state.side],
  );
  const { onEdgeMouseDown } = useWidgetResize(
    { width: state.width, height: state.height },
    { x: state.x, y: state.y },
    handleResize,
  );

  return { dragMouseDown, onEdgeMouseDown };
};

export { useWidgetMoveResize };
