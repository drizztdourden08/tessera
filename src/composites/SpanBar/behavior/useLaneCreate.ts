/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { CELL_DRAG_THRESHOLD, localX } from '../../cell-geometry';
import type { CellSpan } from '../../cell-geometry';
import { useRectDrag } from '../../rect-drag/useRectDrag';
import { laneSpan } from './lane-span';
import type { LaneCreateSetup, LaneCreateState } from './useLaneCreate.type';

const useLaneCreate = (setup: LaneCreateSetup): LaneCreateState => {
  const { cells, total, readOnly, onCreate } = setup;
  const { live, begin } = useRectDrag<CellSpan>();
  const moved = useRef(false);

  const press = (event: PointerEvent<HTMLElement>): void => {
    if (readOnly || !onCreate || event.target !== event.currentTarget) return;
    const lane = event.currentTarget;
    const originX = localX(event.clientX, lane);
    moved.current = false;
    begin(event, (delta) => {
      moved.current ||= Math.abs(delta.x) >= CELL_DRAG_THRESHOLD;
      return laneSpan(cells, total, originX, originX + (moved.current ? delta.x : 0));
    }, (last) => {
      if (last && moved.current) onCreate(last);
    });
  };

  return { draft: live, press };
};

export { useLaneCreate };
