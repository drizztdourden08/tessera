/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import { clampInto } from '../../rect-drag/clamp-into';
import type { Rect } from '../../rect-drag/rect-drag.type';
import { resizeRect } from '../../rect-drag/resize-rect';
import { sameRect } from '../../rect-drag/same-rect';
import { useRectDrag } from '../../rect-drag/useRectDrag';
import { MOVE_MIN } from '../ScreenLayer.constants';
import type { ScreenLayerMove } from '../ScreenLayer.type';
import { frameRect } from './frame-rect';
import { keyStep } from './key-step';
import { moveBounds } from './move-bounds';
import { movedRect } from './moved-rect';
import { useMoveBounds } from './useMoveBounds';
import type { LayerMove } from './useLayerMove.type';

const useLayerMove = (move: ScreenLayerMove | undefined, frame: HTMLElement | null): LayerMove => {
  const drag = useRectDrag<Rect>();
  const bounds = useMoveBounds(move ? frame : null);
  const latest = useRef(move);
  latest.current = move;
  const saved = move?.rect ?? null;
  const placed = move ? drag.live ?? (saved && bounds ? clampInto(saved, bounds) : saved) : null;
  const startOf = (el: HTMLElement): Rect => placed ?? frameRect(el);
  const commit = (start: Rect) => (last: Rect | null): void => {
    if (last && !sameRect(last, start)) latest.current?.onChange(last);
  };

  return {
    placed,
    dragging: drag.live !== null,
    onBandDown: (event) => {
      if (!frame) return;
      const start = startOf(frame);
      const room = moveBounds(frame);
      drag.begin(event, (delta) => movedRect(start, delta, room), commit(start));
    },
    onBandKeyDown: (event) => {
      const step = keyStep(event.key, event.shiftKey);
      if (!frame || !step) return;
      event.preventDefault();
      const start = startOf(frame);
      commit(start)(movedRect(start, step, moveBounds(frame)));
    },
    onEdgeDown: (edge, event) => {
      if (!frame) return;
      const start = startOf(frame);
      const limits = { bounds: moveBounds(frame), min: latest.current?.min ?? MOVE_MIN };
      drag.begin(event, (delta) => resizeRect(start, edge, delta, limits), commit(start));
    },
  };
};

export { useLayerMove };
