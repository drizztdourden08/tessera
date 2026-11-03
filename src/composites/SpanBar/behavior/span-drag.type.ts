/* @layer renderer-components @kind types */
import type { CellBox, CellGeometry, CellSpan } from '../../cell-geometry';
import type { SpanSnap } from '../SpanBar.type';

type SpanDragMode = 'move' | 'start' | 'end';

interface SpanOrigin {
  startX: number;
  endX: number;
}

interface SpanDragInput {
  mode: SpanDragMode;
  span: CellSpan;
  dx: number;
  cells: CellGeometry;
  total: number;
  snap: SpanSnap;
  minLength: number;
  origin: SpanOrigin;
}

interface SpanDraft extends CellBox {
  span: CellSpan;
}

export type { SpanDraft, SpanDragInput, SpanDragMode, SpanOrigin };
