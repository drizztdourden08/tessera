/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { cellAt } from '../../cell-geometry';
import { useRectDrag } from '../../rect-drag/useRectDrag';
import type { MarkerDragSetup, MarkerDragState } from './useMarkerDrag.type';

const useMarkerDrag = (setup: MarkerDragSetup): MarkerDragState => {
  const { cells, total, marker, readOnly, onMarkerChange } = setup;
  const { live, begin } = useRectDrag<number>();
  const last = useRef(marker.index);

  const press = (event: PointerEvent<HTMLElement>): void => {
    event.stopPropagation();
    if (readOnly) return;
    event.currentTarget.focus();
    last.current = marker.index;
    const originX = (cells.lefts[marker.index] ?? 0) + (cells.widths[marker.index] ?? 0) / 2;
    begin(event, (delta) => {
      const index = clampNumber(cellAt(cells, originX + delta.x, total), marker.min, marker.max);
      if (index !== last.current) onMarkerChange?.(marker.id, index);
      last.current = index;
      return index;
    }, () => undefined);
  };

  return { index: live ?? marker.index, press };
};

export { useMarkerDrag };
