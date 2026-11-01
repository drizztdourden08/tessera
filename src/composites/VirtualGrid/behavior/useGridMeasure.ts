/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import { flushSync } from 'react-dom';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { ROW_ATTRIBUTE } from '../VirtualGrid.constants';
import { readRowHeights } from './read-row-heights';
import type { UseGridMeasureInput } from './useGridMeasure.type';

const useGridMeasure = (input: UseGridMeasureInput): void => {
  const { enabled, bodyRef, drawn, keyAt, record } = input;
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!enabled || !body) return undefined;
    const read = () => record(readRowHeights(body, keyAt));
    read();
    return observeResize(Array.from(body.querySelectorAll(`[${ROW_ATTRIBUTE}]`)), () => flushSync(read));
  }, [enabled, bodyRef, drawn, keyAt, record]);
};

export { useGridMeasure };
