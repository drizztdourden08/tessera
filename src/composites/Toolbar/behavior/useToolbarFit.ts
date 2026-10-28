/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import type { ToolbarFit, ToolbarFitParams } from './fit-columns.type';
import { measureToolbar } from './measure-toolbar';

const useToolbarFit = (params: ToolbarFitParams): ToolbarFit => {
  const { barRef, measureRef, restCount, contentKey, vertical, columns } = params;
  const [state, setState] = useState<ToolbarFit>({ fit: Number.POSITIVE_INFINITY, wrapped: false });

  useLayoutEffect(() => {
    const bar = barRef.current;
    const measure = measureRef.current;
    if (!bar || !measure) return undefined;
    const update = (): void => {
      const next = measureToolbar(bar, measure, restCount, { vertical, columns });
      setState((previous) => (previous.fit === next.fit && previous.wrapped === next.wrapped ? previous : next));
    };
    update();
    return observeResize([bar, measure], update);
  }, [barRef, measureRef, restCount, contentKey, vertical, columns]);

  return state;
};

export { useToolbarFit };
