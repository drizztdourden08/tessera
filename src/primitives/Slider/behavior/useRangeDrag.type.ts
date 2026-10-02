/* @layer renderer-components @kind types */
import type { PointerEventHandler } from 'react';
import type { Thumb } from './useRangeThumbs.type';

type Grab = Thumb | 'both';

interface RailHandlers {
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
  onPointerCancel: PointerEventHandler<HTMLDivElement>;
  onPointerLeave: PointerEventHandler<HTMLDivElement>;
}

interface RangeDrag {
  hot: Thumb | null;
  rail: RailHandlers;
}

interface DragState {
  grab: Grab;
  offset: number;
}

export type { DragState, Grab, RailHandlers, RangeDrag };
