/* @layer renderer-components @kind logic */
import type { SpanBarState, SpanBarStateDataset } from './span-bar-state.type';

const spanBarState = ({ selected, dragging, readOnly }: SpanBarState): SpanBarStateDataset => ({
  'data-selected': selected || undefined,
  'data-dragging': dragging || undefined,
  'data-read-only': readOnly || undefined,
});

export { spanBarState };
