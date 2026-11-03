/* @layer renderer-components @kind types */
import type { PointerEvent } from 'react';
import type { CellGeometry, CellSpan } from '../../cell-geometry';
import type { SpanSnap } from '../SpanBar.type';
import type { SpanDragMode, SpanDraft } from './span-drag.type';

interface SpanDragSetup {
  cells: CellGeometry;
  total: number;
  span: CellSpan;
  snap: SpanSnap;
  minLength: number;
  readOnly: boolean;
  onChange?: (span: CellSpan) => void;
  onDraft?: (span: CellSpan | null) => void;
}

interface SpanDragState {
  draft: SpanDraft | null;
  press: (mode: SpanDragMode) => (event: PointerEvent<HTMLElement>) => void;
  consumeDrag: () => boolean;
}

export type { SpanDragSetup, SpanDragState };
