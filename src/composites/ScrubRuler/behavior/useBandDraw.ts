/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { CELL_DRAG_THRESHOLD, cellAt, localX } from '../../cell-geometry';
import { useRectDrag } from '../../rect-drag/useRectDrag';
import type { RulerBand } from '../ScrubRuler.type';
import type { BandDrawSetup, BandDrawState } from './useBandDraw.type';

const useBandDraw = (setup: BandDrawSetup): BandDrawState => {
  const { cells, total, onBandChange } = setup;
  const { live, begin } = useRectDrag<RulerBand>();
  const moved = useRef(false);

  const press = (event: PointerEvent<HTMLElement>): void => {
    const originX = localX(event.clientX, event.currentTarget);
    moved.current = false;
    begin(event, (delta) => {
      moved.current ||= Math.abs(delta.x) >= CELL_DRAG_THRESHOLD;
      const first = cellAt(cells, originX, total);
      const second = cellAt(cells, originX + (moved.current ? delta.x : 0), total);
      return { from: Math.min(first, second), to: Math.max(first, second) };
    }, (last) => {
      if (last && moved.current) onBandChange?.(last);
    });
  };

  return { draft: live, press };
};

export { useBandDraw };
