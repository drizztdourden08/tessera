/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { useRectDrag } from '../../rect-drag/useRectDrag';
import { markerIndexAt } from './marker-index-at';
import { markerX } from './marker-x';
import type { MarkerDragSetup, MarkerDragState } from './useMarkerDrag.type';

const useMarkerDrag = (setup: MarkerDragSetup): MarkerDragState => {
  const { cells, total, marker, anchor, readOnly, onMarkerChange } = setup;
  const { live, begin } = useRectDrag<number>();
  const last = useRef(marker.index);

  const press = (event: PointerEvent<HTMLElement>): void => {
    event.stopPropagation();
    if (readOnly) return;
    event.currentTarget.focus();
    last.current = marker.index;
    const originX = markerX(cells, marker.index, total, anchor);
    begin(event, (delta) => {
      const index = clampNumber(markerIndexAt(cells, originX + delta.x, total, anchor), marker.min, marker.max);
      if (index !== last.current) onMarkerChange?.(marker.id, index);
      last.current = index;
      return index;
    }, () => undefined);
  };

  return { index: live ?? marker.index, press };
};

export { useMarkerDrag };
