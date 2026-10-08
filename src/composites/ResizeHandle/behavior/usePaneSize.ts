/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import { readStored } from '../../../primitives/dom/read-stored';
import { writeStored } from '../../../primitives/dom/write-stored';
import { clampSize } from './clamp-size';
import type { PaneSize, PaneSizeOptions } from './pane-size.type';
import { storedSize } from './stored-size';

const usePaneSize = (options: PaneSizeOptions): PaneSize => {
  const { initial, min, max, storageKey } = options;
  const [size, setSize] = useState(() => clampSize(readStored(storageKey, storedSize) ?? initial, { min, max }));
  const [dragging, setDragging] = useState(false);

  const onResize = useCallback((next: number) => setSize(clampSize(next, { min, max })), [max, min]);
  const onResizeEnd = useCallback((next: number) => {
    writeStored(storageKey, clampSize(next, { min, max }));
  }, [max, min, storageKey]);
  const reset = useCallback(() => {
    const settled = clampSize(initial, { min, max });
    setSize(settled);
    writeStored(storageKey, settled);
  }, [initial, max, min, storageKey]);

  const handle = useMemo(() => ({ value: size, min, max, onResize, onResizeEnd, onDragChange: setDragging, onReset: reset }), [max, min, onResize, onResizeEnd, reset, size]);
  return { size, dragging, reset, handle };
};

export { usePaneSize };
