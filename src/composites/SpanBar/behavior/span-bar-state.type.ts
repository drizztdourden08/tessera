/* @layer renderer-components @kind types */
interface SpanBarState {
  selected: boolean;
  dragging: boolean;
  readOnly: boolean;
}

interface SpanBarStateDataset {
  'data-selected': true | undefined;
  'data-dragging': true | undefined;
  'data-read-only': true | undefined;
}

export type { SpanBarState, SpanBarStateDataset };
