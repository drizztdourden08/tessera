/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import { readStored } from '../../../primitives/dom/read-stored';
import { writeStored } from '../../../primitives/dom/write-stored';
import { clampSize } from './clamp-size';
import type { PaneSize, PaneSizeOptions } from './pane-size.type';
import { storedSize } from './stored-size';

const usePaneSize = (options: PaneSizeOptions): PaneSize => {
  const { initial, min, max, storageKey, fine } = options;
  const limits = useMemo(() => ({ min, max, fine }), [fine, max, min]);
  const [size, setSize] = useState(() => clampSize(readStored(storageKey, storedSize) ?? initial, limits));
  const [dragging, setDragging] = useState(false);

  const onResize = useCallback((next: number) => setSize(clampSize(next, limits)), [limits]);
  const onResizeEnd = useCallback((next: number) => {
    writeStored(storageKey, clampSize(next, limits));
  }, [limits, storageKey]);
  const reset = useCallback(() => {
    const settled = clampSize(initial, limits);
    setSize(settled);
    writeStored(storageKey, settled);
  }, [initial, limits, storageKey]);

  const handle = useMemo(() => ({ value: size, min, max, onResize, onResizeEnd, onDragChange: setDragging, onReset: reset }), [max, min, onResize, onResizeEnd, reset, size]);
  return { size, dragging, reset, handle };
};

export { usePaneSize };
