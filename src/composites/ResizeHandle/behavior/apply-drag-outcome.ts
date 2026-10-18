/* @layer renderer-components @kind logic */
import type { DragOutcome } from './drag-step.type';
import type { ResizeOptions } from './resize-options.type';

const applyDragOutcome = (outcome: DragOutcome, options: ResizeOptions): void => {
  if (outcome === null) return;
  if (outcome.kind === 'resize') options.onResize(outcome.to, { from: outcome.from, by: 'drag' });
  else if (outcome.kind === 'fold') options.fold?.onFold(outcome.side);
  else options.fold?.onUnfold(outcome.side, outcome.to);
};

export { applyDragOutcome };
