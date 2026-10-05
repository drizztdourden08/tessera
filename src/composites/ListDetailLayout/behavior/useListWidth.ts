/* @layer renderer-components @kind hook */
import { useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import { readStored } from '../../../primitives/dom/read-stored';
import { writeStored } from '../../../primitives/dom/write-stored';
import { clampWidth } from './clamp-width';
import { keyWidthOf } from './key-width-of';
import type { ListWidthOptions } from './list-width.type';
import { storedWidth } from './stored-width';
import type { DragStart, ListWidthState } from './useListWidth.type';

const useListWidth = (options: ListWidthOptions, collapse?: () => void): ListWidthState => {
  const { initial, min, max, storageKey } = options;
  const limits = useMemo(() => ({ initial, min, max }), [initial, min, max]);
  const [width, setWidth] = useState(() => clampWidth(readStored(storageKey, storedWidth) ?? initial, limits));
  const [dragging, setDragging] = useState(false);
  const startRef = useRef<DragStart | null>(null);

  const commit = (next: number) => {
    const settled = clampWidth(next, limits);
    setWidth(settled);
    writeStored(storageKey, settled);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    const sign = getComputedStyle(event.currentTarget).direction === 'rtl' ? -1 : 1;
    startRef.current = { pointer: event.clientX, width, sign };
    setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = startRef.current;
    if (start) setWidth(clampWidth(start.width + start.sign * (event.clientX - start.pointer), limits));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (startRef.current) writeStored(storageKey, width);
    startRef.current = null;
    setDragging(false);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && collapse) {
      event.preventDefault();
      collapse();
      return;
    }
    const next = keyWidthOf(event, width, limits);
    if (next === null) return;
    event.preventDefault();
    commit(next);
  };

  return { width, dragging, handlers: { handlePointerDown, handlePointerMove, endDrag, handleKeyDown, expand: () => commit(initial) } };
};

export { useListWidth };
