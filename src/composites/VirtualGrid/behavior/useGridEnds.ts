/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import { useWheelListener } from '../../../primitives/dom/useWheelListener';
import type { GridEndsInput } from './useGridEnds.type';

const useGridEnds = (input: GridEndsInput): ((index: number) => void) => {
  const { rootRef, items, onActiveChange, onWheelSize } = input;
  useWheelListener(rootRef, onWheelSize && ((event) => {
    if (!(event.ctrlKey || event.metaKey) || event.deltaY === 0) return;
    event.preventDefault();
    onWheelSize(event.deltaY < 0 ? 1 : -1);
  }));
  return useCallback((index: number) => {
    if (index < items) onActiveChange?.(index);
  }, [items, onActiveChange]);
};

export { useGridEnds };
